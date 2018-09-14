---
---
<link rel="stylesheet" type="text/css" href="../css/common.css"/>

*前言：如果想快速安装配置的话，斜体字可以不看。*

## 安装

### 安装依赖

*以 Ubuntu 16.04 LTS 为例*<br/>
```
sudo apt install libpcre3 libpcre3-dev openssl libssl-dev libxml2-dev libxslt1-dev libgeoip-dev libgd-dev
```
注意：较低版本的Ubuntu可能找不到`libgd-dev`，可以尝试`sudo apt-get install libgd2-xpm libgd2-xpm-dev`。<br/>

### 安装FastDFS

```
cd /usr/local/src
git clone https://github.com/happyfish100/libfastcommon.git --depth 1
cd libfastcommon/
./make.sh && ./make.sh install

cd ..
git clone https://github.com/happyfish100/fastdfs.git --depth 1
cd fastdfs/
./make.sh && ./make.sh install

cp /etc/fdfs/tracker.conf.sample /etc/fdfs/tracker.conf
cp /etc/fdfs/storage.conf.sample /etc/fdfs/storage.conf
cp /etc/fdfs/client.conf.sample /etc/fdfs/client.conf #客户端文件，Client服务器测试用
cp /usr/local/src/fastdfs/conf/http.conf /etc/fdfs/ #供nginx访问使用
cp /usr/local/src/fastdfs/conf/mime.types /etc/fdfs/ #供nginx访问使用

cd ..
git clone https://github.com/happyfish100/fastdfs-nginx-module.git --depth 1
cp /usr/local/src/fastdfs-nginx-module/src/mod_fastdfs.conf /etc/fdfs
```

### 安装Nginx

*注意：不能使用安装包管理工具（例如，Ubuntu的`apt`）来安装Nginx，因为我们需要给Nginx添加模块，而Nginx不支持动态添加模块，只能在编译前添加。*<br/>

#### 下载Nginx

到Nginx官网[下载Nginx源码](https://nginx.org/en/download.html)<br/>
*怎么下载都行，这里我使用wget, 并以nginx-1.10.3版本为例*
```
cd 到任何你想存放Nginx源码的目录
wget https://nginx.org/download/nginx-1.10.3.tar.gz
tar -zxf nginx-1.10.3.tar.gz
cd nginx-1.10.3
```

#### 在作为Storage的服务器上安装Nginx

*在Storage服务器上安装Nginx是为了让多个Storage服务器协作。*

##### Configure Nginx

*[FastDFS的wiki](https://github.com/happyfish100/fastdfs/wiki)中只写了`./configure --add-module=/usr/local/src/fastdfs-nginx-module/src/`，可以根据需要添加一些参数，可以参考[官方文档](http://nginx.org/en/docs/configure.html)。*<br/>
```
./configure --add-module=/usr/local/src/fastdfs-nginx-module/src/
```
*`nginx -V`命令可以查看已安装的Nginx的configuration参数*<br/>

#### 在Tracker服务器上安装Nginx

*在Tracker服务器上安装Nginx主要为了提供反向代理、负载均衡、缓存服务*

##### 下载ngx_cache_purge（如果需要缓存服务的话）

```
cd /usr/local/src
wget http://labs.frickle.com/files/ngx_cache_purge-2.3.tar.gz
tar zxf ngx_cache_purge-2.3.tar.gz
```

##### Configure Nginx

```
./configure --add-module=/usr/local/src/ngx_cache_purge-2.3
```

#### 安装Nginx

*注意：这里直接采用覆盖安装。如果不想覆盖安装则不要执行`main install`，只执行`make`，然后手动安装即可，这里不细说。*
```
make && main install
ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx # 将nginx加入环境变量
mkdir -p /var/lib/nginx/body                     # 创建http-client-body-temp-path路径
```

**注意，添加fastdfs-nginx-module之后，如果没有进行配置，Nginx是不能访问的...这个太坑了，花了我好长时间...**

## 配置

*假设我们有以下设备*
* *2台tracker服务器: T1, T2*
    * *T1的IP：192.168.10.101*
    * *T2的IP：192.168.10.102*
* *4台storage服务器: S11, S12, S21, S22, 分为2组*
    * Group1
        * *S11的IP：192.168.10.111*
        * *S12的IP：192.168.10.112*
    * Group2
        * *S21的IP：192.168.10.121*
        * *S22的IP：192.168.10.122*

### Tracker服务器配置

*Tracker服务器可以只做Tracker，也可以既做Tracker又做Storage。如果服务器只作为Tracker使用，则只需要配置tracker.conf。如果还需要作Storage使用，则参考 Storage服务器配置。*<br/>
所有Tracker服务器的配置相同。<br/>
```
vim /etc/fdfs/tracker.conf
#需要修改的内容如下
port=22122                  # tracker服务器端口（默认22122,一般不修改）
base_path=/fastdfs/tracker  # 存储日志和数据的根目录
```
启动tracker服务
```
/etc/init.d/fdfs_trackerd start
```

### Storage服务器配置

*Storage服务器只需要配置storage.conf。*<br/>
*注意：tracker_server不能是localhost或127.0.0.1，否者会报错。*<br/>

I、S11服务器配置
```
vim /etc/fdfs/storage.conf
#需要修改的内容如下
group_name=group1                    # 配置Storage服务器所属的组
port=23000                           # storage服务端口（默认23000,一般不修改）
base_path=/fastdfs/storage           # 数据和日志文件存储根目录
store_path0=/fastdfs/storage         # 第一个存储目录
tracker_server=192.168.10.101:22122  # T1服务器IP和端口
tracker_server=192.168.10.102:22122  # T2服务器IP和端口
http.server_port=8888                # http访问文件的端口(默认8888,看情况修改,和nginx中保持一致)
```
有几个Tracker服务器就在storage.conf文件中配置几个，例如：<br/>
```
tracker_server=192.168.10.101:22122  # tracker1 IP地址
tracker_server=192.168.10.102:22122  # tracker2 IP地址
```
启动storage服务
```
/etc/init.d/fdfs_storaged start
```

II、S12服务器配置（与S11相同）
```
vim /etc/fdfs/storage.conf
#需要修改的内容如下
group_name=group1                    # 配置Storage服务器所属的组
port=23000                           # storage服务端口（默认23000,一般不修改）
base_path=/fastdfs/storage           # 数据和日志文件存储根目录
store_path0=/fastdfs/storage         # 第一个存储目录
tracker_server=192.168.10.101:22122  # T1服务器IP和端口
tracker_server=192.168.10.102:22122  # T2服务器IP和端口
http.server_port=8888                # http访问文件的端口(默认8888,看情况修改,和nginx中保持一致)
```
启动storage服务同上

III、S21服务器配置（注意group_name的配置）
```
vim /etc/fdfs/storage.conf
#需要修改的内容如下
group_name=group2                    # 配置Storage服务器所属的组
port=23000                           # storage服务端口（默认23000,一般不修改）
base_path=/fastdfs/storage           # 数据和日志文件存储根目录
store_path0=/fastdfs/storage         # 第一个存储目录
tracker_server=192.168.10.101:22122  # T1服务器IP和端口
tracker_server=192.168.10.102:22122  # T2服务器IP和端口
http.server_port=8888                # http访问文件的端口(默认8888,看情况修改,和nginx中保持一致)
```
启动storage服务同上

IV、S22服务器配置（与S21相同）
```
vim /etc/fdfs/storage.conf
#需要修改的内容如下
group_name=group2                    # 配置Storage服务器所属的组
port=23000                           # storage服务端口（默认23000,一般不修改）
base_path=/fastdfs/storage           # 数据和日志文件存储根目录
store_path0=/fastdfs/storage         # 第一个存储目录
tracker_server=192.168.10.101:22122  # T1服务器IP和端口
tracker_server=192.168.10.102:22122  # T2服务器IP和端口
http.server_port=8888                # http访问文件的端口(默认8888,看情况修改,和nginx中保持一致)
```
启动storage服务同上

### 配置fastdfs-nginx-module

在所有Storage服务器上都需要配置mod_fastdfs.conf文件。<br/>
```
connect_timeout=10                   # 连接超时时间
base_path=/tmp                       # 缓存目录
tracker_server=192.168.10.101:22122  # tracker服务器的IP地址和端口
tracker_server=192.168.10.102:22122  # 多个tracker直接添加多条配置
storage_server_port=23000            # storage server端口号
group_name=group1                    # 当前Storage服务器的组名（第一组为group1，第二组为group2）
url_have_group_name = true           # 文件URL是否带上group组名
store_path0=/fastdfs/storage         # 存储路径
group_count=2                        # group组的个数

[group1]                             # 第一组storage存储节点配置
group_name=group1                    # 组名
storage_server_port=23000            # storage server端口号
store_path_count=1                   # 存储路径个数，需要和store_path个数匹配
store_path0=/fastdfs/storage         # 存储路径

[group2]                             # 第二组storage存储节点配置
group_name=group2                    # 组名
storage_server_port=23000            # storage server端口号
store_path_count=1                   # 存储路径个数，需要和store_path个数匹配
store_path0=/fastdfs/storage         # 存储路径
```

### 删除Storage服务器(If you want)

*这里有个比较操蛋的地方，如果group设置错了，比如本来想设置在group2，但设置到了group1。这时单纯修改storage.conf和重启storage服务是不够的。*<br/>
*假设S21的组写错了，应该是group2，但写成了group1*
```
/usr/bin/fdfs_monitor /etc/fdfs/storage.conf delete group1 192.168.10.121<br/>
# 删除所有tracker服务器base目录中data目录下的所有文件，重新启动tracker服务
cd /fastdfs/storage
rm -rf *
```

### 查看集群信息

在任意一台Storage服务器上执行：
```
/usr/bin/fdfs_monitor /etc/fdfs/storage.conf
```

### 查看主tracker

在任一Storage服务器上<br/>
```
tail -f /fastdfs/storage/logs/storaged.log
```

### 配置Nginx

#### 配置Storage服务器的Nginx

修改nginx配置文件

```
server {
    listen       8888;       ## 该端口为storage.conf中的http.server_port相同
    server_name  localhost;
    location ~/group[0-9]/ { ## 注意这里的变更
        ngx_fastdfs_module;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
    root   html;
    }
}
```

#### 配置Tracker服务器的Nginx

修改nginx配置文件

##### 设置负载均衡参数

```
http {
...
    #设置Group1的存储服务器
    upstream fdfs_group1 {
        server 192.168.10.111:8888 weight=1 max_fails=2 fail_timeout=30s;
        server 192.168.10.112:8888 weight=1 max_fails=2 fail_timeout=30s;
    }
    #设置Group2的存储服务器
    upstream fdfs_group2 {
        server 192.168.10.121:8888 weight=1 max_fails=2 fail_timeout=30s;
        server 192.168.10.122:8888 weight=1 max_fails=2 fail_timeout=30s;
    }
...
    server {
        listen       8080;       ## 设置Nginx端口
        ...
        #设置Group1的负载均衡参数
        location /group1/M00 {
            proxy_next_upstream http_502 http_504 error timeout invalid_header;
            proxy_pass http://fdfs_group1;
            expires 30d;
        }
        #设置Group2的负载均衡参数
        location /group2/M00 {
            proxy_next_upstream http_502 http_504 error timeout invalid_header;
            proxy_pass http://fdfs_group2;
            expires 30d;
        }
    }
...
}
```

##### 配置缓存参数（如果需要缓存服务的话）

```
http {
    ...
    #设置缓存存储路径、存储方式、分配内存大小、磁盘最大空间、缓存期限
    proxy_cache_path /fastdfs/cache/nginx/proxy_cache levels=1:2
    keys_zone=http-cache:200m max_size=1g inactive=30d;
    proxy_temp_path /fastdfs/cache/nginx/proxy_cache/tmp;

    server {
        ...
        #设置Group1的负载均衡参数
        location /group1/M00 {
            proxy_next_upstream http_502 http_504 error timeout invalid_header;
            proxy_cache http-cache;
            proxy_cache_valid 200 304 12h;
            proxy_cache_key $uri$is_args$args;
            proxy_pass http://fdfs_group1;
            expires 30d;
        }
        #设置Group2的负载均衡参数
        location /group2/M00 {
            proxy_next_upstream http_502 http_504 error timeout invalid_header;
            proxy_cache http-cache;
            proxy_cache_valid 200 304 12h;
            proxy_cache_key $uri$is_args$args;
            proxy_pass http://fdfs_group2;
            expires 30d;
        }
        #设置清除缓存的访问权限，allow充许清除缓存的访问网段
        location ~/purge(/.*) {
            allow 127.0.0.1;
            allow 192.160.10.0/32;
            deny all;
            proxy_cache_purge http-cache $1$is_args$args;
        }
    }
}
```

#### 启动Nginx服务

```
nginx
```

### Client配置

*可以使用任意一台Tracker服务器作为Client，也可以单独搭一台（需要按以上步骤安装FastDFS）。*<br/>
有几个tracker就在client.conf文件中配置几个，例如：<br/>
```
vim /etc/fdfs/client.conf
#需要修改的内容如下
base_path=/fastdfs/tracker
tracker_server=192.168.10.101:22122  # T1 IP地址
tracker_server=192.168.10.102:22122  # T2 IP地址
```

#### 上传文件

*以上传/usr/local/src/nginx-1.12.2.tar.gz文件为例*
```
fdfs_upload_file /etc/fdfs/client.conf /usr/local/src/nginx-1.12.2.tar.gz
```
上传后,返回ID表示成功，例如:`group1/M00/00/00/wKgAQ1pysxmAaqhAAA76tz-dVgg.tar.gz`

#### 访问文件

文件上传后可以使用任一Storage服务器的IP访问文件，例如：<br/>
```
http://192.168.10.121/group1/M00/00/00/wKgAQ1pysxmAaqhAAA76tz-dVgg.tar.gz
```
如果Tracker服务器的Nginx服务已配置好，可以使用Tracker服务器的IP范文文件，例如：<br/>
```
http://192.168.10.101/group1/M00/00/00/wKgAQ1pysxmAaqhAAA76tz-dVgg.tar.gz
```

### 开机自启动

*这里以 Ubuntu 16.04 LTS 为例*
```
apt -y install sysv-rc-conf   # 如果已安装则忽略
# tracker服务器配置
sysv-rc-conf fdfs_trackerd on
# storage服务器配置
sysv-rc-conf fdfs_storaged on
```

#### Nginx自启动

[下载nginx init脚本](https://thomasl007.gitee.io/assets/nginx)
也可以到[Nginx官方脚本主页](https://www.nginx.com/resources/wiki/start/topics/examples/initscripts/)下载
```
cd /etc/init.d
wget https://thomasl007.gitee.io/assets/nginx
chmod 755 nginx
update-rc.d nginx defaults
sysv-rc-conf nginx on
```

## FastDFS安装PHP扩展

假设你已经安装了php，php-devel, php-fpm
**注意：FastDFS好像是挑php版本（不确定），不知道是不是安装的问题，之前安装php5.6始终报error500。安装php5.4就没问题。**

首先需要关闭SELinux，然后
```
cd /usr/local/src/fastdfs/php_client/
phpize
./configure --with-php-config=/usr/local/php/bin/php-config # 后边的路径是php-config目录的位置，根据实际情况修改
make && make install

cp fastdfs_client.ini /etc/php.d/      # 推荐这种
或者
cat fastdfs_client.ini >> /etc/php.ini # /etc/php.ini是php配置文件的路径，根据实际情况修改

cp /usr/local/src/fastdfs/php_client/fastdfs_test.php /usr/local/nginx/html/ # 第二个路径是nginx主目录的位置
```

输入 `http://服务器地址/fastdfs_test.php`查看状态

### 可能的错误

#### HTTP ERROR 500

php_client了的函数调用出了问题，先确认安装过程，如果没问题，看看是不是浏览器缓存...或者换apache试试

#### fastdfs_tracker_make_all_connections result: bool(false) bool(false)

先确认storage和tracker服务是否启动了，如果已启动仍然报错，就看看SELinux是否已关闭。

## 错误汇总

*在`/usr/local/nginx/logs/error.log`中查看错误日志*
1. ERROR - file: /usr/local/src/fastdfs-nginx-module/src//common.c, line: 111, section: group1, you must set parameter: group_name!<br/>
原因：mod_fastdfs.conf中的group_count配置的个数与下面配置的[group*]个不一致。

## 参考

* [FastDFS的wiki](https://github.com/happyfish100/fastdfs/wiki)
* [这篇文章写得很详细](https://blog.csdn.net/xinxin19881112/article/details/77750615)

<script type="text/javascript" src="../js/md.js"></script>
<script>
setHeader("FastDFS配置和使用");
</script>

