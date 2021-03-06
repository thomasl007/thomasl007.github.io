---
---

**注：`compile`来自`java`插件。但在Gradle新版本，Gradle推荐使用`java-library`插件中的`api`和`implementation`代替`compile`，但三者的区别不是本文的重点，所以本文中只使用compile引入依赖。**

## 构建Java

* [关于Java插件的官方文档](https://docs.gradle.org/current/userguide/java_plugin.html)
* [Java插件快速入门官方文档](https://docs.gradle.org/current/userguide/tutorial_java_projects.html)

*本节中的代码，默认是在引入"java"插件的情况下运行的*<br/>

### 编译 Java 项目

先思考几个问题：<br/>
1. Gradle怎么知道在哪里查找你的源码？
1. Gradle怎么知道使用哪些编译选项？
1. Gradle把构建输出放到哪个路径？

#### Gradle怎么知道在哪里查找你的源码

Gradle默认会到 `src/main/java` 目录中查找 java 文件，<br/>
到 `src/test/java` 中查找测试代码。<br/>

#### Gradle把构建输出放到哪个路径

Gradle默认将构建结果输出到 `build` 目录中。<br/>

#### Gradle怎么知道使用哪些编译选项

`java`插件会引入`java base`插件，由`java base`插件负责编译Java。<br/>

### 执行 Java 项目

使用`JavaExec`类型task执行运行java程序。<br/>
注：`JavaExec`不是java插件提供的task类型，是Gradle自带的。<br/>

```
task execute(type: JavaExec) {
  main = "tm.dan.gradle.Piggy" // main class 的路径
  classpath = sourceSets.main.runtimeClasspath
}
```

### 生成Jar文件

```
gradle jar
```

### `application`插件

我们可以在build.gradle文件中添加`application`插件来帮助我们编译java工程。<br/>
实际上，`application`插件已经包含`java`插件了。<br/>
`java`和`application`会为我们添加一些用于 build、clean、run、distribute Java 工程的 task。<br/>
可以到Gradle官网了解更多关于[application](https://docs.gradle.org/current/userguide/application_plugin.html)插件的内容。<br/>

## 使用资源库

### 声明用于获取依赖的资源库

#### 本地资源（jars）目录
```
repositories {
  flatDir {
    dirs 'libs'
  }
}
```

#### 添加网络资源库(最常用的方法)
```
repositories {
  mavenCentral()
  mavenLocal()
  jcenter()
}
```

#### 从Maven和IV存储库中解析托管依赖项
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

### 添加依赖

*注：`compile()`等方法来自`java`插件*
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

#### 不同配置的依赖

使用`配置名称`+`依赖符`的形式引入不同配置的依赖，例如，`testCompile`

#### 自定义配置

```
configurations {
  custom
}
dependencies {
  custom 'com.google.guava:guava:19.0'
}
task copyDependencies(type: Copy) {
  from configurations.custom
  into 'build/libs'
}
```

### 查看项目依赖

使用
```
gradle dependencies
```
命令可以查看项目依赖。<br/>
如果要查看特定配置类型的依赖，可以添加`--configuration 依赖配置类型`<br/>
例如，
```
gradle dependencies --configuration compile
```

#### 查看依赖关系（依赖报告）

有时，我们引入一个依赖后，查看依赖时会发现有多个依赖，这个因为我们引入的依赖需要用到其他依赖。<br/>
以`commons-logging:commons-logging:1.2`为例，我们可以使用
```
gradle dependencyInsight --dependency common-logging
```
命令，查看`common-logging`是被谁依赖的。<br/>

**依赖报告的一个很重要的用途是，查看依赖版本冲突**

### 自动化测试

#### 单元测试

将测试代码放在 `src/test/java` 目录下。(可以通过配置testSourcesSet修改)<br/>
配置测试依赖性，以使用`junit`为例
```
dependencies {
  testCompile 'junit:junit:4.11'
}
```
运行
```
gradle test
```
测试报告位于
```
build/reports/
```
