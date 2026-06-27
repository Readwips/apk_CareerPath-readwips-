$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$sdk = $env:ANDROID_HOME
if (-not $sdk) { $sdk = $env:ANDROID_SDK_ROOT }
if (-not $sdk) { $sdk = Join-Path $env:LOCALAPPDATA "Android\Sdk" }

$platform = Join-Path $sdk "platforms\android-34\android.jar"
$buildTools = Join-Path $sdk "build-tools\35.0.0"
if (-not (Test-Path $buildTools)) { $buildTools = Join-Path $sdk "build-tools\34.0.0" }

$aapt2 = Join-Path $buildTools "aapt2.exe"
$d8 = Join-Path $buildTools "d8.bat"
$zipalign = Join-Path $buildTools "zipalign.exe"
$apksigner = Join-Path $buildTools "apksigner.bat"

foreach ($tool in @($platform, $aapt2, $d8, $zipalign, $apksigner)) {
    if (-not (Test-Path $tool)) { throw "Missing Android build tool: $tool" }
}

$build = Join-Path $PSScriptRoot "build"
Remove-Item -LiteralPath $build -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $build | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $build "generated"), (Join-Path $build "classes"), (Join-Path $build "dex") | Out-Null

$assets = Join-Path $build "assets"
New-Item -ItemType Directory -Force -Path $assets | Out-Null
Copy-Item -LiteralPath (Join-Path $root "outputs\careerpath-app.html") -Destination $assets
Copy-Item -LiteralPath (Join-Path $root "outputs\careerpath-jobs.html") -Destination $assets
Copy-Item -LiteralPath (Join-Path $root "outputs\css") -Destination $assets -Recurse
Copy-Item -LiteralPath (Join-Path $root "outputs\js") -Destination $assets -Recurse

$compiledRes = Join-Path $build "resources.zip"
& $aapt2 compile --dir (Join-Path $PSScriptRoot "app\src\main\res") -o $compiledRes
if ($LASTEXITCODE -ne 0) { throw "aapt2 compile failed" }

$unsignedApk = Join-Path $build "CareerPath-unsigned.apk"
& $aapt2 link `
    -o $unsignedApk `
    -I $platform `
    --manifest (Join-Path $PSScriptRoot "app\src\main\AndroidManifest.xml") `
    -R $compiledRes `
    -A $assets `
    --java (Join-Path $build "generated") `
    --min-sdk-version 23 `
    --target-sdk-version 34 `
    --auto-add-overlay
if ($LASTEXITCODE -ne 0) { throw "aapt2 link failed" }

$sourcesFile = Join-Path $build "sources.txt"
Get-ChildItem -Path (Join-Path $PSScriptRoot "app\src\main\java"), (Join-Path $build "generated") -Recurse -Filter *.java |
    ForEach-Object { $_.FullName } |
    Set-Content -Path $sourcesFile -Encoding ASCII

& javac -source 8 -target 8 -classpath $platform -d (Join-Path $build "classes") "@$sourcesFile"
if ($LASTEXITCODE -ne 0) { throw "javac failed" }

$classesJar = Join-Path $build "classes.jar"
& jar cf $classesJar -C (Join-Path $build "classes") .
if ($LASTEXITCODE -ne 0) { throw "classes jar failed" }

& $d8 --classpath $platform --output (Join-Path $build "dex") $classesJar
if ($LASTEXITCODE -ne 0) { throw "d8 failed" }

& jar uf $unsignedApk -C (Join-Path $build "dex") classes.dex
if ($LASTEXITCODE -ne 0) { throw "Adding classes.dex failed" }

$alignedApk = Join-Path $build "CareerPath-aligned.apk"
& $zipalign -p -f 4 $unsignedApk $alignedApk
if ($LASTEXITCODE -ne 0) { throw "zipalign failed" }

$keystore = Join-Path $build "debug.keystore"
& keytool -genkeypair -v -keystore $keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US" | Out-Null
if ($LASTEXITCODE -ne 0) { throw "keytool failed" }

$outputApk = Join-Path $root "outputs\CareerPath-debug.apk"
& $apksigner sign --v4-signing-enabled false --ks $keystore --ks-pass pass:android --key-pass pass:android --out $outputApk $alignedApk
if ($LASTEXITCODE -ne 0) { throw "apksigner failed" }

& $apksigner verify --print-certs $outputApk
if ($LASTEXITCODE -ne 0) { throw "APK verification failed" }

Write-Host "APK created: $outputApk"
