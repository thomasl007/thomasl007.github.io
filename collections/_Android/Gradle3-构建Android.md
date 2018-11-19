---
---

## 参考文档

* [Android插件DSL参考文档（这个很关键）](http://google.github.io/android-gradle-dsl/current/)
* [Android插件ReleaseNote](http://developer.android.youdaxue.com/studio/releases/gradle-plugin)
* [Android工程构建](https://developer.android.google.cn/studio/build/)

## Android Studio 与 Gradle

Android Studio 维护自己的项目内部模型，当项目加载或gradle构建脚本发生变化时，Android Studio 需要将其内部模型与 Gradle 的模型同步。<br/>
<br/>
Android Studio 使用 Gradle Wrapper 和 Gradle Daemon。<br/>
<br/>
Android Studio 中的同步是为了让 Android Studio 识别 Gradle脚本。<br/>
<br/>

## Android Studio 工程目录结构

**.gradle目录**<br/>
这个目录是gradle存储增量构建支持信息的位置。<br/>
Gradel task的输入输出都在这个目录中。(还记得给增量编译相关的输入输出吗)<br/>
**.idea**<br/>
这个目录存放 Android Studio 的项目模型（前边提到过，Android Studio 有自己的项目模型）<br/>
**build**<br/>
存放编译输出内容，以及 Android Studio 项目模型 和 Gradle 项目模型同步相关的信息。<br/>
**.iml**<br/>
跟`.idea`一样，也是 Android Studio 项目模型的一部分<br/>
**local.properties**<br/>
设置 Android sdk 的位置（提供给Gradle）<br/>

## 进一步了解插件

### `java`和`application`插件

我们可以在build.gradle文件中添加`java`和`application`插件来帮助我们编译java工程。<br/>
实际上，`application`插件已经包含`java`插件了。<br/>
`java`和`application`会为我们添加一些用于 build、clean、run、distribute Java工程的task。<br/>
可以到Gradle官网了解更多关于[application](https://docs.gradle.org/current/userguide/application_plugin.html)插件的内容。<br/>

### Android 构建脚本

#### 工程根目录下的`build.gradle`

android构建是多工程构建（multi project build），工程目录中的 `app` 就是其中一个子工程（sub project）。<br/>
我们来简单分析一下这个`build.gradle`脚本。<br/>
```
buildscript {
    repositories {
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

#### 专门用于构建Android的`build.gradle`

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
首先，引入了`android`插件，取自根目录脚本里`buildscript`中定义的资源库（例如，`jcenter`）。<br/>
**！！注意！！：高版本插件需要从`google()`库获取！！**

##### android块

所有有关android的配置，都包含在`android`块中。<br/>
其中只有`compileSdkVersion`和`buildToolsVersion`是必要的。<br/>
`defaultConfig`块负责配置android manifest的属性。<br/>
详细内容参考[Android插件DSL参考文档](http://google.github.io/android-gradle-dsl/current/)。<br/>

### `android`插件

#### 构建变种（build variants）

构建同一app的略有不同的版本，例如，debug、release、free、pay。<br/>
构建变种是两个配置组件的矢量积：`buildTypes {}`和`productFlavors {}`

|buildTypes\productFlavors|free|paid|
|-|
|**release**|free Release|paid Release|
|**debug**|free Debug|paid Debug|

##### 配置构建类型（buildTypes）

`minifyEnabled false`：禁用打包优化<br/>

##### 资源合并

Android Gradle插件提供了许多 sourceSets，（目前的理解，`sourceSets`就是源目录，例如app目录中的main）<br/>
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
根据要构建的变种，**Gradle会为我们** 选择不同的 sourceSets 合并到最终的apk中。<br/>
应该是先合并productFlavors的sourceSets再合并buildTypes的sourceSets。<br/>

##### 声明productFlavors

默认情况下，Gradle不会为我们创建任何productFlavors。<br/>
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
**注意：Gradle不能合并Java代码，所以变种sourceSets中不能定义与main中同名的类，但不同变种sourceSets中可以有同名类。**

##### flavor dimensions

没太搞懂，只知道是使用`flavorDimensions`方法。<br/>

##### 配置生成的任务

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

#### 管理依赖（dependencies）

管理每个变体的依赖项。（可以分别管理）<br/>

#### 替换res和Manifest

替换每个变体的res和Manifest。

#### 应用程序签名

#### 程序守护（pro guarding）

#### 测试

## 引入其他配置脚本

我们可以使用一下方式引入其他配置脚本：
```
apply from:"solution.gradle"
```
**需要注意的是，引入配置脚本可以理解为“粘贴”，即将被引入脚本的内容粘贴到当前脚本中，所以如果脚本中有相对路径，则需要注意。**
