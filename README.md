# CareerPath

Aplikasi Android untuk mencatat dan memantau lamaran kerja.

Bisa input manual atau langsung pindai email Gmail untuk mendeteksi lamaran, undangan interview, penawaran kerja, dan penolakan secara otomatis.

## Fitur

- Dashboard ringkasan status lamaran
- Tambah lamaran manual (nama perusahaan, posisi, status, tanggal)
- Pindai Gmail — deteksi email rekrutmen dari Jobstreet, Indeed, email perusahaan, dll
- Klasifikasi otomatis: Rekomendasi, Lamaran diterima, Interview, Penawaran kerja, Ditolak
- Detail tiap lamaran dengan sumber (Manual / Gmail) dan catatan pribadi
- Filter dan statistik per status
- Backup data ke file JSON
- Login / logout akun Google
- Data tersimpan lokal di perangkat

## Build APK

Buka project di Android Studio, lalu jalankan `app` pada emulator atau HP.

Atau lewat terminal:

```
.\gradlew.bat assembleDebug
```

Hasil APK: `android/app/build/outputs/apk/debug/app-debug.apk`

Instal ke HP:

```
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

## Konfigurasi Gmail

Fitur pindai Gmail memerlukan OAuth Client ID dari Google Cloud Console:

1. Aktifkan Gmail API di project Google Cloud
2. Buat OAuth Client ID tipe Android dengan package `com.careerpath.app`
3. Masukkan SHA-1 debug signing certificate
4. Tambahkan akun Gmail sebagai Test User di OAuth consent screen

## Struktur

```
outputs/
  careerpath-app.html    — halaman utama
  careerpath-jobs.html   — halaman semua lamaran
  css/                   — stylesheet
  js/                    — logika aplikasi
android/
  app/                   — source Android (WebView + Gmail bridge)
```
