---
---
* [初始化数组（Initializing arrays）](https://www.jianshu.com/writer#/notebooks/24883167/notes/30753024)
* [访问数组（Accessing the values of an array）](https://www.jianshu.com/writer#/notebooks/24883167/notes/30752965)
* [多为数组（Multidimensional arrays）](https://www.jianshu.com/writer#/notebooks/24883167/notes/30752891)
* [数组作为参数（Arrays as parameters）](https://www.jianshu.com/writer#/notebooks/24883167/notes/30468931)
* [标准模版库中的数组（Library arrays）](https://www.jianshu.com/writer#/notebooks/24883167/notes/30468416)
<!--
An array is a series of elements of the same type placed in contiguous memory locations that can be individually referenced by adding an index to a unique identifier.
-->
&emsp;&emsp;数组是一系列具有相同类型的元素的集合，这些元素存储在连续的内存区域中，每个内存区域都可以用*数组唯一标识符*加*索引*的形式访问。
<!--
That means that, for example, five values of type `int` can be declared as an array without having to declare 5 different variables (each with its own identifier). Instead, using an array, the five `int` values are stored in contiguous memory locations, and all five can be accessed using the same identifier, with the proper index.
-->
&emsp;&emsp;因此，如果需要声明5个`int`型的值，我们可以声明一个数组，而不需要单独声明5个变量。使用数组的好处是，这5个元素存储于连续的地址空间，并且可以用相同的标识符加对应的索引进行访问。
<!--
For example, an array containing 5 integer values of type `int` called `foo` could be represented as:
-->
&emsp;&emsp;例如，声明一个包含5个`int`型数据的数组`foo`：

![包含5个`int`型数据的数组`foo`](https://images.gitee.com/uploads/images/2018/0816/140729_f31436c6_1677932.png "2639497-3ecd6dbd578fc387.png")

<!--
where each blank panel represents an element of the array. In this case, these are values of type `int`. These elements are numbered from 0 to 4, being 0 the first and 4 the last; In C++, the first element in an array is always numbered with a zero (not a one), no matter its length.
-->
&emsp;&emsp;上图中每个白块代表数组中的一个元素。在这个例子中，数组中的元素是`int`类型的。这些元素用0到4进行编号，0是第一个，4是最后一个。在C++中，数组的第一个元素总是编号为0而不是1，不论数组中有多少个元素。
<!--
Like a regular variable, an array must be declared before it is used. A typical declaration for an array in C++ is:
-->
&emsp;&emsp;像普通变量一样，数组在使用之前也必须先声明。C++中，数组声明的标准格式为：`type name [elements];` 
<!--
>where `type` is a valid type (such as `int`, `float`...), `name` is a valid identifier and the `elements` field (which is always enclosed in square brackets `[]`), specifies the length of the array in terms of the number of elements.
-->
&emsp;&emsp;`type`代表有效的数据类型(例如，`int`, `float`...)；`name`代表一个有效的数组名标识符；`elements`必须包含在`[]`中，按照所需元素的个数指定数组长度。
<!--
Therefore, the `foo` array, with five elements of type `int`, can be declared as:
-->
&emsp;&emsp;因此，包含5个`int`型元素的`foo`数组，可以声明为：`int foo [5];`
<!--
NOTE: The `elements` field within square brackets `[]`, representing the number of elements in the array, must be a *constant expression*, since arrays are blocks of static memory whose size must be determined at compile time, before the program runs.
-->
&emsp;&emsp;注意：`[]`中的`elements`代表了数组中元素的个数，他必须是一个 **_常量表达式_** ，因为数组是静态内存块，静态内存块的大小必须在编译阶段（也就是程序运行之前）确定。

### 笔记
C数组不支持整体操作