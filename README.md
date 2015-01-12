hygge
=====
Hygge app working files and testbed apps. 

Both sub-directories are Cordova projects.  
http://cordova.apache.org/

Ant:


Android SDK:
http://developer.android.com/sdk/index.html
Install SDK versions for any other Android versions you wan to support ( e.g. 4.x )

Edit ~/.bash_profile:
export ANDROID_HOME=/Users/<user_name>/Library/Android/sdk
export ANDROID_TOOLS=/Users/<user_name>/Library/Android/sdk/tools/
export ANDROID_PLATFORM_TOOLS="/Users/<user_name>/Library/Android/sdk/platform-tools/
export PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS


hygge-evothings
=====
Evothings derived iBeacon example. 

###To Build: 
> /hygge-evothings $ cordova platform add [ios / android]

/hygge-evothings $ cordova build [ios / android]

/hygge-evothings $ cordova emulate [ios / android]

hygge-ionic
=====
Ionic framework iteration. 

Does not contain a working implementation of a Cordova BLE plugin. 

##Local Setup:

###Add Platforms
/hygge-ionic $ ionic platform add [ios / android]

###Add Plugins
/hygge-ionic $ cordova plugin add [org.apache...]

Currently Requires:
- com.ionic.keyboard
- com.unarin.cordova.beacon
- org.apache.cordova.console
- org.apache.cordova.device
- org.apache.cordova.statusbar

###Build Resources
/hygge-ionic $ ionic resources

###Build for Platforms
/hygge-ionic $ ionic build [ios / android]

###Debug in Browser
/hygge-ionic $ ionic serve [--lab]

###Emulate on Device
/hygge-ionic $ ionic emulate [ios / android]
