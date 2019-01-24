---
---

## 类

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

"添加，删除，修改类的属性"
emp1.age = 7  # 添加一个 'age' 属性
emp1.age = 8  # 修改 'age' 属性
del emp1.age  # 删除 'age' 属性

"使用函数的方式来访问属性"
hasattr(emp1, 'age')     # 如果存在 'age' 属性返回 True。
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

#### 如何定义静态方法

使用`@staticmethod`
```python
class Clazz(object):
    @staticmethod
    def f():
        print('hello!!!');
```

#### classmethod 和 staticmethod

classmethod 和 staticmethod 修饰的方法都可以直接使用类名进行调用,
staticmethod 修饰的方法不能访问类的属性,
classmethod 修饰的方法可以使用第一个参数`cls`访问类的属性

```python
class A(object):
    bar = 1
    def func1(self):  
        print ('foo') 
    @classmethod
    def func2(cls):
        print ('func2')
        print (cls.bar)
        cls().func1()   # 调用 foo 方法
 
A.func2()               # 不需要实例化
```
