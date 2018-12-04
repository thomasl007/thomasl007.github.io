---
---
## compileSdkVersion

compileSdkVersion 告诉 Gradle 用哪个 Android SDK 版本编译你的应用。<br/>
修改 compileSdkVersion 不会改变运行时的行为。<br/>
推荐总是使用最新的 SDK 进行编译。<br/>
影响Support Library版本。<br/>

## minSdkVersion

应用可以运行的最低要求。

## targetSdkVersion

Android 提供向前兼容的主要依据。（是否使用新特性，例如：运行时权限）<br/>
一定在更新 targetSdkVersion 之前做测试！。<br/>

## 总结

minSdkVersion <= targetSdkVersion <= compileSdkVersion<br/>

理想状态，<br/>
minSdkVersion (lowest possible) <= targetSdkVersion == compileSdkVersion (latest SDK)<br/>
