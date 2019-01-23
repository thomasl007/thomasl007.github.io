---
---

## 类

```python
class Employee:
   '所有员工的基类' # 类的帮助信息, 可以通过 ClassName.__doc__ 查看。
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
   
   def displayCount(self):
     print "Total Employee %d" % Employee.empCount
 
   def displayEmployee(self):
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
emp1.displayEmployee()
emp2.displayEmployee()
print "Total Employee %d" % Employee.empCount

"添加，删除，修改类的属性"
emp1.age = 7  # 添加一个 'age' 属性
emp1.age = 8  # 修改 'age' 属性
del emp1.age  # 删除 'age' 属性

"使用函数的方式来访问属性"
hasattr(emp1, 'age')    # 如果存在 'age' 属性返回 True。
getattr(emp1, 'age')    # 返回 'age' 属性的值
setattr(emp1, 'age', 8) # 添加属性 'age' 值为 8
delattr(emp1, 'age')    # 删除属性 'age'
```

#### Python内置类属性

* `__dict__`   : 类的属性（包含一个字典，由类的数据属性组成）
* `__doc__`    : 类的文档字符串
* `__name__`   : 类名
* `__module__` : 类定义所在的模块（类的全名是`__main__.className`，如果类位于一个导入模块mymod中，那么`className.__module__`等于 mymod）
* `__bases__`  : 类的所有父类构成元素(包含了一个由所有父类组成的元组)

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
