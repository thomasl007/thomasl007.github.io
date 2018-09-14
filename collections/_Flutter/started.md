---
---
Scaffold是 Material library 中提供的一个widget, 它提供了默认的导航栏、标题和包含主屏幕widget树的body属性。widget树可以很复杂。
pubspec.yaml文件管理Flutter应用程序的assets(资源，如图片、package等)。

状态：

* Stateless widgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.
* Stateful widgets 持有的状态可能在widget生命周期中发生变化. 实现一个 stateful widget 至少需要两个类:
    * 一个 StatefulWidget类。
    * 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.
    
变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的。

在Flutter的响应式风格的框架中，调用setState() 会为State对象触发build()方法，从而导致对UI的更新
