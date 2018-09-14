---
---
<link rel="stylesheet" type="text/css" href="../src/common.css"/>

<script type="text/javascript" src="../src/md.js"></script>
<script>
setHeader("Ubuntu开机自启动");
</script>

## 前言

Ubuntu 16.04 LTS之前，使用`sysv (chkconfig)`管理服务。<br/>
Ubuntu 18.04 LTS之后，使用`systemd`管理服务。<br/>

```
sudo apt-get -y install sysv-rc-conf
sudo sysv-rc_conf
```
