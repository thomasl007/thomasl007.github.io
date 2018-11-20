---
---

## 参考文档

* [Android插件DSL参考文档（这个很关键）](http://google.github.io/android-gradle-dsl/current/)
* [Android插件ReleaseNote](http://developer.android.youdaxue.com/studio/releases/gradle-plugin)
* [Android工程构建](https://developer.android.google.cn/studio/build/)

## Android Studio 与 Gradle

### Android Studio 中的同步

Android Studio 有自己的项目内部模型。<br/>
当项目加载或Gradle构建脚本发生变化时，Android Studio 需要将其内部模型与 Gradle 的模型同步。<br/>
也就是说，同步是为了让 Android Studio 识别 Gradle脚本。<br/>

### Gradle Wrapper 和 Gradle Daemon

Android Studio 使用 Gradle Wrapper 和 Gradle Daemon。<br/>

## Android Studio 工程目录结构

* **.gradle目录**<br/>
这个目录是gradle存储增量构建支持信息的位置。<br/>
Gradle task的输入输出都在这个目录中。(还记得增量编译相关的输入输出吗)<br/>
* **.idea**<br/>
这个目录存放 Android Studio 的项目模型（前边提到过，Android Studio 有自己的项目模型）<br/>
* **build**<br/>
存放编译输出内容，以及 Android Studio 项目模型 和 Gradle 项目模型同步相关的信息。<br/>
* **.iml**<br/>
跟`.idea`一样，也是 Android Studio 项目模型的一部分<br/>
* **local.properties**<br/>
设置 Android sdk 的位置（提供给Gradle）<br/>

## Android 构建脚本

### 工程根目录下的`build.gradle`

Android 构建是多工程构建（multi project build），工程目录中的 `app` 就是其中一个子工程（sub project）。<br/>
我们来简单分析一下这个`build.gradle`脚本。<br/>
```
buildscript {
    repositories {
        // 声明从何处引入插件
        jcenter()
    }
    dependencies {
        // 这里引入 android 插件
        classpath 'com.android.tools.build:gradle:2.2.3'
    }
}

// 在这里为所有子工程引入jcenter库
allprojects {
    repositories {
        jcenter()
    }
}
```

### 专门用于构建 Android 的 build.gradle

在子工程（例如，`app`）中的`build.gradle`。<br/>
```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 25
    buildToolsVersion "24.0.3"

    defaultConfig {
        applicationId "com.example.android.myapplication"
        minSdkVersion 15
        targetSdkVersion 25
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:25.1.0'
}
```
首先，应用了`android`插件，取自根目录脚本里`buildscript`中定义的资源库（例如，`jcenter`）。<br/>
**！！注意！！：高版本`android`插件需要从`google()`库获取！！**

#### android块

所有有关android的配置，都包含在`android`块中。<br/>
其中只有`compileSdkVersion`和`buildToolsVersion`是必要的。<br/>

`defaultConfig`块负责配置android manifest的属性。<br/>

详细内容参考[Android插件DSL参考文档](http://google.github.io/android-gradle-dsl/current/)。<br/>

## android 插件

`android` 插件主要功能包括：
* 构建变种（build variants）
* 管理依赖（dependencies）
* 替换res和Manifest
* 应用程序签名
* 程序守护（pro guarding）
* 测试

### 构建变种（build variants）

构建同一app的略有不同的版本，例如，debug、release、free、pay。<br/>
构建变种是两个配置组件 `buildTypes {}` 和 `productFlavors {}` 的矢量积：

|buildTypes\productFlavors|free|paid|
|-|
|**release**|free Release|paid Release|
|**debug**|free Debug|paid Debug|

#### 声明 productFlavors

默认情况下，Gradle 不会为我们创建任何 productFlavors。<br/>
创建方式：
```
productFlavors {
    free {
        applicationId "com.xxx.yyy.free"
    }
    paid {
        applicationId "com.xxx.yyy.paid"
    }
}
```
基本上所有`defaultConfig`中的属性都可以在`productFlavors`的各个flavor中使用。<br/>

#### flavor dimensions

没太搞懂，只知道是使用`flavorDimensions`方法。<br/>

#### 配置生成的task

应用场景：<br/>
Android构建的任务名称和任务，都是在配置之后生成的，例如，`compileDebug`。<br/>
这就意味着，我们无法在构建脚本的过程中引用这些任务。<br/>
所以，如果我们需要引用这个任务，我们就需要在不知道任务名称的情况下，引用用于构建每个特定变种的任务。<br/>

方案分析：<br/>
首先，Android Gradle 插件会自动为不同变种配置task，然后将这些task相关的信息分组保存到一个对象中，<br/>
这个对象主要有三种，具体是哪种取决于我们的工程类型。<br/>
* `applicationVariants`：android应用程序工程（apk）
* `libraryVariants`：android library工程（aar）
* `testVariant`：用于测试apk（apk）

每个对象都有特定的属性，但他们都有通用的task（例如，编译java，合并资源等）。<br/>

使用方法：<br/>
Gradle使用“实时集合（live collections）”处理这个问题。<br/>
当Android插件创建变体时，这些变体会被放入一种集合，这些集合允许我们为不存在的对象定义配置。<br/>
Gradle会记住这些配置，并在添加对象时执行这些配置。<br/>
我们可以调用上述三中集合中的`all`方法来执行我们想要的配置。<br/>
例如：
```
applicationVariants.all {
    if (buildType.name == 'debug') {
        javaCompile.options.compilerArgs = ['-verbose']
    }
}
```

### 资源合并

Android Gradle插件提供了许多 sourceSets。<br/>
（目前的理解，`sourceSets`就是源目录，例如 `app` 目录中的 `main`）<br/>
以上面的表格为例，我们会有以下 sourceSets
```
/src
 |-main *default
 |-free
 |-paid
 |-debug
 |-release
 |-freeDebug
 |-freeRelease
 |-paidDebug
 |-paidRelease
```
根据要构建的变种，**Gradle会为我们** 选择不同的 sourceSets 与 `main` 进行合并，进而合并到最终的apk中。<br/>
应该是先合并 `productFlavors` 的sourceSets，再合并 `buildTypes` 的sourceSets。<br/>
**注意：<br/>
Gradle不能合并Java代码，所以变种sourceSets中不能定义与main中同名的类。<br/>
但不同变种sourceSets中可以有同名类。**

资源合并也包括 Manifest 文件。

### 管理依赖（dependencies）

管理每个变体的依赖项。（可以分别管理，例如，变体名+Compile）<br/>

### ProGuard

[ProGuard官方文档](https://developer.android.google.cn/studio/build/shrink-code)<br/>

ProGuard工具可以去除无用的代码和资源，以缩小应用的大小。<br/>
ProGuard的功能还包括混淆代码（为所有类和方法设置无意义的名称）。<br/>

* `minifyEnabled`：开启后，会执行代码压缩。通常需要和`proguardFiles`一起使用<br/>
**但有两点需要注意**<br/>
  * **代码压缩会拖慢构建速度，因此应尽量避免在debug构建中使用。**
  * **如果要在release版本中使用代码压缩，则一定在测试版本中启用代码压缩，以确认你的`proguard-rules.pro`文件没有问题，否则可能导致错误。**）
* `shrinkResources`：开启后，可去除任何未使用的资源，包括依赖库中未使用的资源。
* `proguardFiles`：用于定义ProGuard的规则

### Android测试

两种类型：<br/>
unit test：运行在电脑上，测试非android相关的类<br/>
connected test：运行在测试设备上<br/>

## android插件常用变量

工程根目录：
```
$rootdir
```

## Multidex

默认最大方法数是65535。<br/>
Android虚拟机实际上并没有运行java字节码，它运行的是Dalvik字节码。<br/>
在执行Java编译之后，会执行一个构建步骤，将Java字节码转换为Dalvik字节码，这个过程称为“dexing”。<br/>
这个过程的任务之一是为应用程序中的所有方法构建方法表（默认是一张表），然后用两个字节编制索引。<br/>
两个字节是16位，2的16次方是65536。<br/>
所以，默认情况下，我们最多只能定义65536个方法。<br/>
<br/>
可以使用以下配置，要求 gradle 将一张表拆分成多张表。<br/>
```
defaultConfig {
    multiDexEnabled true
}
```
