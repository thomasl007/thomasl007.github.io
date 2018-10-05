---
---
# shadowsocks配置

## Ubuntu使用shadowsocks

### 使用命令行安装

**1. 安装shadowsocks**
```
sudo apt install shadowsocks
```
**2. 启动shadowsocks**
使用sslocal命令启动shadowsocks。<br/>
**查看使用方法**
```
sslocal --help
```
**直接在命令行输入参数**
```
sslocal -s proxy_ip -p proxy_port -k "proxy_password" -l 1080 -t 600 -m proxy_method
eg.
sslocal -s 46.17.45.110 -p 53603 -k "123" -l 1080 -t 600 -m aes-256-cfb
```
**总在命令行输入很麻烦，可以把配置内容写入json文件**
以上例中的参数为例，写入以下内容到一个json文件中，假设文件名是ss.json
```
{
    "server":"46.17.45.110",
    "server_port":53603,
    "local_port":1080,
    "password":"123",
    "timeout":600,
    "method":"aes-256-cfb"
}
```
然后再在命令行运行
```
sslocal -c ss.json
```

### chrome配置浏览器

如果只需要在浏览器中使用，则参考以下步骤，否则跳过。<br/>
**1. 在chrome浏览器中安装SwitchyOmega插件**
**2. 配置SwitchyOmega插件**
1. 左边新建情景模式-选择代理服务器-比如命名为SS（叫什么无所谓）其他默认之后创建，之后在代理协议选择SOCKS5，地址为127.0.0.1,端口默认1080 。
1. 接着点击自动切换 ( Auto switch）上面的不用管，在按照规则列表匹配请求后面选择刚才新建的SS，默认情景模式选择直接连接。点击应用选项保存。
1. 再往下规则列表设置选择AutoProxy 然后将[这个地址](https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt)填进去，点击下面的立即更新情景模式，会有提示更新成功！
1. 点击浏览器右上角的SwitchyOmega图标，下面选择自动切换，然后打开google.com试试

### 全局配置

全局配置需要使用privoxy工具。<br/>
**1. 安装privoxy**
```
sudo apt install privoxy
```
**2. 配置privoxy**
修改配置文件/etc/prioxy/config，确认包含以下内容
```
listen-address  127.0.0.1:8118
listen-address  [::1]:8118
forward-socks5 / 127.0.0.1:1080 .
```
**3. 修改环境变量**
在/etc/profile.d/下创建shadowsocks.sh，写入以下内容
```
export http_proxy=http://127.0.0.1:8118
export https_proxy=https://127.0.0.1:8118
```
生效
```
source /etc/profile
```
**4. 启动privoxy**
```
sudo service privoxy start
```

### git走ss代理

```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```
