---
---

* content
{:toc}

### Dart 特性

#### 声明变量

可以使用 `var` 和 `dynamic`, 也可以指定变量类型。

#### 声明常量

`final` 和 `const`。
`final` 声明的变量必须初始化，一旦赋值不能修改。但声明的 `list` 或 `map` 里边元素的值是可变的。
`const` 可用于代替 `new`，但声明的变量必须是在编译时可计算的。`const` 声明的 `list` 或 `map` 里边的元素也是不可修改的。

Scaffold是 Material library 中提供的一个widget, 它提供了默认的导航栏、标题和包含主屏幕widget树的body属性。widget树可以很复杂。
pubspec.yaml文件管理Flutter应用程序的assets(资源，如图片、package等)。

#### 运算符

* `〜/` 除以，返回整数结果。
* `??=` 只在变量为 `null` 时才赋值。
* `is` 是什么类型
* `is!` 不是什么类型
* `expr1 ?? expr2` 如果 expr1 为非null，则返回其值; 否则，计算并返回 expr2 的值

#### 循环

`break` 和 `continue` 后边可以加标签，用于指定退出循环后跳转的位置。第一标签用 `标签名:` 的形式。

#### bool 判断

Dart 只把文字 `true` 视为 true，所以 `if ('abc')` 会被视为 false。所以，如果不是 `bool` 型，最好不要这么写，在 check 模式会有警告。

#### 数组（列表）

Dart 使用列表表示数组。
* 定义定长数组 `var lst = new List(5)` ，采用逐个赋值的方式进行初始化。
* 定义变长数组 `var lst = new List()` 或 `var lst = [val0, val1, val2]`。

#### Map

* Dart 的 map 可以在声明时直接初始化 `var details = {'Username':'tom','Password':'pass@123'};`。
也可以先声明再添加内容 `var identifier = new Map(); identifier['Username'] = 'tom';`。
两种方式的长度都是可变的。
* Dart 也有 `HashMap` 和 `LinkedHashMap` 之类的。
* 遍历时可使用迭代器。
* 默认是异构的（可以保存多种数据类型），也可以指定存储的数据类型，跟 java 一样。

#### 反射（暂时跳过）

#### 可选参数和默认值

1. `void function_name(param1, [optional_param_1, optional_param_2]) { }`
1. `void function_name(a, {optional_param1, optional_param2}) { }`
调用方法：`function_name(optional_param1: value, optional_param2: value);`
1. `void function_name(param1, {param2: default_value})`

#### Lambda

`[return_type] function_name(parameters) => expression;`

#### 构造函数重载（命名构造函数）

定义多个构造函数的方法：
```         
class Car {                   
    Car() {                           
       print("Non-parameterized constructor invoked");
    }                                   
    Car.namedConst(String engine) {
       print("The engine is : ${engine}");    
    }                               
}
void main() {
    Car c2 = new Car();
    Car c1 = new Car.namedConst('E1001');
}  
```

#### 属性的 Getter 和 Setter 方法的定义

Dart 默认提供 Getter 和 Setter 方法，如果要自定义的话可以按照以下形式：
```
Return_type  get identifier
{
}

set identifier
{
}
```

#### 继承和接口

Dart 的继承类似Java，但可以使用 Mixins 实现类似多继承的功能。
**Dart 没有声明接口的语法，类本身就可以当做接口使用。**实现类必须重写接口中的全部方法。
`class identifier implements interface_name`
Dart2 有抽象类的概念，可以使用抽象类作为接口。

#### 【语法糖】级联操作符（`..`）

```
class Student {
   void test_method() {
      print("这是一个测试方法");
   }

   void test_method1() {
      print("这是一个测试方法1");
   }
}  
void main() {
   new Student()
   ..test_method()
   ..test_method1();
}
```

#### 第三方库管理

Dart 使用**pub**管理第三方库，跟 maven 属于一类东西。
https://pub.dartlang.org/
包元数据是定义在 pubsec.yaml 文件中，每个 Dart 应用程序都有一个 pubsec.yaml 文件。
常用 pub 命令：
* `pub get`: 获取应用程序所依赖的所有包。
* `pub upgrade`: 将所有依赖项升级到较新版本。
* `pub build`: 这用于构建您的Web应用程序，它将创建一个构建文件夹，其中包含所有相关脚本。
* `pub help`: 这将为您提供所有不同pub命令的帮助。

#### 引入包的方法

* Dart 内置的库使用：`import 'dart:scheme'`
* 外部库使用：`import 'package:scheme'`,
例如，`import 'package:xml/xml.dart'`

如果只想导入一部分内容：
```
import 'package: lib1/lib1.dart' show foo, bar;  
// 只导入foo 和 bar.
```
如果想排除一部分内容：
```
import 'package: mylib/mylib.dart' hide foo;  
// 导入除了foo的所有
```
跟引入的库指定名称：
`import 'package:xml/xml.dart' as xml;`

#### 自定义库

`library library_name`
引入：`import 'dir/library_name'`

#### 访问权限

以`_`开头的为私有。

#### 异常处理

Dart 在异常处理这块比其他语言多了一个 `on` 关键字。

#### typedef定义函数指针

Dart 可使用`typedef`定义函数指针，跟c里的typedef类似。

### Flutter

状态：

* Stateless widgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.
* Stateful widgets 持有的状态可能在widget生命周期中发生变化. 实现一个 stateful widget 至少需要两个类:
    * 一个 StatefulWidget类。
    * 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.
    
变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的。

在Flutter的响应式风格的框架中，调用setState() 会为State对象触发build()方法，从而导致对UI的更新
