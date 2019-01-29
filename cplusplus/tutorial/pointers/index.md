---
layout: cplusplus
---
# 指针

注: 本文翻译自[C++官方网站](http://www.cplusplus.com/doc/tutorial/pointers/).

>In earlier chapters, variables have been explained as locations in the computer's memory which can be accessed by their identifier (their name). This way, the program does not need to care about the physical address of the data in memory; it simply uses the identifier whenever it needs to refer to the variable.

在前面的章节中，我们把“变量”解释为计算机内存中的一个区域，我们可以用这个内存区域的标识符（变量名字）对其进行访问。这样，程序不需要关心数据在内存中的物理地址，只需要使用标识符，就可以随时引用该变量。

>For a C++ program, the memory of a computer is like a succession of memory cells, each one byte in size, and each with a unique address. These single-byte memory cells are ordered in a way that allows data representations larger than one byte to occupy memory cells that have consecutive addresses.

对于C++程序来说，计算机的内存就像一连串的内存单元，每个内存单元都有一个字节，并且每个单元都有一个唯一的地址。这些单字节内存单元的排列方式允许大于一个字节的数据占据一段连续的内存单元。

>This way, each cell can be easily located in the memory by means of its unique address. For example, the memory cell with the address `1776` always follows immediately after the cell with address `1775` and precedes the one with `1777`, and is exactly one thousand cells after `776` and exactly one thousand cells before `2776`.

这样，使用内存单元的唯一地址，我们可以很容易地在内存中定位每个内存单元。例如，地址为1776的内存单元一定在1775之后、1177之前，并且一定是776之后的第1000个单元、2776之前的第1000个单元

>When a variable is declared, the memory needed to store its value is assigned a specific location in memory (its memory address). Generally, C++ programs do not actively decide the exact memory addresses where its variables are stored. Fortunately, that task is left to the environment where the program is run - generally, an operating system that decides the particular memory locations on runtime. However, it may be useful for a program to be able to obtain the address of a variable during runtime in order to access data cells that are at a certain position relative to it.

声明一个变量时，会在内存中分配一块区域（变量的内存地址）用于变量的存储。通常，C++程序不自己决定变量存储的确切内存地址。这个任务留给了程序运行的环境——通常是操作系统，操作系统会在程序运行时决定变量存储的内存位置。 但是，对程序来说，可以在运行时获取变量的地址可能是很必要的，因为程序需要访问与其相关的特定位置的数据单元。

>### Address-of operator (&)

### 取地址符（`&`）

>The address of a variable can be obtained by preceding the name of a variable with an ampersand sign (`&`), known as *address-of operator*. For example: 

在变量名前加`&`符即可获得变量的地址，这个`&`称作“*取地址符*”。举个例子：
```
foo = &myvar;
```
>This would assign the address of variable `myvar` to `foo`; by preceding the name of the variable `myvar` with the *address-of operator* (`&`), we are no longer assigning the content of the variable itself to `foo`, but its address.

这条语句会把`myvar`的地址赋给`foo`。使用取地址符，我们不再是把变量的内容赋值给`foo`，而是把变量的地址赋给它。

>The actual address of a variable in memory cannot be known before runtime, but let's assume, in order to help clarify some concepts, that `myvar` is placed during runtime in the memory address `1776`.

在程序运行前，变量在内存中的地址是未知的。但为了解释一些概念，我们假设变量`myvar`存储在内存中的地址为`1776`。

>In this case, consider the following code fragment:

以此为前提，分析以下代码段：
```
myvar = 25;
foo = &myvar;
bar = myvar;
```
>The values contained in each variable after the execution of this are shown in the following diagram: 

执行以上代码后，各个变量中的值应该如下：
![](https://upload-images.jianshu.io/upload_images/2639497-25eea58a7d6a6200.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>First, we have assigned the value `25` to `myvar` (a variable whose address in memory we assumed to be `1776`).

第一步中，我们给`myvar`赋值`25`（假设`myvar`是一个地址为`1776`的变量）

>The second statement assigns `foo` the address of `myvar`, which we have assumed to be `1776`.

第二步中，将`myvar`的地址赋值给`foo`，我们已假设这个地址是`1776`

>Finally, the third statement, assigns the value contained in `myvar` to `bar`. This is a standard assignment operation, as already done many times in earlier chapters.

最后，把`myvar`的值赋给`bar`。这是一个标准的赋值操作，之前的章节中已经做过很多次了。

>The main difference between the second and third statements is the appearance of the *address-of operator* (`&`).

第二步和第三步的主要区别体现在*取地址符*（`&`）上。

>The variable that stores the address of another variable (like `foo` in the previous example) is what in C++ is called a *pointer*. Pointers are a very powerful feature of the language that has many uses in lower level programming. A bit later, we will see how to declare and use pointers.

存储其他变量地址的变量（比如上例中的`foo`）在C++中称为**_指针_**。指针是一个非常强大的语言特性，广泛应用于底层编程中。稍后我们会讲解如何声明和使用指针。

>### Dereference operator (*)
### 解引用操作符（`*`）

>As just seen, a variable which stores the address of another variable is called a *pointer*. Pointers are said to "point to" the variable whose address they store.

上边提到，存储其他变量地址的变量称为指针。指针可以说成是，**“指向”它们所存地址中的变量**。

An interesting property of pointers is that they can be used to access the variable they point to directly. This is done by preceding the pointer name with the *dereference operator* (`*`). The operator itself can be read as "value pointed to by".

指针的一个有趣的属性是，它们可以用于直接访问它们所指向的对象。只要在指针变量名前加*解引用操作符*（`*`）即可。这个操作符本身可以读作**“被...指向的值”**。

>Therefore, following with the values of the previous example, the following statement: 

所以，上例中的语句：
```
baz = *foo;
```
>This could be read as: "`baz` equal to value pointed to by `foo`", and the statement would actually assign the value `25` to `baz`, since `foo` is `1776`, and the value pointed to by `1776` (following the example above) would be `25`.

可以读作：`baz`等于被`foo`指向的值。这条语句将`25`赋值给`baz`，因为`foo`是`1776`（参考上边的例子），而被`1776`指向的值是`25`。
![](https://upload-images.jianshu.io/upload_images/2639497-ac5eca77272a6001.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>It is important to clearly differentiate that `foo` refers to the value `1776`, while `*foo` (with an asterisk `*` preceding the identifier) refers to the value stored at address `1776`, which in this case is `25`. Notice the difference of including or not including the *dereference operator* (I have added an explanatory comment of how each of these two expressions could be read): 

需要搞清楚两点，`foo`指的是`1776`，`*foo`指的是地址`1776`中存的值（这个例子中是`25`），明确这两点这很重要。注意**有***解引用操作符*和**没有***解引用操作符*的区别（下边会说明这两种表达方式应该怎么读）。
```
baz = foo;   // baz equal to foo (1776)
baz = *foo;  // baz equal to value pointed to by foo (25)
```
>The reference and dereference operators are thus complementary:

引用和解引用操作符是互补的：
>*   `&` is the *address-of operator*, and can be read simply as "address of"
>*   `*` is the *dereference operator*, and can be read as "value pointed to by"

* `&`是取地址符，可以简单的理解为：**...的地址**
* `*`是解引用操作符，可以读作：**被...指向的值**

>Thus, they have sort of opposite meanings: An address obtained with `&` can be dereferenced with `*`.

因此，他们有几分相反的意思：用`&`获取的地址，可以用`*`解引用。

>Earlier, we performed the following two assignment operations:

先前，我们执行了下边的两个赋值操作：
```
myvar = 25;
foo = &myvar;
```
>Right after these two statements, all of the following expressions would give true as result:

执行这两句之后，以下所有表达式都会返回`true`
```
myvar == 25
&myvar == 1776
foo == 1776
*foo == 25
```
>The first expression is quite clear, considering that the assignment operation performed on `myvar` was `myvar=25`. The second one uses the address-of operator (`&`), which returns the address of `myvar`, which we assumed it to have a value of `1776`. The third one is somewhat obvious, since the second expression was true and the assignment operation performed on `foo` was `foo=&myvar`. The fourth expression uses the *dereference operator* (`*`) that can be read as "value pointed to by", and the value pointed to by `foo` is indeed `25`.

第一句话很简单，因为我们对`myvar`执行了赋值操作`myvar=25`。
第二句话使用了取地址符（`&`），因此它会返回`myvar`的地址（我们之前已经假设它的地址是`1776`）。
第三句话也很简单，因为第二个表达式返回`true`，而且我们之前对`foo`执行了赋值操作`foo=&myvar`。
第四句话使用了*解引用操作符*（`*`），可以读作“被`foo`指向的值”，而被`foo`指向的值就是`25`。

>So, after all that, you may also infer that for as long as the address pointed to by `foo` remains unchanged, the following expression will also be true: 

所以，现在你可能已经推断出，只要`foo`指向的地址不变，以下表达式就也会返回`true`：
```
*foo == myvar
```

>### Declaring pointers

### 声明指针

>Due to the ability of a pointer to directly refer to the value that it points to, a pointer has different properties when it points to a `char` than when it points to an `int` or a `float`. Once dereferenced, the type needs to be known. And for that, the declaration of a pointer needs to include the data type the pointer is going to point to.

因为指针可以直接引用它指向的值，所以指向`char`的指针和指向`int`或`float`的指针（_译注：在解引用后_）会有不同的属性。因此在解引用时，需要知道所指数据的类型。为此，我们在声明指针时，需要指明指针将要指向的数据类型。

>The declaration of pointers follows this syntax:

声明指针的语法：
`type * name;` 

>where `type` is the data type pointed to by the pointer. This type is not the type of the pointer itself, but the type of the data the pointer points to. For example:

`type`是指针所指数据的类型。注意，这个类型不是指针本身的类型，而是指针所指向的数据的类型。举个例子：
```
int * number;
char * character;
double * decimals;
```
>These are three declarations of pointers. Each one is intended to point to a different data type, but, in fact, all of them are pointers and all of them are likely going to occupy the same amount of space in memory (the size in memory of a pointer depends on the platform where the program runs). Nevertheless, the data to which they point to do not occupy the same amount of space nor are of the same type: the first one points to an `int`, the second one to a `char`, and the last one to a `double`. Therefore, although these three example variables are all of them pointers, they actually have different types: `int*`, `char*`, and `double*` respectively, depending on the type they point to.

以上是三个指针的声明。 这三个指向会指向不同的数据类型，但实际上，它们都是指针，它们都可能占用相同数量的内存空间（指针在内存中的大小取决于程序运行的平台）。 尽管如此，他们指向的数据所占用的空间大小并不相同，类型也不相同：第一个指向`int`，第二个指向`char`，最后一个指向`double`。 因此，虽然这三个示例变量都是指针，但实际上它们有不同的类型：`int *`，`char *`和`double *`，具体取决于它们指向的类型。

>Note that the asterisk (`*`) used when declaring a pointer only means that it is a pointer (it is part of its type compound specifier), and should not be confused with the *dereference operator* seen a bit earlier, but which is also written with an asterisk (`*`). They are simply two different things represented with the same sign.

请注意，声明中使用（`*`），只是为了说明这个变量是一个指针（`*`实际上是类型标识符的组成部分），不要跟前面讲解的*解引用操作符*搞混了，它们都是用（`*`）表示。它们只是用了相同的符号，但表示的是两种不同的东西。

>Let's see an example on pointers:

我们来看一个例子：
```
// my first pointer
#include <iostream>
using namespace std;

int main ()
{
  int firstvalue, secondvalue;
  int * mypointer;

  mypointer = &firstvalue;
  *mypointer = 10;
  mypointer = &secondvalue;
  *mypointer = 20;
  cout << "firstvalue is " << firstvalue << '\n';
  cout << "secondvalue is " << secondvalue << '\n';
  return 0;
}
```
输出：
```
firstvalue is 10
secondvalue is 20
```

>Notice that even though neither `firstvalue` nor `secondvalue` are directly set any value in the program, both end up with a value set indirectly through the use of `mypointer`. This is how it happens:

请注意，虽然`firstvalue`和`secondvalue`都没有直接被赋值，但它们最终都通过`mypointer`间接进行了赋值。 原因是这样的：

>First, `mypointer` is assigned the address of firstvalue using the address-of operator (`&`). Then, the value pointed to by `mypointer` is assigned a value of `10`. Because, at this moment, `mypointer` is pointing to the memory location of `firstvalue`, this in fact modifies the value of `firstvalue`.

首先，使用取地址符（`＆`）让指针 `mypointer` 指向 `firstvalue` 的地址。 然后，`mypointer` 指向的值被赋值为`10`。 此时，因为 `mypointer` 指向 'firstvalue` 的内存区域，所以实际上这步赋值操作是修改了 `firstvalue` 的值。

>In order to demonstrate that a pointer may point to different variables during its lifetime in a program, the example repeats the process with `secondvalue` and that same pointer, `mypointer`.

然后，为了证明一个指针可能在程序的生命周期内指向不同的变量，我们用相同的指针 `mypointer` 和另一个变量`secondvalue` 重复执行了这个赋值过程。

>Here is an example a little bit more elaborated:

来看一个更详细的例子
```
// more pointers
#include <iostream>
using namespace std;

int main ()
{
  int firstvalue = 5, secondvalue = 15;
  int * p1, * p2;

  p1 = &firstvalue;  // p1 = address of firstvalue firstvalue的地址
  p2 = &secondvalue; // p2 = address of secondvalue secondvalue的地址
  *p1 = 10;          // value pointed to by p1 = 10 被p1指向的值 = 10
  *p2 = *p1;         // value pointed to by p2 = value pointed to by p1 被p2指向的值 = 被p1指向的值
  p1 = p2;           // p1 = p2 (value of pointer is copied 复制指针的值（所指向的地址）)
  *p1 = 20;          // value pointed to by p1 = 20 被p1指向的值 = 20

  cout << "firstvalue is " << firstvalue << '\n';
  cout << "secondvalue is " << secondvalue << '\n';
  return 0;
}
```
结果：
```
firstvalue is 10
secondvalue is 20</samp></pre>
```

>Each assignment operation includes a comment on how each line could be read: i.e., replacing ampersands (`&`) by "address of", and asterisks (`*`) by "value pointed to by".

每个赋值操作都包含一条关于如何理解该赋值语句的注释：即用“...的地址”替换＆符号（`＆`），用“被...指向的值”替代星号（`*`）。

>Notice that there are expressions with pointers `p1` and `p2`, both with and without the *dereference operator* (`*`). The meaning of an expression using the *dereference operator* (*) is very different from one that does not. When this operator precedes the pointer name, the expression refers to the value being pointed, while when a pointer name appears without this operator, it refers to the value of the pointer itself (i.e., the address of what the pointer is pointing to).

注意那些使用了指针`p1`和`p2`的表达式，它们既有带*解引用操作符*的用法也有不带*解引用操作符*的用法。 两种用法的表达式的含义有很大不同。 当该运算符位于指针名前时，表达式引用指针指向的值，而指针名前没有该运算符时，它引用的是指针本身的值（即指针指向的地址）。

>Another thing that may call your attention is the line: 

另外一个值的注意的地方是：
```
int * p1, * p2;
```

>This declares the two pointers used in the previous example. But notice that there is an asterisk (`*`) for each pointer, in order for both to have type `int*` (pointer to `int`). This is required due to the precedence rules. Note that if, instead, the code was:

这句话声明了前面例子中使用的两个指针。 但要注意，每个指针变量名都有一个星号（`*`），以便使两者都能声明为`int *`类型（指向“int”的指针）。 这是优先级规则导致的（_译注：没搞懂这个优先级_）。 请注意，如果代码是：
```
int * p1, p2;
```

>`p1` would indeed be of type `int*`, but `p2` would be of type `int`. Spaces do not matter at all for this purpose. But anyway, simply remembering to put one asterisk per pointer is enough for most pointer users interested in declaring multiple pointers per statement. Or even better: use a different statement for each variable.

`p1`确实是`int *`类型，但`p2`的类型是`int`。 中间的空格可以忽略。 如果想在一行中声明多个指针，只要记住在每个指针前加星号即可。 更好一点的做法是：为每个变量使用单独的声明语句。

>### Pointers and arrays

### 指针和数组

>The concept of arrays is related to that of pointers. In fact, arrays work very much like pointers to their first elements, and, actually, an array can always be implicitly converted to the pointer of the proper type. For example, consider these two declarations:

数组的概念与指针的概念有关。 实际上，数组的工作方式非常类似于指向其第一个元素的指针，而且，数组总是可以隐式转换为正确类型的指针。 例如，思考这两个声明：
```
int myarray [20];
int * mypointer;
```

>The following assignment operation would be valid: 

以下赋值操作是有效的：
```
mypointer = myarray;
```

>After that, `mypointer` and `myarray` would be equivalent and would have very similar properties. The main difference being that `mypointer` can be assigned a different address, whereas `myarray` can never be assigned anything, and will always represent the same block of 20 elements of type `int`. Therefore, the following assignment would not be valid:

这样，`mypointer`和`myarray`将是等价的，并且具有非常相似的属性。 主要区别是`mypointer`可以重新赋值指向其他地址，而`myarray`永远不能执行赋值操作，并且总是代表20个`int`类型的元素。 因此，下边的赋值是无效：
```
myarray = mypointer;
```

>Let's see an example that mixes arrays and pointers:

我们来看一个混合数组和指针的例子：
```
// more pointers
#include <iostream>
using namespace std;

int main ()
{
  int numbers[5];
  int * p;
  p = numbers;  *p = 10;
  p++;  *p = 20;
  p = &numbers[2];  *p = 30;
  p = numbers + 3;  *p = 40;
  p = numbers;  *(p+4) = 50;
  for (int n=0; n<5; n++)
    cout << numbers[n] << ", ";
  return 0;
}
```
输出：
```
10, 20, 30, 40, 50,
```

>Pointers and arrays support the same set of operations, with the same meaning for both. The main difference being that pointers can be assigned new addresses, while arrays cannot.

指针和数组支持同一组操作，两者的含义相同。 主要区别在于指针可以指向新地址，而数组不能。

>In the chapter about arrays, brackets (`[]`) were explained as specifying the index of an element of the array. Well, in fact these brackets are a dereferencing operator known as *offset operator*. They dereference the variable they follow just as `*` does, but they also add the number between brackets to the address being dereferenced. For example:

在关于数组的章节中，我们提到方括号（`[]`）的作用是指定数组元素的索引。实际上，这个括号是一个被称为***偏移操作符***的**解引用运算符**。 它像`*`一样对它所操作的变量进行解引用操作，不同的是它还会把括号内的数字添加到被解引用的地址上（_译注：用`[]`对数组进行解引用后，得到数组的首地址，再根据`[]`中的数字对地址进行偏移。但`[]`中的数字并不是代表偏移多少个内存单元，而是代表偏移“多少个元素”的内存单元，即`“偏移的内存单元数 = []中的数字 * 元素占用的内存大小”`。这个内容在本章的“指针的运算”小节中还会进行讲解。_）。例如：
```
a[5] = 0;       // a [offset of 5] = 0
*(a+5) = 0;     // pointed to by (a+5) = 0
```

>These two expressions are equivalent and valid, not only if `a` is a pointer, but also if `a` is an array. Remember that if an array, its name can be used just like a pointer to its first element.

这两个表达式是等价的，且都是有效的，无论`a`是指针还是数组。请记住，如果是数组，数组名可以当作指向第一个元素的指针一样使用。

>### Pointer initialization

### 指针的初始化

>Pointers can be initialized to point to specific locations at the very moment they are defined:

指针可以在定义时直接进行初始化，指向指定的地址：
```
int myvar;
int * myptr = &myvar;
```

>The resulting state of variables after this code is the same as after:

这段代码的执行跟以下代码的效果是相同的：
```
int myvar;
int * myptr;
myptr = &myvar;
```

>When pointers are initialized, what is initialized is the address they point to (i.e., `myptr`), never the value being pointed (i.e., `*myptr`). Therefore, the code above shall not be confused with: 

指针初始化时，初始化的是他们指向的地址（即`myptr`），而不是指向的值（即`* myptr`）。 因此，以上代码不要与以下内容混淆：
```
int myvar;
int * myptr;
*myptr = &myvar;
```

>Which anyway would not make much sense (and is not valid code).

这段代码是没有意义的（也是无效的）。

>The asterisk (`*`) in the pointer declaration (line 2) only indicates that it is a pointer, it is not the dereference operator (as in line 3). Both things just happen to use the same sign: `*`. As always, spaces are not relevant, and never change the meaning of an expression.

指针声明中的`*`（第二行）只是表示这个变量是一个指针，而不是解引用操作符（第三行）。只不过它们都是使用`*`符号。其中的空格跟往常一样是可以忽略的，不会影响表达式的含义。

>Pointers can be initialized either to the address of a variable (such as in the case above), or to the value of another pointer (or array):

指针既可以用变量的地址进行初始化（就像前边例子中那样），也可以用其他指针（或数组）的值进行初始化，例如：
```
int myvar;
int *foo = &myvar;
int *bar = foo;
```

>### Pointer arithmetics

### 指针的运算

>To conduct arithmetical operations on pointers is a little different than to conduct them on regular integer types. To begin with, only addition and subtraction operations are allowed; the others make no sense in the world of pointers. But both addition and subtraction have a slightly different behavior with pointers, according to the size of the data type to which they point.

对指针进行算术运算跟普通的整型略有不同。指针只允许加减法操作，其他算术运算对指针没有意义。根据指针指向的数据类型的大小不同，指针的加减法也会略有不同。

>When fundamental data types were introduced, we saw that types have different sizes. For example: `char` always has a size of 1 byte, `short` is generally larger than that, and `int` and `long` are even larger; the exact size of these being dependent on the system. For example, let's imagine that in a given system, `char` takes 1 byte, `short` takes 2 bytes, and `long` takes 4.

在介绍基础数据类型时，我们了解到不同的数据类型占用的内存大小不同。例如，`char`总是占用1个字节，`short`通常要大一些，`int`和`long`再大一些。这些类型的实际大小依赖于程序运行的系统。举个例子，假设在一个系统中，`char`占1个字节，`short`占2个字节，`long`占4个字节。

>Suppose now that we define three pointers in this compiler: 

现在我们在这个环境中定义三个指针：
```
char *mychar;
short *myshort;
long *mylong;
```

>and that we know that they point to the memory locations `1000`, `2000`, and `3000`, respectively. 

假设它们指向的地址分别是`1000`, `2000`, `3000`。

>Therefore, if we write:

那么，如果我们执行如下操作：
```
++mychar;
++myshort;
++mylong;
```

`mychar`, as one would expect, would contain the value 1001\. But not so obviously, `myshort` would contain the value 2002, and `mylong` would contain 3004, even though they have each been incremented only once. The reason is that, when adding one to a pointer, the pointer is made to point to the following element of the same type, and, therefore, the size in bytes of the type it points to is added to the pointer.

`mychar`指向的地址是真的加了1，变为了`1001`。但是`myshort`指向的地址变成了`2002`（加了2），`mylong`指向的地址变成了`3004`（加了4），虽然它们都是只做了一次增量操作（`++`）。原因是，对指针执行加1操作时，指针将指向相同类型的下一个元素，因此，指针所指向的地址将增加它所指向的类型所占的字节数。

![](https://upload-images.jianshu.io/upload_images/2639497-7a6ad5ebfeb6b444.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>This is applicable both when adding and subtracting any number to a pointer. It would happen exactly the same if we wrote: 

无论对指针增加或是减少任意数字，这个规则都是有效的。下边的写法也会实现与上例相同的效果：
```
mychar = mychar + 1;
myshort = myshort + 1;
mylong = mylong + 1;
```

>Regarding the increment (`++`) and decrement (`--`) operators, they both can be used as either prefix or suffix of an expression, with a slight difference in behavior: as a prefix, the increment happens before the expression is evaluated, and as a suffix, the increment happens after the expression is evaluated. This also applies to expressions incrementing and decrementing pointers, which can become part of more complicated expressions that also include dereference operators (`*`). Remembering operator precedence rules, we can recall that postfix operators, such as increment and decrement, have higher precedence than prefix operators, such as the dereference operator (`*`). Therefore, the following expression:

增量运算符和减量运算符既能用在表达式之前（前缀）也能用在表达式之后（后缀），但在行为上有所不同：前缀时，增量操作发生在表达式运算之前；后缀时，增量操作发生在表达式运算之后。这个规则用在使用了解引用操作符（`*`）的指针表达式上也是一样的。但要注意运算符优先规则，我们可以回想一下，后缀运算符（如增量和减量）具有比前缀运算符（如解引用运算符`*`）更高的优先级。因此，表达式：
```
*p++
```

>is equivalent to `*(p++)`. And what it does is to increase the value of `p` (so it now points to the next element), but because `++` is used as postfix, the whole expression is evaluated as the value pointed originally by the pointer (the address it pointed to before being incremented).

等价与`*(p++)`。所以，这个表达式是对`p`的值进行增量处理（`p`将指向下一个元素），但是，由于表达式中的`++`是用于后缀，所以表达式的结果将是`p`最初指向的值（即，`*`将作用于`p`执行`++`之前所指向的地址）。

>Essentially, these are the four possible combinations of the dereference operator with both the prefix and suffix versions of the increment operator (the same being applicable also to the decrement operator):

解引用操作符与增量操作符（或减量操作符）有四种不同的组合：
```
*p++   // same as *(p++): increment pointer, and dereference unincremented address
       // 等价于 *(p++) ：增量操作，解引用未增量前的地址
*++p   // same as *(++p): increment pointer, and dereference incremented address
       // 等价于 *(++p) ：增量操作，解引用增量后的地址
++*p   // same as ++(*p): dereference pointer, and increment the value it points to
       // 等价于 ++(*p) ：解引用，然后对指向的值进行增量操作
(*p)++ // dereference pointer, and post-increment the value it points to
       // 等价于 ++(*p) ：解引用，然后对指向的值进行后缀增量操作
```

>A typical -but not so simple- statement involving these operators is:

来看一个复杂一些的典型例子：
```
*p++ = *q++;
```

>Because `++` has a higher precedence than `*`, both `p` and `q` are incremented, but because both increment operators (`++`) are used as postfix and not prefix, the value assigned to `*p` is `*q` before both `p` and `q` are incremented. And then both are incremented. It would be roughly equivalent to:

因为`++`的优先级高于`*`，所以`p`和`q`都执行增量运算，但它们的增量运算都是后缀的，所以在执行`p`和`q`的增量操作之前，赋给`*p`的值是`*q`。然后指向增量操作。这个过程大致上等同于：
```
*p = *q;
++p;
++q;
```

>Like always, parentheses reduce confusion by adding legibility to expressions.

通常，括号可以增加表达式的可读性，减少混淆。

>### Pointers and const

### 指针和const

>Pointers can be used to access a variable by its address, and this access may include modifying the value pointed. But it is also possible to declare pointers that can access the pointed value to read it, but not to modify it. For this, it is enough with qualifying the type pointed to by the pointer as `const`. For example:

指针可以用于通过地址访问变量，这个“访问”可能包括修改它指向的值。但我们也可以声明一个只能读取不能修改它指向的值的指针。为此，将指针指向的类型限定为`const`即可。例如：
```
int x;
int y = 10;
const int * p = &y;
x = *p;          // ok: reading p 可以：读取p
*p = x;          // error: modifying p, which is const-qualified 错误：修改p，p被const修饰的
```

>Here `p` points to a variable, but points to it in a `const`-qualified manner, meaning that it can read the value pointed, but it cannot modify it. Note also, that the expression `&y` is of type `int*`, but this is assigned to a pointer of type `const int*`. This is allowed: a pointer to non-const can be implicitly converted to a pointer to const. But not the other way around! As a safety feature, pointers to `const` are not implicitly convertible to pointers to non-`const`.

这里'p'指向一个变量，但是用'const'限定的方式指向它，这意味着它可以读取指向的值，但不能修改它。 还要注意，表达式 `&y` 的类型是 `int *`，但是它被分配给类型为`const int *`的指针。 这是允许的：指向非`const`的指针可以隐式转换为指向`const`的指针。 但反过来不行！为了安全起见，指向`const`的指针不能隐式转换为指向非`const`的指针。

>One of the use cases of pointers to `const` elements is as function parameters: a function that takes a pointer to non-`const` as parameter can modify the value passed as argument, while a function that takes a pointer to `const` as parameter cannot.

指向`const`元素的指针的一个用法是可以作为函数参数：一个函数的参数如果是一个指向非`const`的指针，那么可以通过参数对指针指向的值进行修改，而使用指向`const`的参数则不能。
```
// pointers as arguments:
#include <iostream>
using namespace std;

void increment_all (int* start, int* stop)
{
  int * current = start;
  while (current != stop) {
    ++(*current);  // increment value pointed
    ++current;     // increment pointer
  }
}

void print_all (const int* start, const int* stop)
{
  const int * current = start;
  while (current != stop) {
    cout << *current << '\n';
    ++current;     // increment pointer
  }
}

int main ()
{
  int numbers[] = {10,20,30};
  increment_all (numbers,numbers+3);
  print_all (numbers,numbers+3);
  return 0;
}
```
结果：
```
11
21
31
```

>Note that `print_all` uses pointers that point to constant elements. These pointers point to constant content they cannot modify, but they are not constant themselves: i.e., the pointers can still be incremented or assigned different addresses, although they cannot modify the content they point to.

`print_all`使用了指向常量元素的指针作为参数。这些指针不能对它们指向的常量内容进行修改，但指针本身不是常量，也就是说，指针仍然可以进行增量或赋值操作（_译注：进行增量或赋值操作后指针将指向新的地址，而不是修改原来地址中的值_）。

>And this is where a second dimension to constness is added to pointers: Pointers can also be themselves const. And this is specified by appending const to the pointed type (after the asterisk):

`const`与指针还可以有另一种组合，这种组合可以将指针本身指定为`const`。声明方法是，在类型之后（`*`之后）追加`const`：
```
int x;
      int *       p1 = &x;  // non-const pointer to non-const int
                            // 非const指针指向非const int
const int *       p2 = &x;  // non-const pointer to const int
                            // 非const指针指向const int
      int * const p3 = &x;  // const pointer to non-const int
                            // const指针指向非const int
const int * const p4 = &x;  // const pointer to const int
                            // const指针指向const int
```

>The syntax with `const` and pointers is definitely tricky, and recognizing the cases that best suit each use tends to require some experience. In any case, it is important to get constness with pointers (and references) right sooner rather than later, but you should not worry too much about grasping everything if this is the first time you are exposed to the mix of `const` and pointers. More use cases will show up in coming chapters.

`const`和指针的语法绝对是棘手的，并且认识到最适合每种使用的情况往往需要一些经验。 无论如何，重要的是尽快得到指针（和引用）的常量，但如果这是你第一次接触到`const`和指针的混合，你不应该太在意掌握所有东西。 更多使用案例将在接下来的章节中介绍。

>To add a little bit more confusion to the syntax of `const` with pointers, the `const` qualifier can either precede or follow the pointed type, with the exact same meaning:

为了给指针“const”的语法添加一点混乱，“const”限定符可以先于或跟随指向类型，其含义完全相同：
```
const int * p2a = &x;  //      non-const pointer to const int
int const * p2b = &x;  // also non-const pointer to const int
```

>As with the spaces surrounding the asterisk, the order of const in this case is simply a matter of style. This chapter uses a prefix `const`, as for historical reasons this seems to be more extended, but both are exactly equivalent. The merits of each style are still intensely debated on the internet.

与星号周围的空格一样，在这种情况下const的顺序只是一个样式问题。 本章使用前缀“const”，由于历史原因，这似乎更加扩展，但两者完全相同。 互联网上各种风格的优点仍然激烈争论。

### 指针和字符串文字量

>As pointed earlier, *string literals* are arrays containing null-terminated character sequences. In earlier sections, string literals have been used to be directly inserted into `cout`, to initialize strings and to initialize arrays of characters.

[字符序列（Character sequences）](https://www.jianshu.com/writer#/notebooks/24883167/notes/27432478)章节中讲解过，*字符串文字*是包含以空字符结尾的字符序列的数组。 前面章节中，字符串文字已用于直接进行标准输出（插入到`cout`）、初始化字符串以及初始化字符数组。

>But they can also be accessed directly. String literals are arrays of the proper array type to contain all its characters plus the terminating null-character, with each of the elements being of type `const char` (as literals, they can never be modified). For example:

但他们也可以直接访问。字符串文字量是标准的数组，它包含它的所有字符加上终止的空字符，并且每个元素都是`const char`型（作为文字量，它们不能被修改（_译注：这个跟C++的内存管理有关，这种字符串文字量存储在常量区，初始化后不允许进行修改。_））。 例如：
```
const char * foo = "hello";
```

>This declares an array with the literal representation for `"hello"`, and then a pointer to its first element is assigned to `foo`. If we imagine that `"hello"` is stored at the memory locations that start at address 1702, we can represent the previous declaration as:

这条语句声明了一个用字符串文字量`"hello"`表示的数组，然后将指向其第一个元素的指针赋给`foo`。 如果我们假设`"hello"`存储在以地址`1702`开始的内存中，我们可以将这条声明表示为：

![](https://upload-images.jianshu.io/upload_images/2639497-748fddf86af9f0b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>Note that here `foo` is a pointer and contains the value 1702, and not `'h'`, nor `"hello"`, although 1702 indeed is the address of both of these.

注意看，`foo`是一个指针，它的值是`1702`，不是`'h'`也不是`"hello"`，虽然`1702`是`'h'`和`"hello"`的地址。

>The pointer `foo` points to a sequence of characters. And because pointers and arrays behave essentially in the same way in expressions, `foo` can be used to access the characters in the same way arrays of null-terminated character sequences are. For example:

指针`foo`指向一个字符序列。由于指针和数组在表达式中的行为基本相同，因此可以使用`foo`来访问字符串中的字符，访问方式与以空结尾的字符序列数组相同。 例如：
```
*(foo+4)
foo[4]
```

>Both expressions have a value of `'o'` (the fifth element of the array).

这个两个表达式都返回`'o'`（数组的第四个元素）

### 指向指针的指针

<!--
C++ allows the use of pointers that point to pointers, that these, in its turn, point to data (or even to other pointers). The syntax simply requires an asterisk (`*`) for each level of indirection in the declaration of the pointer:
-->
C++允许使用指向指针的指针，这些指针又指向数据（或者指向其他指针）。声明语法是每多一个间接层级，就多加一个`*`，如下：
```
char a;
char * b;
char ** c;
a = 'z';
b = &a;
c = &b;
```
<!--
This, assuming the randomly chosen memory locations for each variable of `7230`, `8092`, and `10502`, could be represented as:
-->
我们假设三个变量的内存地址分别是`7230`、`8092`和`10502`，则三个变量的关系如下：

![](https://upload-images.jianshu.io/upload_images/2639497-93cc36696877b32f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<!--
With the value of each variable represented inside its corresponding cell, and their respective addresses in memory represented by the value under them.
-->
单元格内的内容表示每个变量的值，下面的值表示它们在内存中的地址。
<!--
The new thing in this example is variable `c`, which is a pointer to a pointer, and can be used in three different levels of indirection, each one of them would correspond to a different value:
-->
这个例子中的变量`c`是我们之前没有看到过的，它是一个指向指针的指针，可以在三个不同的间接层级中使用，每个层级都对应一个不同的值：
<!--
* `c` is of type `char**` and a value of `8092`
* `*c` is of type `char*` and a value of `7230`
* `**c` is of type `char` and a value of `'z'`
-->
* `c`是`char**`型的，值是`8092`
* `*c`是`char*`型的，值是`7230`
* `**c`是`char`型的，值是`z`

### void指针

<!--
The `void` type of pointer is a special type of pointer. In C++, `void` represents the absence of type. Therefore, `void`pointers are pointers that point to a value that has no type (and thus also an undetermined length and undetermined dereferencing properties).
-->
`void`类型的指针是一种特殊的指针。在C++中，`void`代表没有类型。因此，`void`指针是指向一个没有类型的值的指针（而且也因此具有未确定的长度（_译注：占用的内存空间大小不确定_）和未确定的解引用属性（_译注：解引用后的数据类型不确定_））
<!--
This gives `void` pointers a great flexibility, by being able to point to any data type, from an integer value or a float to a string of characters. In exchange, they have a great limitation: the data pointed to by them cannot be directly dereferenced (which is logical, since we have no type to dereference to), and for that reason, any address in a `void`pointer needs to be transformed into some other pointer type that points to a concrete data type before being dereferenced.
-->
这使得`void`型指针具有很大的灵活性，它可以指向任意数据类型（比如整型、浮点型或字符串）。但它们也因此具有很大的局限性：它们指向的数据不能直接解引用（这是合乎逻辑的，因为我们没有解引用所需的类型），因此，`void`型指针指向的地址需要转换成指向具体数据类型的指针，然后才能解引用。
<!--
One of its possible uses may be to pass generic parameters to a function. For example: 
-->
`void`指针可能的用途之一可能是向参数传递通用函数。 例如：
```
// increaser
#include <iostream>
using namespace std;

void increase (void* data, int psize)
{
  if ( psize == sizeof(char) )
  {
    char* pchar;
    pchar=(char*)data;
    ++(*pchar);
  }
  else if (psize == sizeof(int) )
  {
    int* pint;
    pint=(int*)data;
    ++(*pint);
  }
}

int main ()
{
  char a = 'x';
  int b = 1602;
  increase (&a,sizeof(a));
  increase (&b,sizeof(b));
  cout << a << ", " << b << '\n';
  return 0;
}
```
结果：
```
 y, 1603
```
<!--
`sizeof` is an operator integrated in the C++ language that returns the size in bytes of its argument. For non-dynamic data types, this value is a constant. Therefore, for example, `sizeof(char)` is 1, because `char` has always a size of one byte. 
-->
`sizeof`是一个集成在C++语言中的运算符，它返回参数的字节大小。对于非动态数据类型，这个值是一个常量。比如`sizeof ( char )`的结果是1，因为`char`总是有1个字节的大小。

### 无效指针和空指针

>In principle, pointers are meant to point to valid addresses, such as the address of a variable or the address of an element in an array. But pointers can actually point to any address, including addresses that do not refer to any valid element. Typical examples of this are *uninitialized pointers* and pointers to nonexistent elements of an array:

原则上，指针是为了指向有效地址，例如变量的地址或数组中元素的地址。但是指针实际上可以指向任何地址，包括不涉及任何有效元素的地址。典型的例子是*未初始化的指针*和指向数组中不存在的元素的指针，例如：
```
int * p;               // uninitialized pointer (local variable) 为初始化的指针（局部变量）
                       // （_译注：强调是局部变量是因为全局变量会自动初始化为NULL_）

int myarray[10];
int * q = myarray+20;  // element out of bounds 超出数组有效范围的元素
```

>Neither `p` nor `q` point to addresses known to contain a value, but none of the above statements causes an error. In C++, pointers are allowed to take any address value, no matter whether there actually is something at that address or not. What can cause an error is to dereference such a pointer (i.e., actually accessing the value they point to). Accessing such a pointer causes undefined behavior, ranging from an error during runtime to accessing some random value.

'p'和'q'都指向包含未知值的地址，但上述语句都不会导致错误。在C ++中，指针可以接受任何地址值，不管该地址中是否真的有值。但对这样的指针解引用会导致错误（即实际访问它们指向的值）。访问这样的指针会造成*未定义的行为（undefined behavior）*错误（运行时错误或访问某个随机值）。

>But, sometimes, a pointer really needs to explicitly point to nowhere, and not just an invalid address. For such cases, there exists a special value that any pointer type can take: the *null pointer value*. This value can be expressed in C++ in two ways: either with an integer value of zero, or with the `nullptr` keyword:

但是，有时候，我们确实需要指针不指向任何地方，而不是一个无效的地址。 对于这种情况，我们可以使用一个任何指针类型都可以使用的特殊值：*空指针值*。 这个值在C++中有两种表达方式：整数值`0`或关键字`nullptr`，例如：
```
int * p = 0;
int * q = nullptr;
```

>Here, both `p` and `q` are *null pointers*, meaning that they explicitly point to nowhere, and they both actually compare equal: all *null pointers* compare equal to other *null pointers*. It is also quite usual to see the defined constant `NULL` be used in older code to refer to the *null pointer* value:

`p`和`q`都是*空指针*，这意味着它们不指向任何地方，并且它们实际上是相等的（所有*空指针*与其他*空指针*都是相等的）。在旧代码中使用已定义的常量`NULL`来引用*空指针*值也是很常见的，例如：
```
int * r = NULL;
```

>`NULL` is defined in several headers of the standard library, and is defined as an alias of some *null pointer* constant value (such as `0` or `nullptr`).

`NULL`定义在标准库的几个头文件中，并定义为*空指针*常数值（如`0`或`nullptr`）的别名。

>Do not confuse *null pointers* with `void` pointers! A *null pointer* is a value that any pointer can take to represent that it is pointing to "nowhere", while a `void` pointer is a type of pointer that can point to somewhere without a specific type. One refers to the value stored in the pointer, and the other to the type of data it points to.

注意，不要把*空指针*和`void`型指针搞混了！*空指针*是一个值，使用这个值可以明确地设置指针不指向任何地址。而`void`型指针是指针的一种类型，这种指针可以指向任何未指定类型的地址。一个是存储在指针中的值，另一个是指针指向数据的类型。

### 指向函数的指针

<!--
C++ allows operations with pointers to functions. The typical use of this is for passing a function as an argument to another function. Pointers to functions are declared with the same syntax as a regular function declaration, except that the name of the function is enclosed between parentheses () and an asterisk (`*`) is inserted before the name:
-->
C++允许使用指向函数的指针。典型的用法是将一个函数作为参数传递给另一个函数。函数指针的声明与常规函数声明的语法相同，只是函数的名称需要用圆括号`()`括起来，并且在函数名前插入了一个星号（`*`），例如：
```
// pointer to functions
#include <iostream>
using namespace std;

int addition (int a, int b)
{ return (a+b); }

int subtraction (int a, int b)
{ return (a-b); }

int operation (int x, int y, int (*functocall)(int,int))
{
  int g;
  g = (*functocall)(x,y);
  return (g);
}

int main ()
{
  int m,n;
  int (*minus)(int,int) = subtraction;

  m = operation (7, 5, addition);
  n = operation (20, m, minus);
  cout <<n;
  return 0;
}
```
结果：
```
8
```
<!--
In the example above, `minus` is a pointer to a function that has two parameters of type `int`. It is directly initialized to point to the function `subtraction`:
-->
在上面的例子中，`minus`是一个指向具有两个`int`型参数的函数的指针。它在声明时直接初始化为指向函数`subtraction`：
```
int (* minus)(int,int) = subtraction;
```
