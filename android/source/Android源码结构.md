---
layout: android
---

Android系统架构分层：
* 第1层：Linux Kernel
* 第2层：Libraries 和 Android Runtime
* 第3层：Android Framework
* 第4层：Applications

### Pie | 9.0.0_r8

|目录 / 文件|说明|分层|备注|
|-|-|-|-|
|art|Google 从4.4开始加入，用来代替 Dalvik 的运行时环境，从5.0开始全面代替 Dalvik。|2|
|bionic|Bionic libc，Android的基础C库。是 Google 开发的一个 C 标准库（包含libc、libdl、libm与libpthread），用来取代 glibc，用于 Android 嵌入式系统上。|2|
|bootable|启动引导程序的源码|
|dalvik|dalvik的Java虚拟机|2|
|device|设备相关代码和编译脚本|
|pdk|Plug Development Kit，平台开发套件|
|cts|android兼容性测试套件|
|sdk|sdk及模拟器|
|toolchain||
|libcore|java核心库|
|platform_testing||
|external|由其他平台移植过来的项目，对于移植工作是非常好的参考|
|frameworks|应用程序框架层，由 C++ 和 Java 编写。请仔细阅读此部分代码，对于开发App会有很大帮助|3|
|packages|Android的原生应用程序，App开发者需要重点关注|4|
|compatibility||
|tools||
|developers|开发使用的例子|
|kernel|linux内核|1|
|libnativehelper|支持android的类库|
|build|编译和配置所需的脚本和工具|
|development|开发应用程序所需的模板和工具|
|prebuilts|编译所需要的程序文件，主要包含不同平台下的ARM编译器|
|hardware|与硬件相关的库，驱动开发相关|
|test||
|system|Android的底层库|
|Makefile||
|Android.bp||
|bootstrap.bash||
|~~abi~~|~~应用程序二进制接口，生成libgabi++和.so相关库文件~~||< 8.0|
|~~ndk~~|~~原生开发套件，提供了一些列工具可以快速开发c/c++的动态库~~||< 8.0|
