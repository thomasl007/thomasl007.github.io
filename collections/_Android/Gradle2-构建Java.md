---
---

# 插件

[关于插件的官方文档](https://docs.gradle.org/current/userguide/plugins.html)<br/>

## 插件的功能

* 扩展Gradle域模型
* 追加DSL元素
* 追加task
* 追加task类型

## 如何应用插件

```
apply plugins: "java"
```

# 构建Java

[关于Java插件的官方文档](https://docs.gradle.org/current/userguide/java_plugin.html)<br/>
[Java插件快速入门官方文档](https://docs.gradle.org/current/userguide/tutorial_java_projects.html)<br/>

*本节中的代码，默认是在引入"java"插件的情况下运行的*<br/>

## 编译 Java 项目

先思考几个问题：<br/>
1. Gradle怎么知道在哪里查找你的源码？
1. Gradle怎么知道使用哪些编译选项？
1. Gradle把构建输出放到哪个路径？

### Gradle怎么知道在哪里查找你的源码

Gradle默认会到 `src/main/java` 目录中查找 java 文件，<br/>
到 `src/test/java` 中查找测试代码。<br/>

### Gradle把构建输出放到哪个路径

Gradle默认将构建结果输出到 `build` 目录中。<br/>

### Gradle怎么知道使用哪些编译选项

`java`插件会引入`java base`插件，由`java base`插件负责编译Java。<br/>

## 执行 Java 项目

使用`JavaExec`类型task执行运行java程序。<br/>
注：`JavaExec`不是java插件提供的task类型，是Gradle自带的。<br/>

```
task execute(type: JavaExec) {
  main = "tm.dan.gradle.Piggy" // main class 的路径
  classpath = sourceSets.main.runtimeClasspath
}
```

## 生成Jar文件

```
gradle jar
```

# 使用资源库

## 声明用于获取依赖的资源库

### 本地资源（jars）目录
```
repositories {
  flatDir {
    dirs 'libs'
  }
}
```

### 添加网络资源库(最常用的方法)
```
repositories {
  mavenCentral()
  mavenLocal()
  jcenter()
}
```

### 从Maven和IV存储库中解析托管依赖项
以maven为例（ivy的写法相同）
```
repositories {
  maven {
    url 'http://maven.aliyun.com/nexus/content/groups/public/'
  }
}
```
如果需要认证
```
repositories {
  ivy {
    url 'https://repo.foo.org/ivy'
    credentials {
      username 'username'
      password 'secret'
    }
  }
}
```

## 添加依赖

*注：`compile()`方法来自`java`插件*
```
dependencies {
  compile 'com.google.guava:guava:19.0'
}
```
也可以使用Groovy映射语法标识依赖性
```
dependencies {
  compile group: 'com.google.guava', name: 'guava', version: '19.0'
}
```
如果要添加本地文件作为依赖
```
dependencies {
  compile files('libs/foo.jar', 'libs/bar.jar')
}
```
或者使用文件树
```
dependencies {
  compile fileTree(dir: 'libs', include: '*.jar')
}
```
