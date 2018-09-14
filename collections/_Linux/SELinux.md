---
---
<link rel="stylesheet" type="text/css" href="../css/common.css"/>

## SELinux

### 查看SELinux状态

```
getenforce
```

### 关闭SELinux

#### 临时

```
setenforce 0
```

#### 永久

```
vim /etc/selinux/config
# 修改
SELINUX=disabled
```

<script type="text/javascript" src="../js/md.js"></script>
<script>
setHeader("SELinux");
</script>
