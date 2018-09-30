---
---

## PHP支持

### I、安装php和php-fpm

*以CentOS官方php源为例*
```
yum install php php-fpm -y
```

### II、安装Nginx

你怎么爽怎么装

### III、配置Nginx

修改Nginx配置文件，添加以下内容（通常Nginx的配置文件里是有的，只是注释掉了，解注释修改下即可）
**注意：不同版本的php，配置方法可能不同，这里以php5.6及之前的版本为例**

```
location ~ \.php$ {
        #指定php的根目录
        root          html;
        #php-fpm的默认端口是9000
        fastcgi_pass  127.0.0.1:9000;
        fastcgi_index index.php;
        #注意这个地方的变更，否者可能报错
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include       fastcgi_params;
}
```

### IV、启动php-fpm

*以CentOS官方php源为例*
```
service php-fpm start
```

### V、启动或重启Nginx

*以CentOS为例，并假设你已将nginx加入了环境变量*
```
nginx
或
nginx -s reload
```

### 可能的错误

#### connect() failed (111: Connection refused) while connecting to upstream

可能是没安装或没启动php-fpm

#### 找不到php文件（File not found）

可能是配置的问题，查一下看看`fastcgi_param`配置是否正确
```
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
```
也可能是php-fpm配置的问题

# 常用配置

## 配置上传文件大小限制

如果要设置全局配置，则在nginx.conf中的http{}中添加以下内容：
```
lient_max_body_size 30m;
```
