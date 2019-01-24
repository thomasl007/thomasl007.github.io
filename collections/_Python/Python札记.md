---
---
* content
{:toc}

以Python2.7为基础进行学习.

## 与其他语言较明显的区别

1. 代码块不用`{}`包含, 而是使用缩进进行区分, 缩进类型和大小必须相同.
如果定义一个空函数程序会报错，当你没有想好函数的内容是可以用`pass`语句填充，使程序可以正常运行。
1. 以新行作为语句的结束符(不使用`;`, 如果两条语句在同一行, 则可以使用`;`进行分割), 可以使用斜杠`\`将一行的语句分为多行显示, 例如
```python
total = item_one + \
        item_two + \
        item_three
```
1. 多行注释使用三个单引号`'''`或三个双引号`"""`, 例如
```python
'''
这是多行注释，使用单引号。
这是多行注释，使用单引号。
这是多行注释，使用单引号。
'''
"""
这是多行注释，使用双引号。
这是多行注释，使用双引号。
这是多行注释，使用双引号。
"""
```
1. print自动在末尾添加换行, 如果想不换行需要在变量末尾加上逗号`,`
1. 像`if`、`while`、`def`和`class`这样的复合语句, 首行以关键字开始, 以冒号`:`结束
1. 变量赋值以后该变量才会被创建, 变量赋值不需要类型声明, 例如:
```python
counter = 100 # 赋值整型变量
miles = 1000.0 # 浮点型
name = "John" # 字符串
```
1. 多个变量赋值时, 可以给不同类型的变量赋值, 例如:
```python
a, b, c = 1, 2, "john"
```
1. 循环语句后可以接`else`, else 中的语句会在循环正常执行完（即 for 不是通过 break 跳出而中断的）的情况下执行，while … else 也是一样
1. 要在函数中使用全局变量, 必须在使用之前执行`global 全局变量`, python会认为是在使用局部变量.

## 变量类型

Python有五个标准的数据类型：
1. Numbers（数字）
数字数据是不可改变的数据类型, 改变数字数据类型会分配一个新的对象
    1. int（有符号整型）
    1. long（长整型[也可以代表八进制和十六进制]）
    1. float（浮点型）
    1. complex（复数）
1. String（字符串）
1. List（列表）
1. Tuple（元组）
1. Dictionary（字典）

其中，String, Tuple, 和 Numbers 是不可更改的对象，而 List,Dictionary 等则是可以修改的对象。

#### 字符串

[字符串内建函数](http://www.runoob.com/python/python-strings.html)

###### 字符串定义

Python 可以使用引号`'`、双引号`"`、三引号`'''`或`"""`来表示字符串, 三引号字符串可以由多行组成, 例如
```python
word = 'word'
sentence = "这是一个句子。"
paragraph = """这是一个段落。
包含了多个语句"""
```

###### 字符串截取

python的字串列表有2种取值顺序:
1. 从左到右索引默认0开始的，最大范围是字符串长度少1
1. 从右到左索引默认-1开始的，最大范围是负的字符串长度

如果你要实现从字符串中获取一段子字符串的话，可以使用`[头下标:尾下标]`来截取相应的字符串
```
str = 'Hello World!'
 
print str           # 输出完整字符串
print str[0]        # 输出字符串中的第一个字符
print str[2:5]      # 输出字符串中第三个至第五个之间的字符串
print str[2:]       # 输出从第三个字符开始的字符串
print str * 2       # 输出字符串两次
print str + "TEST"  # 输出连接的字符串
```
Python 列表截取可以接收第三个参数，参数作用是截取的步长，以下实例在索引 1 到索引 4 的位置并设置为步长为 2（间隔一个位置）来截取字符串：
```
str = 'abcdefg'
print str[1:4:2]    # 输出 bd
```

###### 字符串格式化

```python
print "My name is %s and weight is %d kg!" % ('Zara', 21) 
```
输出
> My name is Zara and weight is 21 kg!

#### 列表

[列表内建函数](http://www.runoob.com/python/python-lists.html)

###### 列表操作与其他语言较明显的区别

1. 删除列表元素的方式很特别
```python
del list[2]
```
1. 列表支持`*`运算符
```python
list1 = ['physics', 'chemistry', 1997, 2000]
print list1 * 4
```
输出结果:
> ['physics', 'chemistry', 1997, 2000, 'physics', 'chemistry', 1997, 2000, 'physics', 'chemistry', 1997, 2000, 'physics', 'chemistry', 1997, 2000]
1. 列表支持`+`拼接

#### 元组

[元组内建函数](http://www.runoob.com/python/python-tuples.html)

相当于普通数组, 其中的元素不能修改

###### 与其他语言较明显的区别

1. 用`()`定义
1. 任意无符号的对象，以逗号隔开(未使用`()`包裹)，默认为元组, 例如
```python
print 'abc', -4.24e93, 18+6.6j, 'xyz'
x, y = 1, 2
print "Value of x , y : ", x,y
```
1. 可以存不同类型的变量
1. 使用`,`分割元素, 如果只有一个元素, 需要在元素后添加`,`, 即`tup1 = (50,)`
1. 支持`+`拼接, 创建全新数组
1. 支持`*`复制, 创建全新数组

#### 字典

[字典内建函数](http://www.runoob.com/python/python-dictionary.html)

###### 定义

```python
d = {key1 : value1, key2 : value2 }
```

###### 添加,更新,删除

```python
dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
 
dict['Age'] = 8           # 更新
dict['School'] = "RUNOOB" # 添加
del dict['Name']          # 删除键是'Name'的条目
dict.clear()              # 清空词典所有条目
del dict                  # 删除词典
```

###### 与其他语言较明显的区别

1. 键必须不可变，所以可以用数字，字符串或元组充当，所以用列表就不行，如下实例：
```python
dict = {['Name']: 'Zara', 'Age': 7} 
print "dict['Name']: ", dict['Name']
```

## 参数

#### 参数传递

python函数的参数传递分两种:
* 传不可变对象: 如传整数、字符串、元组. 对应C++里的传值
* 传可变对象: 如传列表，字典。对应C++里的传址

#### 参数类型

* 必备参数: 按函数声明中参数的顺序传入
* 关键字参数: 参数可以是任意顺序
```python
#可写函数说明
def printme( str ):
   "打印任何传入的字符串"
   print str;
   return;
 
#调用printme函数
printme( str = "My string");
```
* 默认参数: 有默认值的参数, 如果没有传入, 则使用默认值。
```python
#可写函数说明
def printinfo( name, age = 35 ):
   "打印任何传入的字符串"
   print "Name: ", name;
   print "Age ", age;
   return;
 
#调用printinfo函数
printinfo( age=50, name="miki" );
printinfo( name="miki" );
```
* 不定长参数: 参数名前加`*`即可. 用于存放所有未命名的变量参数.

## lambda

#### 定义

```python
# 可写函数说明
sum = lambda arg1, arg2: arg1 + arg2;
 
# 调用sum函数
print "相加后的值为 : ", sum( 10, 20 )
print "相加后的值为 : ", sum( 20, 20 )
```

#### 特点

* lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。
* lambda函数拥有自己的命名空间，且不能访问自有参数列表之外或全局命名空间里的参数。

## 模块

模块实际就是一个以`.py`结尾的python文件.

#### 引入模块

###### 使用`import`引入模块

```python
import math
```

###### 使用`from...import`引入模块中指定的内容

例如，要导入模块 fib 的 fibonacci 函数，使用如下语句：
```python
from fib import fibonacci
```

也可以使用`from...import *`引入全部内容.

###### 包的概念

包就是包含`__init__.py`文件的文件夹, 该文件的内容可以为空。`__init__.py`用于标识当前文件夹是一个包。
引入包中的模块:
```python
# 假设有包名为: package_xxx
# 包中有文件: something.py
# 文件中有函数: hello
from package_xxx.something import hello
```

#### python查找模块的顺序

1. 当前目录
1. 如果不在当前目录，Python则搜索在 shell 变量`PYTHONPATH`下的每个目录
1. 如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为`/usr/local/lib/python/`

#### 查看模块内容

使用`dir`函数查看模块内容
```python
dir(math)
```

#### 常用模块

|模块名|概述|参考|
|-|-|-|
|math|浮点数数学运算函数|[参考](http://www.runoob.com/python/python-numbers.html)|
|cmath|复数数学运算函数|[参考](http://www.runoob.com/python/python-numbers.html)|
|time|时间相同函数|[参考](http://www.runoob.com/python/python-date-time.html)|
|calendar|日历相关函数|[参考](http://www.runoob.com/python/python-date-time.html)|
|os|文件和目录|[参考](http://www.runoob.com/python/os-file-methods.html)|

## 异常处理

```python
try:
<语句>        #运行别的代码
except <名字>：
<语句>        #如果在try部份引发了'name'异常
except <名字>，<数据>:
<语句>        #如果引发了'name'异常，获得附加的数据
else:
<语句>        #如果没有异常发生
finally:
<语句>        #退出try时总会执行
```
抛异常使用`raise`关键字

## 参考

[IO操作](http://www.runoob.com/python/python-files-io.html)
[File操作](http://www.runoob.com/python/file-methods.html)
[Python内置函数](http://www.runoob.com/python/python-built-in-functions.html)

## 面向对象

### @property

`@property`必须在新式类中使用, 否则基本没有意义.

**为什么使用`@property`?**
给类添加实例变量后, 对象可以直接访问实例变量, 这样就不能在赋值时对参数进行检查, 也不能在get时进行转换.
虽然我们可以定义getter和setter函数来间接访问实例变量, 但这在使用上略显麻烦(不遵循了统一访问原则).
为了既能提供setter和getter方法, 又能简化调用方法(遵循统一访问原则), python为我们提供了`@property`.

**如何使用`@property`?**
`@property`是一个装饰器, 用于修饰方法, 使方法可以像属性一样调用.
```python
class Baby(object):

    def __init__(self):
        self.__name = ""

    @property
    def name(self):
        pass

    @name.setter
    def name(self, value):
        self.__name = value

    @name.getter
    def name(self):
        return self.__name

    @name.deleter
    def name(self):
        """可选的"""
        del self.__name


baby = Baby()
baby.name = "dan"  # 将调用@name.setter修饰的方法
print baby.name    # 将调用@name.getter修饰的方法
del baby.name      # 将调用@name.deleter修饰的方法
```
简化一下
```python
class Baby(object):

    def __init__(self):
        self.__name = ""

    @property
    def name(self):
        """同时定义getter方法, 不需要再定义使用@name.getter修饰的方法"""
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    @name.deleter
    def name(self):
        """可选的"""
        del self.__name


baby = Baby()
baby.name = "dan"  # 将调用@name.setter修饰的方法
print baby.name    # 将调用@property修饰的方法
del baby.name      # 将调用@name.deleter修饰的方法
```
只读
```python
class Baby(object):

    def __init__(self):
        self.__name = ""

    @property
    def name(self):
        """同时定义getter方法, 不需要再定义使用@name.getter修饰的方法"""
        return self.__name

    @name.deleter
    def name(self):
        """可选的"""
        del self.__name


baby = Baby()
print baby.name    # 将调用@property修饰的方法
del baby.name      # 将调用@name.deleter修饰的方法
```

