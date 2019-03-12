---
---

#### 开发环境

* Ubuntu18.04lts 64位 (**最好是32位系统, 更方便些, 64位也可以**)
* IDEA Intellj
* jdk 1.8 32位 (**必须是32位**)

#### 安装CH340驱动

[CH340驱动下载地址](http://wch.cn/search?t=all&q=CH340).

**官方提供的Linux版驱动编译时可能会报错, 需要修改一下**
修改方法参见[这个](https://github.com/juliagoda/CH341SER).

#### 查看端口名称&设置端口权限

使用以下命令可以查看端口对应的名称
```
dmesg | grep tty
```
具体可以参见[这个](https://www.cyberciti.biz/faq/find-out-linux-serial-ports-with-setserial/).

假设你的设备名称是`ttyUSB0`, 则执行以下命令设置设备权限
```
sudo chmod 666 ttyUSB0
```
如果不修改权限, 则rxtx读取不到设备.

#### 环境配置

##### 安装librxtx-java

如果你是**32位系统**会方便一些.
运行以下命令安装
```
sudo apt-get install librxtx-java
```
然后把`librxtxSerial.so`和`librxtxParallel.so`拷贝到你的jre的相应路径里.
**注意, jdk必须是32位的**
```
sudo cp /usr/lib/jni/librxtxSerial.so {你的jdk路径}/jre/lib/i386/librxtxSerial.so
sudo cp /usr/lib/jni/librxtxParallel.so {你的jdk路径}/jre/lib/i386/librxtxParallel.so
```
这可以处理以下问题:
`UnsatisfiedLinkError: no rxtxSerial in java.library.path`

如果你是**64位系统**, 则系统安装的`librxtxSerial.so`是不能用的. 你需要到官网[下载](http://jlog.org/rxtx-lin.html)32位版本.
否则会出现以下问题:
`librxtxSerial.so which might have disabled stack guard. The VM will try to fix the stack guard now.`
(`librxtxParallel.so`我没有找到32位版本, 我目前在使用上没遇到问题, 就先这样了...)

##### 导入RXTXcomm.jar

如果你是**32位系统**, 则直接把`/usr/share/java/RXTXcomm.jar`导入工程.
如果你是**64位系统**, 则需要到官网[下载](http://jlog.org/rxtx-lin.html)32位版本, 然后导入工程.
