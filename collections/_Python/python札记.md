---
---
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
1. Python 可以使用引号`'`、双引号`"`、三引号`'''`或`"""`来表示字符串, 三引号字符串可以由多行组成, 例如
```python
word = 'word'
sentence = "这是一个句子。"
paragraph = """这是一个段落。
包含了多个语句"""
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
1, Dictionary（字典）

#### 字符串

[字符串内建函数](http://www.runoob.com/python/python-strings.html)

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

## 模块

使用`import`导入模块
```python
import math
```
使用`dir`函数查看模块内容
```python
dir(math)
```

#### 常用模块

|模块名|概述|
|-|-|
|math|浮点数数学运算函数|
|cmath|复数数学运算函数|
