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

### Flutter

状态：

* Stateless widgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.
* Stateful widgets 持有的状态可能在widget生命周期中发生变化. 实现一个 stateful widget 至少需要两个类:
    * 一个 StatefulWidget类。
    * 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.
    
变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的。

在Flutter的响应式风格的框架中，调用setState() 会为State对象触发build()方法，从而导致对UI的更新
