---
---
### MySQL 字符串截取函数：

* left()
* right()
* substring() (mid(), substr()功能相同)
* substring_index()

#### left(str, length)

<br/>从左边开始，取length个字符
```MySQL
select left('thomasl007', 3);
```
|left('thomasl007', 3)|
|-|
|tho|

#### right(str, length)

<br/>从右边开始，取length个字符
```MySQL
select right('thomasl007', 3);
```
|right('thomasl007', 3)|
|-|
|007|

#### substring

##### substring(str, pos);

<br/>从第pos个字符开始截取
```MySQL
select substring('thomasl007', 3);
```
|substring('thomasl007', 3)|
|-|
|study.com|

##### substring(str, pos, len)

<br/>从第pos个字符开始取len个字符
```MySQL
select substring('thomasl007', 3, 4);
```
|substring('thomasl007', 3, 4)|
|-|
|omas|

<br/>从倒数第pos个字符位置开始截取
```MySQL
select substring('thomasl007', -3);
```
|substring('thomasl007', -3)|
|-|
|007|

<br/>从倒数第pos个字符开始取pos个字符。
```MySQL
select substring('thomasl007', -3, 4);
```
|substring('thomasl007', -2, 4)|
|-|
|dy|

#### 字符串截取：substring_index(str,delim,count)

<br/>截取第count个delim之**前**的所有字符 
```MySQL
select substring_index('thomasl007.gitee.com', '.', 1);
```
|substring_index('thomasl007', '.', 1)|
|-|
|thomasl007|

<br/>截取倒数第count个delim之后的所有字符
```MySQL
select substring_index('thomasl007.gitee.com', '.', -1);
```
|substring_index('thomasl007.gitee.com', '.', -1)|  
|-|
|com|

<br/>如果找不到delim，则返回整个字符串
```MySQL
select substring_index('thomasl007.gitee.com', 'github', 1);
```
|substring_index('thomasl007.gitee.com', 'github', 1)|
|-|
|thomasl007.gitee.com|