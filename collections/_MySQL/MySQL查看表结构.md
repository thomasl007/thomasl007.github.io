---
---
```
mysql> desc table_name;
mysql> describe table_name;
```
```
show columns from table_name;
```
```
show create table table_name;
```
如果表名是数据库关键字
```
select * from information_schema.columns where table_schema = 'schema' and table_name = 'table_name';
```
