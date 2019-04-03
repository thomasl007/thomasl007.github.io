---
---
* content
{:toc}

## 配置文件位置

*以MySQL 5.6+版本为例*
```
/etc/mysql/mysql.conf.d/mysqld.conf
```

## Errors

### MySQL 5.7 密码问题

MySQL 5.7 开始，安装过程中不会提示设置root密码，如果尝试使用root进行无密码登录（`mysql -u root`）会提示以下错误：
> ERROR 1698 (28000): Access denied for user 'root'@'localhost'

不同的系统、不同的Linux发行版、不同的安装方式，处理方法可能不同。

一、Ubuntu（Debian系应该都可以参考这个）

第一种：【官方建议】mysql_secure_installation
执行`mysql_secure_installation`，按提示一步步操作
但要注意密码安全等级，如果密码不符合安全等级，设置密码会失败。
如果要使用低级别的密码，则需要先使用第二种或第三种方法，登录mysql，然后参考下边的“修改密码安全等级”进行修改。

第二种：使用root进行无密码登录，然后设置root密码
[stackoverflow](https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)
```
$ sudo mysql -u root # I had to use "sudo" since is new installation

mysql> USE mysql;
mysql> UPDATE user SET plugin='mysql_native_password', authentication_string=PASSWORD('123456') WHERE user='root';
mysql> FLUSH PRIVILEGES;
mysql> exit;

$ service mysql restart
```
第三种：【适用于使用apt安装，未验证是否适用于使用官方包安装】实际上MySQL 5.7在安装时，已经为我们提供了密码，我们可以使用这个密码进行登录
密码位置：/etc/mysql/debian.cnf
但注意用户名不是root
登录之后，可以按第二种处理方法中的方式设置root密码

二、CentOS

使用官方的Yum源进行安装时，MySQL会生成一个随机密码。
密码位置：/var/log/mysqld.log
执行名`sudo cat /var/log/mysqld.log | grep 'temporary password'`获取随机密码
登录之后，可以按上边Ubuntu中的第二种处理方法中的方式设置root密码

### 修改密码安全等级

登录mysql命令行
```
mysql> show variables like 'validate_password%'; # 查看密码安全选项
mysql> set global xxxx=xxx; # 设置安全选项
```

## 允许远程连接

MySQL未开启远程访问时，会出现以下错误：
```
2003-Can’t connect to MySQL on ‘192.168.1.2’(10061)
```

### 开启远程连接需要执行以下两个操作：

#### 1、修改配置文件

*不同系统不同版本的配置文件名和位置可能不同, 这里以MySQL 5.6为例*<br/>
修改配置文件
```
bind-address=0.0.0.0
```
重启MySQL服务

#### 2、追加远程访问用户（两种方式、终端操作）

登录数据库
```
mysql -u root -p
```

*NOTE：以下所有命令中提到的`root`都代表用户名，如果不想让远程用户用`root`登录，可以改成已存在的其他用户名*<br/>

有两种方式追加远程访问用户：

第一种方式：追加用户（改表）
```
mysql>use mysql;                                      # 选择schema

# 更新root用户 或 新插入一条数据 （两种方式采用一种即可）
# 更新root用户
mysql>update user set host = '%' where user = 'root'; # %代表所有IP都可以访问
# 插入一条新数据
mysql>insert into user (host,user,password) values('%','root',password('123'));

mysql>select host, user from user;                    # 查看修改
mysql>flush privileges;                               # 推送设置到内存
```

第二种方式：追加授权
```
# 如果是授权所有IP
mysql>grant all privileges on *.* to 'root'@'%' identified by 'password' with grant option;
# 如果只是授权给固定IP
mysql>grant all privileges on *.* to 'root'@'客户端IP地址' identified by 'password' with grant option;
mysql>flush privileges;                               # 推送设置到内存
```

## 开启慢查询

修改配置文件
```
long_query_time=2                       # 执行时间超过2秒的时候才记录
slow_query_log=1
slow_query_log_file=/tmp/slow-query.log
log_queries_not_using_indexes=1         # 配置记录没有使用索引的查询日志
```

## 记录所有操作日志

修改配置文件
```
general_log=on
general_log_file=/tmp/mysqlquery.log
```

## 常用命令

### 查看当前连接进程

```
mysql>show full processlist;
```
