---
---
## 多工程构建

### settings.gradle

`settings.gradle` 告诉 gradle 哪些子工程需要参与多工程构建。<br/>

### 命令行查看有哪些子工程

```
./gradlew projects
```

## 常用变量

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

## ProGuard

[ProGuard官方文档](https://developer.android.google.cn/studio/build/shrink-code)<br/>

ProGuard工具可以去除无用的代码和资源，以缩小应用的大小。<br/>
ProGuard的功能还包括混淆代码（为所有类和方法设置无意义的名称）。<br/>

* `minifyEnabled`：开启后，会执行代码压缩。通常需要和`proguardFiles`一起使用<br/>
**但有两点需要注意**<br/>
  * **代码压缩会拖慢构建速度，因此应尽量避免在debug构建中使用。**
  * **如果要在release版本中使用代码压缩，则一定在测试版本中启用代码压缩，以确认你的`proguard-rules.pro`文件没有问题，否则可能导致错误。**）
* `shrinkResources`：开启后，可去除任何未使用的资源，包括依赖库中未使用的资源。
* `proguardFiles`：用于定义ProGuard的规则

## Android测试

两种类型：
unit test：运行在电脑上，测试非android相关的类
connected test：运行在测试设备上
