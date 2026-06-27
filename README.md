# CareerPath Job Tracker

Static HTML prototype for tracking job applications.

This prototype is mobile-only. Open it on a phone-sized viewport; wider desktop screens show a mobile-only notice.
The app opens directly to the dashboard and runs offline; there is no login, email, or password flow.

Open the app from:

- `outputs/careerpath-app.html`

The `View All` page is:

- `outputs/careerpath-jobs.html`

File structure:

- `outputs/css/` for page styles
- `outputs/js/` for app behavior
- `outputs/careerpath-app.html` for the main app markup
- `outputs/careerpath-jobs.html` for the all-jobs page markup

Android APK:

- Debug APK output: `outputs/CareerPath-debug.apk`
- Rebuild command: `powershell -ExecutionPolicy Bypass -File android\build-apk.ps1`
- Install with USB debugging: `adb install -r outputs/CareerPath-debug.apk`
- Or move the APK to a phone and allow install from unknown sources.

Android Studio:

- Open this project root folder, or open the `android/` folder directly.
- If Android Studio shows `Add Configuration`, use `File > Sync Project with Gradle Files`.
- Run the `app` configuration on an emulator or connected Android phone.
