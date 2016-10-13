loopback-android-getting-started
================================

LoopBack mobile application to show developers how to use
LoopBack Open Node.js Mobile API Middle tier.

## Setting up the Development Environment

1. Install [Eclipse Android Development Tools](http://developer.android.com/sdk/index.html)
1. Open Window &gt; Android SDK Manager, make sure you have these modules
    installed:
    * Tools &gt; Android SDK Platform-tools 18 or newer
    * Tools &gt; Android SDK Build-tools 18 or newer
    * Android 4.3 (API 18) &gt; SDK Platform
    * Extras &gt; Google Play Services
1. Import the Android project in this directory:
    * Run File &gt; Import
    * Select Android &gt; Existing Android Code Into Workspace
    * Choose the directory where you have the Getting Started application.
    * Select LoopBackExample for import
1. Import Google Play services library project into your workspace. The
    project is located inside the directory where you have installed i
    the Android SDK.
    * Run File &gt; Import
    * Select Android &gt; Existing Android Code Into Workspace
    * Go to

      ```
      <android-sdk>/extras/google/google_play_services/libproject/google-play-services_lib/
      ```
    * Select google-play-services_lib for import
    * Check "Copy projects into workspace"
    * Click "Finish".

    See this page for more details:
    [Set Up Google Play Services SDK](http://developer.android.com/google/play-services/setup.html)
1. Add google-play-services\_lib as a build dependency of the Guide Application
    * In the Package Explorer, select LoopbackGuideApplication
    * Run File &gt; Project Properties
    * Select Android
    * In the Library frame, click on "Add..." and select google-play-services_lib
1. Obtain an API key for Google Maps Android API v2
[instructions](https://developers.google.com/maps/documentation/android/start#obtaining_an_api_key)
and enter it into AndroidManifest.xml.

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
