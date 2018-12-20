---
---

## HTTP的参数

### 一、在Header里放参数（即 Query参数，参数在URL中）
```
?param1=value1&param2=value2
```
参数在url中，所以也可以说参数在Header中。

### 二、Body里放参数

Body里放参数有多种方式，使用`Content-type`告知服务器参数的位置。

#### 1. application/x-www-form-urlencoded

以表单的形式传递参数，采用Key-Value的方式。
据说就是简单的把URL参数中？后的字符串移到Body里。

#### 2. application/json

参数是一个符合JSON格式的字符串。

#### 3. multipart/form-data
#### 4. text/plain
#### 5. 文件
