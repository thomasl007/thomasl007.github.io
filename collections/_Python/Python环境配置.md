---
---

* content
{:toc}

#### 安装(以Ubuntu为例)

```
sudo apt install python2.7 python-pip
```

#### 常见Error

##### Python packaging tools not found

安装python-pip, 如果使用的是python3, 则安装python3-pip

##### pip安装模块时提示 Read timed out 的问题

pypi在国内经常被墙.f**k
需要修改一下pip源. (如果已经修改了, 仍然超时, 那就是你的网络问题, 修改一下超时时间)
国内比较好的有
* 豆瓣的 http://pypi.douban.com/simple/
* 清华的 https://pypi.tuna.tsinghua.edu.cn/simple
* 阿里的 http://mirrors.aliyun.com/pypi/simple/
* 中科大 https://pypi.mirrors.ustc.edu.cn/simple/

_以使用清华的为例:_
**临时使用:**
```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple gevent # 使用清华的镜像安装gevent库
```
**永久使用:**
修改pip配置文件, 路径如下, 没有就创建一个
Linux, ` ~/.pip/pip.conf`
Windows, `C:\Users\你的用户名\pip\pip.ini`
添加以下内容:
```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

**修改超时时间**
一样是在上边的配置文件里
```
[global]
timeout = 6000
```
