---
---

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
