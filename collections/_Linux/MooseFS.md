---
---

## 结构

* Master服务器
* Metalogger服务器
* Chunk服务器

## 部署

### 安装

[官方文档](https://moosefs.com/download/#current)<br/>

### Master

* mfsmaster.cfg为master服务器配置文件，可以使用默认配置。
* mfsexports.cfg配置了客户端的挂载权限，

vi /etc/hosts<br/>
your.ip.address  mfsmaster

### Metalogger

配置mfsmetalogger.cfg文件。(配置与master的连接参数)<br/>

vi /etc/hosts<br/>
your.ip.address  mfsmaster

### Chunk

mfschunkserver.cfg为chunkserver.cfg的配置文件，主要配置与master的连接参数。<br/>
mfshdd.cfg定义了chunkserver的数据存放目录。<br/>

vi /etc/hosts<br/>
your.ip.address  mfsmaster

### Client

vi /etc/hosts<br/>
your.ip.address  mfsmaster

mfsmount  /mnt/mfs  -H  mfsmaster


## other

mfscgiserv
