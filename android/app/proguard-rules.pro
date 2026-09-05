-keepclassmembers class com.careerpath.app.MainActivity$GmailBridge {
    @android.webkit.JavascriptInterface <methods>;
}

-keepattributes JavascriptInterface

-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

-keep class androidx.appcompat.** { *; }
-keep class androidx.core.** { *; }
-dontwarn androidx.**
