package com.careerpath.app;

import android.accounts.Account;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.DownloadListener;
import android.app.DownloadManager;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.widget.Toast;

import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.Scope;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.CountDownLatch;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class MainActivity extends Activity {
    private static final int SIGN_IN_REQUEST = 1001;
    private static final String GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.readonly";
    private static final String LOCAL_ASSET_PREFIX = "file:///android_asset/";
    private static final int MAX_GMAIL_PAGES = 3;
    private final ExecutorService executor = Executors.newFixedThreadPool(6);
    private WebView webView;
    private GoogleSignInClient signInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        GoogleSignInOptions signInOptions = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestScopes(new Scope(GMAIL_SCOPE))
            .build();
        signInClient = GoogleSignIn.getClient(this, signInOptions);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setBlockNetworkLoads(true);
        settings.setSupportMultipleWindows(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);

        webView.addJavascriptInterface(new GmailBridge(), "CareerPathNative");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return !request.getUrl().toString().startsWith(LOCAL_ASSET_PREFIX);
            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView popupView = new WebView(MainActivity.this);
                popupView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                        String url = request.getUrl().toString();
                        if (url.startsWith(LOCAL_ASSET_PREFIX)) webView.loadUrl(url);
                        return true;
                    }

                    @Override
                    public void onPageStarted(WebView view, String url, Bitmap favicon) {
                        if (url.startsWith(LOCAL_ASSET_PREFIX)) webView.loadUrl(url);
                    }
                });
                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(popupView);
                resultMsg.sendToTarget();
                return true;
            }
        });

        webView.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
            try {
                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                request.setMimeType(mimetype);
                request.addRequestHeader("cookie", android.webkit.CookieManager.getInstance().getCookie(url));
                request.addRequestHeader("User-Agent", userAgent);
                request.setDescription("Mengunduh file backup...");
                request.setTitle("careerpath-backup.json");
                request.allowScanningByMediaScanner();
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "careerpath-backup-" + System.currentTimeMillis() + ".json");
                DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                if (dm != null) dm.enqueue(request);
                Toast.makeText(getApplicationContext(), "Mengunduh backup...", Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                Toast.makeText(getApplicationContext(), "Gagal mengunduh: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        if (savedInstanceState == null) webView.loadUrl(LOCAL_ASSET_PREFIX + "careerpath-app.html");
        else webView.restoreState(savedInstanceState);
        webView.postDelayed(this::autoScanInbox, 1200);
    }

    private void autoScanInbox() {
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
        if (account != null && GoogleSignIn.hasPermissions(account, new Scope(GMAIL_SCOPE))) scanInbox(account);
    }

    public class GmailBridge {
        @JavascriptInterface
        public void scanGmail() {
            runOnUiThread(() -> {
                GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(MainActivity.this);
                if (account == null || !GoogleSignIn.hasPermissions(account, new Scope(GMAIL_SCOPE))) {
                    startActivityForResult(signInClient.getSignInIntent(), SIGN_IN_REQUEST);
                } else {
                    scanInbox(account);
                }
            });
        }

        @JavascriptInterface
        public void logoutGmail() {
            runOnUiThread(() -> {
                signInClient.signOut().addOnCompleteListener(task -> {
                    try {
                        JSONObject result = new JSONObject();
                        result.put("ok", true);
                        result.put("action", "logout");
                        sendResult(result);
                    } catch (Exception ignored) {}
                });
            });
        }

        @JavascriptInterface
        public void exportData(String jsonString) {
            if (jsonString == null || jsonString.length() > 5 * 1024 * 1024) return;
            try {
                new JSONArray(jsonString);
            } catch (Exception e) {
                return;
            }
            runOnUiThread(() -> {
                try {
                    String fileName = "careerpath-backup-" + new SimpleDateFormat("yyyyMMdd-HHmmss", Locale.US).format(new Date()) + ".json";
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                        ContentValues values = new ContentValues();
                        values.put(MediaStore.Downloads.DISPLAY_NAME, fileName);
                        values.put(MediaStore.Downloads.MIME_TYPE, "application/json");
                        values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
                        Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                        if (uri != null) {
                            try (OutputStream out = getContentResolver().openOutputStream(uri)) {
                                if (out != null) out.write(jsonString.getBytes(StandardCharsets.UTF_8));
                            }
                        }
                    } else {
                        java.io.File file = new java.io.File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), fileName);
                        try (java.io.FileOutputStream out = new java.io.FileOutputStream(file)) {
                            out.write(jsonString.getBytes(StandardCharsets.UTF_8));
                        }
                    }
                    Toast.makeText(getApplicationContext(), "Backup tersimpan di folder Download", Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    Toast.makeText(getApplicationContext(), "Gagal menyimpan backup", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != SIGN_IN_REQUEST) return;
        try {
            scanInbox(GoogleSignIn.getSignedInAccountFromIntent(data).getResult(ApiException.class));
        } catch (ApiException error) {
            sendError("Login Google dibatalkan atau gagal (" + error.getStatusCode() + ").");
        }
    }

    private void scanInbox(GoogleSignInAccount signedInAccount) {
        sendLoading();
        executor.execute(() -> {
            try {
                Account account = signedInAccount.getAccount();
                if (account == null) throw new IllegalStateException("Akun Google tidak tersedia.");
                String token = GoogleAuthUtil.getToken(this, account, "oauth2:" + GMAIL_SCOPE);
                JSONArray jobs = fetchCandidateEmails(token);
                JSONObject result = new JSONObject();
                result.put("ok", true);
                result.put("email", signedInAccount.getEmail());
                result.put("jobs", jobs);
                sendResult(result);
            } catch (Exception error) {
                sendError(error.getMessage() == null ? "Gagal membaca Gmail." : error.getMessage());
            }
        });
    }

    private JSONArray fetchCandidateEmails(String token) throws Exception {
        String query = "newer_than:1y (application OR interview OR recruiter OR recruitment OR hiring OR lamaran OR wawancara OR seleksi OR karir OR career)";
        String baseUrl = "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=100&q=" + Uri.encode(query);
        List<JSONObject> parsedJobs = Collections.synchronizedList(new ArrayList<>());
        String pageToken = null;
        int pageCount = 0;
        do {
            String url = pageToken != null ? baseUrl + "&pageToken=" + pageToken : baseUrl;
            JSONObject list = requestJson(url, token);
            JSONArray messages = list.optJSONArray("messages");
            if (messages != null && messages.length() > 0) {
                CountDownLatch latch = new CountDownLatch(messages.length());
                for (int index = 0; index < messages.length(); index++) {
                    String id = messages.getJSONObject(index).getString("id");
                    executor.execute(() -> {
                        try {
                            JSONObject message = requestJson("https://gmail.googleapis.com/gmail/v1/users/me/messages/" + id + "?format=full", token);
                            JSONObject job = parseCandidate(message);
                            if (job != null) parsedJobs.add(job);
                        } catch (Exception ignored) {
                        } finally {
                            latch.countDown();
                        }
                    });
                }
                latch.await();
            }
            pageToken = list.optString("nextPageToken", null);
            pageCount++;
        } while (pageToken != null && pageCount < MAX_GMAIL_PAGES);
        
        JSONArray jobs = new JSONArray();
        for (JSONObject job : parsedJobs) jobs.put(job);
        return jobs;
    }

    private JSONObject parseCandidate(JSONObject message) throws Exception {
        JSONObject payload = message.optJSONObject("payload");
        JSONArray headers = payload == null ? null : payload.optJSONArray("headers");
        if (headers == null) return null;
        String subject = "";
        String from = "";
        for (int index = 0; index < headers.length(); index++) {
            JSONObject header = headers.getJSONObject(index);
            if ("Subject".equalsIgnoreCase(header.optString("name"))) subject = header.optString("value");
            if ("From".equalsIgnoreCase(header.optString("name"))) from = header.optString("value");
        }
        String body = extractText(payload);
        String searchable = (subject + " " + message.optString("snippet") + " " + body).toLowerCase(Locale.ROOT);
        String primaryContext = (subject + " " + message.optString("snippet") + " " + body.substring(0, Math.min(body.length(), 2500))).toLowerCase(Locale.ROOT);
        boolean applicationEvidence = primaryContext.matches("(?s).*(lamaran (pekerjaan )?(anda|yang anda)|anda (baru saja )?(kirim|mengirim|melamar)|pekerjaan .+ yang anda lamar|konfirmasi lamaran|application (received|confirmation|you submitted)|thank you for applying|terima kasih (atas|telah) (lamaran|mengikuti proses seleksi)).*");
        boolean selectionStage = primaryContext.matches("(?s).*(undangan|mengundang|masuk ke dalam tahap|tahap seleksi|psikotes|pra[ -]?tes|online assessment|tes teknis|interview|wawancara).*");
        boolean expired = primaryContext.matches("(?s).*(telah kedaluwarsa|telah ditutup|tidak lagi menerima lamaran|lowongan .+ ditutup|expired|no longer accepting|position .+ closed|tidak lulus|tidak dapat melanjutkan|tidak lolos|tidak diproses lebih lanjut|lamaran anda tidak|we regret to inform|dengan berat hati).*");
        String status = "recommendation";
        if (applicationEvidence) status = "applied";
        if (expired) status = "rejected";
        else if (selectionStage) status = "interview";
        else if (primaryContext.matches("(?s).*(job offer|offer letter|surat penawaran|penawaran kerja).*") && applicationEvidence) status = "offer";
        else if (primaryContext.matches("(?s).*(unfortunately|not selected|rejected|belum berhasil|tidak lolos).*") && applicationEvidence) status = "rejected";
        else if (!applicationEvidence && searchable.matches("(?s).*(job alert|pemberitahuan pekerjaan|lowongan baru|pekerjaan yang cocok|recommended jobs?|rekomendasi lowongan|temukan lowongan|peluang kerja serupa).*") ) status = "recommendation";
        String company = from.replaceAll("<[^>]+>", "").replaceAll("(?i)(recruitment|recruiter|careers?|hiring|hr|talent acquisition)", "").replaceAll("[\"'<>]", "").trim();
        if (company.isEmpty()) company = from.replaceAll(".*<|>.*", "").trim();
        String role = subject.replaceAll("(?i)(application|lamaran|interview|wawancara|offer|offering|recruitment|update|status|for|at|di|:|-)", " ").replaceAll("\\s+", " ").trim();
        if (role.isEmpty()) role = "Posisi dari email";
        long timestamp = message.optLong("internalDate", System.currentTimeMillis());
        JSONObject job = new JSONObject();
        job.put("gmailId", message.optString("id"));
        job.put("company", company);
        job.put("role", role);
        job.put("status", status);
        job.put("date", new SimpleDateFormat("MM/dd/yyyy", Locale.US).format(new Date(timestamp)));
        job.put("description", message.optString("snippet"));
        return job;
    }

    private String extractText(JSONObject part) {
        if (part == null) return "";
        String mimeType = part.optString("mimeType");
        JSONObject body = part.optJSONObject("body");
        String encoded = body == null ? "" : body.optString("data");
        String ownText = "";
        if (!encoded.isEmpty() && ("text/plain".equals(mimeType) || "text/html".equals(mimeType))) {
            try {
                ownText = new String(Base64.decode(encoded, Base64.URL_SAFE | Base64.NO_WRAP), StandardCharsets.UTF_8)
                    .replaceAll("<[^>]+>", " ")
                    .replaceAll("\\s+", " ");
            } catch (IllegalArgumentException ignored) {
            }
        }
        JSONArray parts = part.optJSONArray("parts");
        if (parts == null) return ownText;
        StringBuilder text = new StringBuilder(ownText);
        for (int index = 0; index < parts.length(); index++) text.append(' ').append(extractText(parts.optJSONObject(index)));
        return text.toString();
    }

    private JSONObject requestJson(String endpoint, String token) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint).openConnection();
        connection.setRequestProperty("Authorization", "Bearer " + token);
        connection.setConnectTimeout(15000);
        connection.setReadTimeout(15000);
        int status = connection.getResponseCode();
        InputStream stream = status >= 200 && status < 300 ? connection.getInputStream() : connection.getErrorStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8));
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) body.append(line);
        connection.disconnect();
        if (status < 200 || status >= 300) throw new IllegalStateException("Gmail API gagal (HTTP " + status + ").");
        return new JSONObject(body.toString());
    }

    private void sendLoading() {
        runOnUiThread(() -> webView.evaluateJavascript("window.CareerPathGmail&&window.CareerPathGmail.onLoading()", null));
    }

    private void sendError(String message) {
        try {
            JSONObject result = new JSONObject();
            result.put("ok", false);
            result.put("error", message);
            sendResult(result);
        } catch (Exception ignored) {
        }
    }

    private void sendResult(JSONObject result) {
        String encoded = JSONObject.quote(result.toString());
        runOnUiThread(() -> webView.evaluateJavascript("window.CareerPathGmail&&window.CareerPathGmail.onResult(JSON.parse(" + encoded + "))", null));
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    protected void onDestroy() {
        executor.shutdownNow();
        webView.destroy();
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
