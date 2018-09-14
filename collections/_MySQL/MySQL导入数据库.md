---
---
## 命令行导入数据库

假设已经有`.sql`脚本文件。
**注意：脚本文件中必须包含schema信息。**
```
mysql> create database your_schema;
mysql> use your_schema;
mysql> set names utf8;
mysql> source your_sql_script_file;
```

据说以下方法也可以，但没试过
```
shell> mysql -u your_username -p your_password < your_sql_script_file
```
