---
---
* content
{:toc}

以Python2.7为基础进行学习.
## 参考
* [菜鸟教程的Python2教程](http://www.runoob.com/python/python-tutorial.html)
* [廖雪峰的Python2教程](https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/0013747381369301852037f35874be2b85aa318aad57bda000)

## 与其他语言较明显的区别

1. 代码块不用`{}`包含, 而是使用缩进进行区分, 缩进类型和大小必须相同.
如果定义一个空函数程序会报错，当你没有想好函数的内容是可以用`pass`语句填充，使程序可以正常运行。
1. 以新行作为语句的结束符(不使用`;`, 如果两条语句在同一行, 则可以使用`;`进行分割), 可以使用斜杠`\`将一行的语句分为多行显示, 例如
```python
total = item_one + \
        item_two
```
1. 多行注释使用三个单引号`'''`或三个双引号`"""`, 例如
```python
'''
这是多行注释，使用单引号。
这是多行注释，使用单引号。
'''
"""
这是多行注释，使用双引号。
这是多行注释，使用双引号。
"""
```
1. print自动在末尾添加换行, 如果想不换行需要在变量末尾加上逗号`,`
1. 像`if`、`while`、`def`和`class`这样的复合语句, 首行以关键字开始, 以冒号`:`结束
1. 变量赋值以后该变量才会被创建, 变量赋值不需要类型声明, 例如:
```python
counter = 100   # 赋值整型变量
miles = 1000.0  # 浮点型
name = "John"   # 字符串
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

**列表操作与其他语言较明显的区别**

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

**与其他语言较明显的区别**
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

**怎么定义字典?**
```python
d = {key1 : value1, key2 : value2 }
```

**添加,更新,删除**
```python
dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}

dict['Age'] = 8           # 更新
dict['School'] = "RUNOOB" # 添加
del dict['Name']          # 删除键是'Name'的条目
dict.clear()              # 清空词典所有条目
del dict                  # 删除词典
```

**与其他语言较明显的区别**
1. 键必须不可变，所以可以用数字，字符串或元组充当，所以用列表就不行，如下实例：
```python
dict = {['Name']: 'Zara', 'Age': 7}
print "dict['Name']: ", dict['Name']
```

## 函数

### 参数

**"传值"和"传址"的问题**

"传值"和"传址"只是为了帮组理解, Python中没有"传值"和"传址"的概念.
python函数的参数传递分两种:
* 传不可变对象: 如传整数、字符串、元组. (对应C++里的传值)
* 传可变对象: 如传列表，字典。(对应C++里的传址)

**参数分类**

Python中的参数分:
* 必选参数
* 默认参数
* 不定长参数
* 关键字参数

**1, 必选参数**

按顺序传即可

**2, 默认参数**

**作用是什么?**
不传时, 使用默认值.

**怎么定义?**
定义默认参数需要注意以下两点:
1. 如果有必选参数, 则默认参数必须在必选参数之后
1. 默认参数必须指向不变对象 (君子协议)
*Python函数在定义时, 默认参数的只就已经确定, 即, 已经创建了一个对象.*
*如果传可变对象, 例如list或dict, 则函数定义时就会创建一个list或dict对象.*
*这样, 如果不给有默认值的参数重新进行赋值(每次都使用默认值), 则这个参数始终指向之前的对象.*
*那个之后所有对参数的操作, 实际上都是对同一个list或dict对象的操作. 这显然是很容易出问题的.*

```python
def print_info(name, age=35):
    print "Name: ", name
    print "Age ", age
    return

```
**怎么传递?**
参数可以不按顺序传递.
```python
print_info("dan")               # 只传name
print_info(name="dan")          # 只传name
print_info("dan", 29)           # 传name和age
print_info("dan", age=29)       # 传name和age
print_info(name="dan", age=29)  # 传name和age
print_info(age=29, name="dan")  # 传name和age

```

**3, 不定长参数**

**作用是什么?**
用于存放所有未命名的变量参数.
不定长参数允许你传入0个或任意个参数, 这些不定长参数在函数调用时自动组装为一个`tuple`.

**怎么定义?**
参数名前加`*`即可.
```python
def calc(*numbers):
    _sum = 0
    for n in numbers:
        _sum = _sum + n
    return _sum

```

**怎么传递?**
```python
print calc(1)
print calc(1, 2)

# 如果已有一个`list`或`tuple`, 想传给不定长参数, 只要在`list`或`tuple`变量前加`*`即可.
# 传 list
nums = [1, 2]
print calc(*nums)
# 传 tuple
nums2 = (1, 2)
print calc(*nums2)

```

**4, 关键字参数**
```python
def person(name, age, **kwargs):
    print 'name:', name, 'age:', age, 'other:', kwargs


person('Michael', 30)
person('Bob', 35, city='Beijing')
person('Adam', 45, gender='M', job='Engineer')

kw = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, city=kw['city'], job=kw['job'])

person('Jack', 24, **kw)

```

**5, 组合参数**
必选参数、默认参数、不定长参数和关键字参数四种参数可以组合使用, 但参数的定义顺序必须是:
必选参数、默认参数、不定长参数和关键字参数
```python
def func(a, b, c=0, *args, **kwargs):
    print 'a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kwargs


func(1, 2)
func(1, 2, c=3)
func(1, 2, x=99)
func(1, 2, 3, 4)
func(1, 2, 3, x=99)
func(1, 2, 3, 'a', 'b')
func(1, 2, 3, 'a', 'b')
func(1, 2, 3, 'a', 'b', x=99)

args = (1, 2, 3, 4)
kw = {'x': 99}
func(*args, **kw)

```
对于任意函数，都可以通过类似`func(*args, **kw)`的形式调用它，无论它的参数是如何定义的.

### lambda

**什么是lambda?**
* lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。
* lambda函数拥有自己的命名空间，且不能访问自有参数列表之外或全局命名空间里的参数。

**怎么定义?**
```python
# 可写函数说明
sum = lambda arg1, arg2: arg1 + arg2;

# 调用sum函数
print "相加后的值为 : ", sum( 10, 20 )
print "相加后的值为 : ", sum( 20, 20 )
```

### 内置函数

#### tuple()

1. 将列表转换为元组
1. 针对字典, 会返回字典的key组成的tuple

#### list()

将元组转换为列表

#### dict()

用于创建一个字典
```python
>>>dict()                                           # 创建空字典
{}
>>> dict(a='a', b='b', t='t')                       # 传入关键字
{'a': 'a', 'b': 'b', 't': 't'}
>>> dict(zip(['one', 'two', 'three'], [1, 2, 3]))   # 映射函数方式来构造字典
{'three': 3, 'two': 2, 'one': 1}
>>> dict([('one', 1), ('two', 2), ('three', 3)])    # 可迭代对象方式来构造字典
{'three': 3, 'two': 2, 'one': 1}
```

#### zip()

将可迭代的对象(比如, list)作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的列表。

```python
>>>a = [1,2,3]
>>> b = [4,5,6]
>>> c = [4,5,6,7,8]
>>> zipped = zip(a,b)     # 打包为元组的列表
[(1, 4), (2, 5), (3, 6)]
>>> zip(a,c)              # 元素个数与最短的列表一致
[(1, 4), (2, 5), (3, 6)]
>>> zip(*zipped)          # 与 zip 相反，*zipped 可理解为解压，返回二维矩阵式
[(1, 2, 3), (4, 5, 6)]
```

## 函数式编程

### 装饰器

**装饰器是什么?**
理解装饰器, 首选要明确两点:
1. Python一切皆对象, 包括函数.
2. **什么是高阶函数: **高阶函数就是以函数作为参数的函数
本质上就是一个返回函数的高阶函数.

**装饰器的作用是什么?**
在代码运行期间动态增加功能.
比如, 我们想在函数调用时, 输出一条log, 但又不想对函数进行修改, 这是我们就可以使用装饰器.

**如何定义和使用装饰器?**
```python
import functools  # 引入functools.wraps, 后边会说明functools.wraps的作用


def enter_log(func):
    @functools.wraps(func)  # 后边会讲解这句的含义
    def wrapper(*arg, **kw):  # 注意, 这里的参数格式是固定的
        print "%s() entering..." % func.__name__
        return func(*arg, **kw)
    return wrapper


@enter_log
def birthday(name):
    return name + " 2019-01-25"

```
使用`@enter_log`修饰函数, 相当于先执行了`birthday = enter_log(birthday)`.
Python中的函数也是对象, 函数名是指向对象的变量.
所以在执行`birthday = enter_log(birthday)`之后, birthday指向了新的函数.
这时再调用`birthday`就是调用`enter_log`函数了.

`@functools.wraps(func)`的作用
`enter_log`函数会返回`wrapper`函数, 所以最终`birthday`会指向`wrapper`.
因此, 这时调`birthday.__name__`会返回字符串`wrapper`.
这样, 如果某些地方需要使用`birthday.__name__`就会有问题.
所以我们要使用`@functools.wraps(func)`把原始函数的`__name__`等属性复制到`wrapper()`函数中.

给装饰器传参数:
```python
import functools


def enter_log(comment):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*arg, **kw):
            print "[%s()] %s" % (func.__name__, comment)
            return func(*arg, **kw)
        return wrapper
    return decorator


@enter_log("entering...")
def birthday(name):
    return name + " 2019-01-25"

```
定义可以接收参数的装饰器, 相当于定义一个"装饰器的装饰器".
这时, 使用`@enter_log`修饰函数, 相当于先执行了`birthday = enter_log("entering...")(birthday)`
(*注意: `enter_log("entering...")`返回`decorator`函数对象*).

### 偏函数 (Partial function)

偏函数是`functools`模块提供的功能.
使用`functools.partial`函数生成(返回)一个函数, 并将某些参数固定.
```python
def func(arg1, arg2, arg3=3):
    print arg1, arg2, arg3


func(1, 2)

func2 = functools.partial(func, arg2=20)

func2(1)

```

## 模块

模块实际就是一个以`.py`结尾的python文件.

**怎么引入模块?**

1. 使用`import`引入模块
```python
import math
```
2. 使用`from...import`引入模块中指定的内容
例如，要导入模块 fib 的 fibonacci 函数，使用如下语句：
```python
from fib import fibonacci
```
也可以使用`from...import *`引入全部内容.

**模块别名**

```python
import cStringIO as cStrIO
```

**模块导入异常的处理**

```python
try:
    import json # python >= 2.6
except ImportError:
    import simplejson as json # python <= 2.5
```

### 包的概念

包就是包含`__init__.py`文件的文件夹, 该文件的内容可以为空。`__init__.py`用于标识当前文件夹是一个包。
引入包中的模块:
```python
# 假设有包名为: package_xxx
# 包中有文件: something.py
# 文件中有函数: hello
from package_xxx.something import hello
```

### python查找模块的顺序

1. 当前目录
1. 如果不在当前目录，Python则搜索在 shell 变量`PYTHONPATH`下的每个目录
1. 如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为`/usr/local/lib/python/`

### 查看模块内容

使用`dir`函数查看模块内容
```python
dir(math)
```

### 常用模块

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

### 类

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-


# 定义Employee类
class Employee:
    """所有员工的基类"""  # 类的帮助信息, 可以通过 ClassName.__doc__ 查看。
    """
    类变量(相当于C++中的静态成员), 可以在内部类或外部类使用 Employee.empCount 访问
    注意:
        在这里定义的变量是类变量, 而不是实例变量(相当于C++中的成员变量),
        Python的实例变量在声明构造函数时定义,
        并且可以使用对象或指定的函数任意添加实例变量
    """
    empCount = 0
    """
    私有类属性: ("私有"在Python中只是"君子协议")
        以"__"开头
    访问:
        虽然Python不允许对象访问私有数据, 但
        Python支持使用以下方式访问私有属性:
            object._className__attrName
            (对象名._类名__私有属性名)
    """
    __private_attrs = 0
    """
    protected类属性: ("protected"在Python中只是"君子协议")
        以"_"开头
    """
    _protected_attrs = 1

    """
    构造函数
    self
        代表类的实例, self 在定义类的方法时是必须的, 但在调用时不必传入相应的参数
        注意: 这个 self 并不是Python的关键字, 我们可以使用任意名称代替
    name, salary
        是类的实例变量
    """
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1

    """
    私有类方法:
        以"__"开头
    访问:
        虽然Python不允许对象访问私有方法, 但
        Python支持使用以下方式访问私有方法:
            object._className__methodName()
            (对象名._类名__私有方法名)
    """
    def __private_method(self):
        print "调用类的私有方法"

    """
    protected类方法:
        以"_"开头
    """
    def _protected_method(self):
        print "调用类的protected方法"

    "析构函数"
    def __del__(self):
        class_name = self.__class__.__name__
        print class_name, "销毁"

    def display_count(self):
        print "Total Employee %d" % Employee.empCount

    def display_employee(self):
        print "Name : ", self.name,  ", Salary: ", self.salary


"""
创建 Employee 类的第一个对象
注意:
    Python实例对象不使用 new, Python中也没有这个关键字
"""
emp1 = Employee("Zara", 2000)
"创建 Employee 类的第二个对象"
emp2 = Employee("Manni", 5000)

"访问属性"
emp1.display_employee()
emp2.display_employee()
print "Total Employee %d" % Employee.empCount

"对象访问私有属性和方法 (使用 print dir(emp1) 看看就明白了)"
print emp1._Employee__private_attrs
emp1._Employee__private_method()

"对象访问protected属性和方法"
print emp1._protected_attrs
emp1._protected_method()

"添加，删除，修改类的属性"
emp1.age = 7  # 添加一个 'age' 属性
emp1.age = 8  # 修改 'age' 属性
del emp1.age  # 删除 'age' 属性

"使用函数的方式来访问属性"
if hasattr(emp1, 'age'):     # 如果存在 'age' 属性返回 True。
    getattr(emp1, 'age')     # 返回 'age' 属性的值

setattr(emp1, 'age', 8)  # 添加属性 'age' 值为 8
delattr(emp1, 'age')     # 删除属性 'age'

```

#### Python内置类属性

* `__dict__`   : 类的属性（包含一个字典，由类的数据属性组成）
* `__doc__`    : 类的文档字符串
* `__name__`   : 类名
* `__module__` : 类定义所在的模块（类的全名是`__main__.className`，如果类位于一个导入模块mymod中，那么`className.__module__`等于 mymod）
* `__bases__`  : 类的所有父类构成元素(包含了一个由所有父类组成的元组)

#### 类的继承

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-


class Parent():
    parentAttr = 100

    def __init__(self, name):
        print "调用父类构造函数"
        self.name = name

    def parent_method(self):
        print '调用父类方法'

    def set_attr(self, attr):
        Parent.parentAttr = attr

    def get_attr(self):
        print "父类属性 :", Parent.parentAttr

    def my_method(self):
        print '调用父类方法'

    def get_name(self):
        print "name is " + self.name


# 继承Parent, Python支持多继承, 多个基类使用'逗号'分割
class Child(Parent, object):
    def __init__(self, name):
        """
        Python中子类构造函数调用父类构造函数方法:
        1. python2, python3
            1.1. super(Child, self).__init__(name)
                前提: Parent必须继承object (或, Child除继承Parent外, 还要继承object, 并且object必须在Parent之后)
            1.2. Parent.__init__(self, name)
                注意: 这里要传self
        2. python3 only
            说明: python3的类自动继承object, super中的参数可以省略
            super().__init__(name)

        :param name:
        """
        Parent.__init__(self, name)
        print "调用子类构造方法"

    def child_method(self):
        print '调用子类方法'

    "重写父类的myMethod方法"
    def my_method(self):
        print '调用子类方法'


c = Child("thomasl007")  # 实例化子类
c.child_method()         # 调用子类的方法
c.parent_method()        # 调用父类方法
c.set_attr(200)          # 再次调用父类的方法 - 设置属性值
c.get_attr()             # 再次调用父类的方法 - 获取属性值
c.my_method()            # 子类调用重写方法
c.get_name()

```

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

## 多线程

**1. 怎么创建线程?**
Python的标准库提供了两个线程相关的模块：
* `thread`: 低级模块
* `threading`: 高级模块, 对`thread`进行了封装. 大多数情况下, 我们只需要使用`threading`这个高级模块

```python
import threading


def loop():
    print 'thread %s ended.' % threading.current_thread().name


t = threading.Thread(target=loop, name="LoopThread")  # 创建线程
t.start()  # 启动线程
t.join()   # 阻塞调用线程, 放在这里就是阻塞主线程, 等待LoopThread线程执行完

print 'thread %s ended.' % threading.current_thread().name  # 打印当前线程名

```
也可以继承`threading.Thread`, 然后重写`__init__`方法和`run`方法.
```python
class MyThread(threading.Thread):
    def __init__(self, group=None, target=None, name=None, args=(), kwargs=None, verbose=None):
        threading.Thread.__init__(self)
        self.name = name
        self.args = args
        self.kwargs = kwargs
        self.verbose = verbose

    def run(self):
        print "do something"


t = MyThread(name="MyThread")
t.start()

```

**2. threading模块提供的方法**

|方法|说明|
|-|-|
|threading.current_thread()|返回当前线程对象|
|threading.enumerate()|返回当前活动的所有线程对象的列表|
|threading.active_count()|返回正在运行的线程数量<br/>与`len(threading.enumerate())`有相同的结果|

threading模块中包含`Thread`类, 提供以下方法:

|方法|说明|
|-|-|
|run()|线程要执行的操作<br/>*默认情况下直接调创建`Thread`时传入的`target`函数对象*<br/>*可以重写这个方法以实现自己的逻辑*|
|start()|启动线程|
|join([time])|阻塞调用线程(上例中, 调用线程是主线程), 等待此线程结束.<br/>*结束是指: 正常退出, 抛出未处理的异常或超时(如果传了[time]参数)*|
|is_alive()|判断线程是否处于活动状态|
|getName()<br/>对应属性**`name`**|返回线程名|
|setName()<br/>对应属性**`name`**|设置线程名|

**3. 线程锁(线程同步)**

```python
lock = threading.Lock()  # 创建一个线程锁
# 在需要同步的地方执行
lock.acquire()
# 执行完释放
lock.release()
```
当多个线程同时执行lock.acquire()时，只有一个线程能成功地获取锁，然后继续执行代码，其他线程只能等待直到获得锁为止。
获得锁的线程用完后一定要释放锁，我们用`try...finally`来确保锁一定会释放。
Lock对象最好是统一的, 避免造成死锁.

**4. CPU占用问题**

由于GIL(Global Interpreter Lock)的制约, 导致Python的多线程并不能充分利用多核CPU.
