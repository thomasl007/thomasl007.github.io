---
---
* content
{:toc}

## 下载安装tomcat

可以使用ubuntu的apt进行自动安装，但是不太好管理和使用。所以这里我们自己下载安装。
1. 去官方下载core里的压缩包。
1. 下载后解压
1. 放到你想要放到你喜欢的位置

## 创建用于启动tomcat的账户

出于安全性考虑，一般会新建一个用户用于启动tomcat
> 不要使用root用户启动tomcat，Java程序与C程序不同。nginx,httpd 使用root用户启动守护80端口，子进程/线程会通过setuid(),setgid()两个函数切换到普通用户。即父进程所有者是root用户，子进程与多线程所有者是一个非root用户，这个用户没有shell，无法通过ssh与控制台登陆系统，Java 的JVM 是与系统无关的，是建立在OS之上的，你使用什么用户启动Tomcat，那麽Tomcat 就会继承该所有者的权限。 
这造成了一个问题，Linux系统小于1024的端口只有root可以使用，这也是为什么Tomcat默认端口是8080。如果你想使用80端口只能使用root启动Tomcat。这有带来了很多安全问题。 

新建用户和组
```
groupadd tomcat
useradd -r tomcat -d tomcat所在路径 --s /bin/false
```

## 安全性配置

禁用8005端口：
telnet localhost 8005 然后输入 SHUTDOWN 就可以关闭 Tomcat，为了安全我们要禁用该功能 
```                     
<Server port="-1" shutdown="SHUTDOWN"> 
```

应用程序安全：
关闭war自动部署 unpackWARs="false" autoDeploy="false"。防止被植入木马等恶意程序
关闭 reloadable="false" 也用于防止被植入木马
