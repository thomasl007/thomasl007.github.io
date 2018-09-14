---
---
## 配置文件位置

*以MySQL 5.6+版本为例*
```
/etc/mysql/mysql.conf.d/mysqld.conf
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
