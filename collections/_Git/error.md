---
---
# git常见错误

1.
**错误：** 
```
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```
**原因：**<br/>
一般是项目codebase太大<br/>
**方案：**
```
git config --add core.compression -1
or
git config --global --add core.compression -1
```

2.
**错误：**
```
fatal: Not a git repository
```
**原因：**<br/>
未创建本地git厂库（未创建存储git配置文件的目录）
**方案：**
```
git init
```
