---
---
<!--
By default, regular arrays of *local scope* (for example, those declared within a function) are left uninitialized. This means that none of its elements are set to any particular value; their contents are undetermined at the point the array is declared.
-->
&emsp;&emsp;默认情况下，局部作用域中的普通数组（例如，声明在函数中）是未初始化的。这意味着数组中的所有元素都未被赋于一个特定的值，也就是说，在数组刚声明时，元素的内容是不确定的。
<!--
But the elements in an array can be explicitly initialized to specific values when it is declared, by enclosing those initial values in braces {}. For example:
-->
&emsp;&emsp;但在数组声明时，数组元素可以明确地初始化为一个特定的值。所有数组元素的初始值需要放在一个花括号中。例如：<br/>
`int foo [5] = { 16, 2, 77, 40, 12071 }; `
<!--
This statement declares an array that can be represented like this:
-->
&emsp;&emsp;这条语句声明了一个如下形式的数组：

![](https://images.gitee.com/uploads/images/2018/0816/141523_a2bf887d_1677932.png)

<!--
The number of values between braces `{}` shall not be greater than the number of elements in the array. For example, in the example above, `foo` was declared having 5 elements (as specified by the number enclosed in square brackets, `[]`), and the braces `{}` contained exactly 5 values, one for each element. If declared with less, the remaining elements are set to their default values (which for fundamental types, means they are filled with zeroes). For example:
-->
&emsp;&emsp;`{}`中数值的个数不能超过数组中元素的个数。例如，在上边的例子中，`foo`声明了数组中有5个元素（`[]`中的数字定义了数组中元素的个数），而`{}`中正好包含5个数值，对应数组中的每个元素。如果`{}`中少于5个数值，剩余的元素会初始化为默认值（对于基础数据类型，默认值为0）。例如：<br/>
`int bar [5] = { 10, 20, 30 }; `

<!--
Will create an array like this:
-->

&emsp;&emsp;这条语句会创建一个如下形式的数组：

![](https://images.gitee.com/uploads/images/2018/0816/141949_c4d58e8b_1677932.png)

<!--
The initializer can even have no values, just the braces:
-->
&emsp;&emsp;`{}`中甚至可以没有值，例如：<br/>
`int baz [5] = { }; `
<!--
This creates an array of five `int` values, each initialized with a value of zero:
-->
&emsp;&emsp;这条语句创建了一个包含5个`int`型数据的数组，每个数据都被初始化为0：

![](https://images.gitee.com/uploads/images/2018/0816/142304_1a91204b_1677932.png)

<!--
When an initialization of values is provided for an array, C++ allows the possibility of leaving the square brackets empty `[]`. In this case, the compiler will assume automatically a size for the array that matches the number of values included between the braces `{}`:
-->
&emsp;&emsp;如果数组定义时进行了初始化，C++允许在数组定义时使用空的`[]`。这种情况下，编译器会自动认为`{}`中的数据个数就是数组长度：<br/>
`int foo [] = { 16, 2, 77, 40, 12071 };`

<!--
After this declaration, array `foo` would be 5 `int` long, since we have provided 5 initialization values.
-->
&emsp;&emsp;进行如上声明之后，`foo`数组的长度将是5，因为我们提供了5个初始值。

<!--
Finally, the evolution of C++ has led to the adoption of *universal initialization* also for arrays. Therefore, there is no longer need for the equal sign between the declaration and the initializer. Both these statements are equivalent:
-->
&emsp;&emsp;随着C++的发展，现在，C++允许将 *通用初始化器* 也应用到数组中。因此，在数组声明和初始化器之间不再需要等号。以下两个表达式是等价的：
```
int foo[] = { 10, 20, 30 };
int foo[] { 10, 20, 30 };
```
<!--
Static arrays, and those declared directly in a namespace (outside any function), are always initialized. If no explicit initializer is specified, all the elements are default-initialized (with zeroes, for fundamental types).
-->
&emsp;&emsp;静态数组和那些直接定义在命名空间中（在所有函数之外）的数组会自动初始化。如果没有进行显式初始化，数组中所有元素会被初始化为默认值（对于基础数据类型，默认值为0）。