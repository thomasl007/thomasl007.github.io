---
---
#### 版本信息

|信息|发行版|命令|
|-|-|-|
|发行版版本|CentOS|`cat /etc/redhat-release`<br/>`cat /etc/centos-release`|
||Ubuntu|`sudo lsb_release -a`|
|内核版本（Linux版本）|-|`cat /proc/version`<br/>`uname -a`<br/>`uname -r`|
|系统是多少位|-|`getconf LONG_BIT`|

#### 网络信息

|操作|命令|说明|
|-|-|-|
|查看IP|`ip addr`<br/>`ifconfig`||
|查看出口IP|`curl ifconfig.me`||
||`curl ipinfo.io`||
||`curl cip.cc`||
||`curl http://members.3322.org/dyndns/getip`|可能无效|
||`curl myip.ipip.net`|可能无效|

#### SELinux

|操作|命令|说明|
|-|-|-|
|查看SELinux状态|`getenforce`||
|关闭SELinux|`setenforce 0`|临时关闭，重启恢复|
||修改/etc/selinux/config<br/>`SELINUX=disabled`|永久关闭|

## 通用

### Linux常用命令

#### 始终以root权限执行命令

```
sudo -i
```

### 查看目录大小

进入目录执行命令`du -sh`

### 扯淡

几个可以用来扯淡的小工具
骇客帝国`cmatrix`
Linux Logo `linuxlogo`
字符图形化输出 `figlet`

---
## Ubuntu

#### root账户相关
###### 激活root
```
sudo passwd root
```
###### 屏蔽root
```
sudo passwd -l root # 'l' means 'lock'
```

#### 开机自启动

Ubuntu 16.04 LTS之前，使用`sysv (chkconfig)`管理服务。<br/>
Ubuntu 18.04 LTS之后，使用`systemd`管理服务。<br/>

```
sudo apt-get -y install sysv-rc-conf
sudo sysv-rc_conf
```

#### 常见错误

###### locale.Error: unsupported locale setting

```
$ locale # 插件locale设置
```
根据数据结果进行设置，比如设置LC_ALL
```
$ export LC_ALL=en_US.UTF-8
```

---
## CentOS

### yum常用命令

#### 查找命令所在安装包

```
yum search ifconfig
```

### 网络配置

#### CentOS网络配置脚本文件位置

```
/etc/sysconfig/network-scripts
```

#### DNS配置

##### CentOS7

网络配置由NetworkManager管理，直接修改`/etc/resolv.conf`无效。<br/>
有几种方案处理这个问题。<br/>

###### 方案一

直接修改网卡配置文件<br/>

查看网卡名称
```
ip addr
```

假设网卡是ens33
```
cd /etc/sysconfig/network-scripts/
vim ifcfg-ens33
#添加以下内容
DNS1 你的DNS
#如果有备用DNS
DNS2 你的备用DNS
```

重启网络服务
```
service network restart
```

###### 方案二

关闭NetworkManager<br/>
```
systemctl stop NetworkManager.service
chkconfig NetworkManager off
```
然后直接编辑`/etc/resolv.conf`（参考下边的CentOS7之前的版本）<br/>
**注意，使用这个方案可能需要把手动将network设置为开机自启动。**

##### CentOS**7之前**的版本

直接修改`/etc/resolv.conf`即可
```
echo nameserver 你的DNS > /etc/resolv.conf
```
或
```
vim /etc/resolv.conf
#添加以下内容
nameserver 你的DNS
```

### 端口和防火墙

CentOS7开始使用`firewalld`防火墙。<br/>

#### 需要注意的问题

从RedHat7开始，默认情况下，即使防火墙关闭，也只开放22端口，其他端口仍然是关闭的。

#### 端口

```
查看开放的端口
firewall-cmd --list-ports
查看端口状态（例如，80端口）
firewall-cmd --query-port=80/tcp
开放端口（例如，80端口）
firewall-cmd --add-port=80/tcp --permanent
关闭端口（例如，80端口）
firewall-cmd --remove-port=80/tcp --permanent
```
注意修改后执行
```
firewall-cmd --reload
```

#### 防火墙

```
启动： systemctl start firewalld
查看状态： systemctl status firewalld
停止： systemctl disable firewalld
禁用： systemctl stop firewalld
启动服务：systemctl start firewalld.service
关闭服务：systemctl stop firewalld.service
重启服务：systemctl restart firewalld.service
服务的状态：systemctl status firewalld.service
在开机时启用一个服务：systemctl enable firewalld.service
在开机时禁用一个服务：systemctl disable firewalld.service
查看服务是否开机启动：systemctl is-enabled firewalld.service
查看已启动的服务列表：systemctl list-unit-files|grep enabled
查看启动失败的服务列表：systemctl --failed
查看版本： firewall-cmd --version
查看帮助： firewall-cmd --help
显示状态： firewall-cmd --state
查看所有打开的端口： firewall-cmd --zone=public --list-ports
更新防火墙规则： firewall-cmd --reload
查看区域信息:  firewall-cmd --get-active-zones
查看指定接口所属区域： firewall-cmd --get-zone-of-interface=eth0
拒绝所有包：firewall-cmd --panic-on
取消拒绝状态： firewall-cmd --panic-off
查看是否拒绝： firewall-cmd --query-panic
```

*`--zone`: 作用域，例如，`--zone=public`*<br/>
*`--permanent`: 永久生效*

### CentOS最小安装的问题

#### ifconfig、netstat找不到

```
yum install net-tools
```

### 关于httpd

```
启动
## /usr/sbin/httpd -k start
停止
## /usr/sbin/httpd -k stop
```
如果实在停不了
```
ps -aux | grep httpd
```
挨个kill
