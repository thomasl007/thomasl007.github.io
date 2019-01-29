---
layout: cplusplus
---
# 字符序列

注: 本文翻译自[C++官方网站](http://www.cplusplus.com/doc/tutorial/ntcs/).

>The `string` class has been briefly introduced in an earlier chapter. It is a very powerful class to handle and manipulate strings of characters. However, because strings are, in fact, sequences of characters, we can represent them also as plain arrays of elements of a character type.

在前面的章节中简要介绍了`string`类。 `string`是一个非常强大的类，用来处理和操纵字符串。 但是，因为字符串实际上是字符序列，所以我们可以将它们表示为包含字符类型元素的普通数组（字符数组）。

>For example, the following array:

例如，以下数组
```
char foo [20];
```
>is an array that can store up to 20 elements of type `char`. It can be represented as:

是一个最多可以存储20个`char`型元素的数组。 它可以表示为：
![](https://upload-images.jianshu.io/upload_images/2639497-9c88683e71c16c86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>Therefore, this array has a capacity to store sequences of up to 20 characters. But this capacity does not need to be fully exhausted: the array can also accommodate shorter sequences. For example, at some point in a program, either the sequence `"Hello"` or the sequence `"Merry Christmas"` can be stored in `foo`, since both would fit in a sequence with a capacity for 20 characters.

因此，这个数组可以存储最多20个字符的序列。 但是这个容量不需要完全耗尽，也就是说这个数组还可以容纳更短的序列。 例如，在某个程序的某个位置，序列“Hello”或序列“Merry Christmas”都可以存储在“foo”中，因为两者都可以放入一个容量为20个字符的序列。

>By convention, the end of strings represented in character sequences is signaled by a special character: the *null character*, whose literal value can be written as `'\0'` (backslash, zero).

按照惯例，字符序列形式的字符串以_空字符_作为字符串的结尾，这个空字符的字面值可以写为`\0`(反斜杠，零)

>In this case, the array of 20 elements of type `char` called `foo` can be represented storing the character sequences `"Hello"` and `"Merry Christmas"` as:

这种情况下，在数组`foo`中存储字符串“Hello”和“Merry Christmas”可以分别表示为以下形式：
![](https://upload-images.jianshu.io/upload_images/2639497-0a62091a1cb7e65f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>Notice how after the content of the string itself, a null character (`'\0'`) has been added in order to indicate the end of the sequence. The panels in gray color represent `char` elements with undetermined values.

注意，为了标记序列的结尾，在字符串本身内容之后添加了空字符（`'\ 0'`）。后边灰色区域中`char`的值是不确定的。

>### Initialization of null-terminated character sequences

### 以null结尾的字符序列的初始化

>Because arrays of characters are ordinary arrays, they follow the same rules as these. For example, to initialize an array of characters with some predetermined sequence of characters, we can do it just like any other array: 

因为字符数组就是个一般的数组，所以它们也遵循数组的规则。例如，用已知的字符序列初始化字符数组：
```
char myword[] = { 'H', 'e', 'l', 'l', 'o', '\0' };
```
>The above declares an array of 6 elements of type `char` initialized with the characters that form the word `"Hello"` plus a *null character* `'\0'` at the end.

上例声明了一个包含6个`char`型元素的字符数组，并用构成“Hello”的5个字母和一个结束符`'\0'`进行初始化。

>But arrays of character elements have another way to be initialized: using *string literals* directly.

另外，字符数组可以用另一种方式进行初始化：直接使用_字符串字面值_。

>In the expressions used in some examples in previous chapters, string literals have already shown up several times. These are specified by enclosing the text between double quotes (`"`). For example:

在前面章节的一些例子中使用的表达式里，字符串常量已经出现了好几次。_字符串字面值_的定义方法是用双引号（`"`）包含文本内容。例如：
```
"the result is: "
```
>This is a *string literal*, probably used in some earlier example.

这是一个_字符串字面值_，可能在之前的例子中已经使用过了。

>Sequences of characters enclosed in double-quotes (`"`) are *literal constants*. And their type is, in fact, a null-terminated array of characters. This means that string literals always have a null character (`'\0'`) automatically appended at the end.

用双引号（`"`）括起来的字符序列是_字面常量_。他们的类型实际上是以空字符结尾的字符数组。也就是说，_字符串字面值_总是会自动在最后追加一个空字符（`'\0'`）。

>Therefore, the array of char elements called `myword` can be initialized with a null-terminated sequence of characters by either one of these two statements:

因此，字符数组`myword`可以用以下两种方式初始化为一个以空结尾的字符序列：
```
char myword[] = { 'H', 'e', 'l', 'l', 'o', '\0' };
char myword[] = "Hello";
```
>In both cases, the array of characters `myword` is declared with a size of 6 elements of type `char`: the 5 characters that compose the word `"Hello"`, plus a final null character (`'\0'`), which specifies the end of the sequence and that, in the second case, when using double quotes (`"`) it is appended automatically.

 这两种方式声明的`myword`都包含6个字符元素：5个构成`Hello`的字符和最后的代表字符序列结尾的空字符（`'\0'`），只不过第二种方式会自动添加`'\0'`。

>Please notice that here we are talking about initializing an array of characters at the moment it is being declared, and not about assigning values to them later (once they have already been declared). In fact, because string literals are regular arrays, they have the same restrictions as these, and cannot be assigned values.

请注意，我们现在讨论的，是在数组声明时进行初始化，而不是在声明之后进行赋值。实际上，因为字符串文字量是常规数组，因此他们跟数组有相同的限制（不能复制、作为参数时会退化为指针等），并且**不能赋值**。

>Expressions (once myword has already been declared as above), such as:

例如下边的表达式（`myword`已经在上边声明了）：
```
myword = "Bye";
myword[] = "Bye";
```
>would **not** be valid, like neither would be:

这两种方式都是无效的，下边这种也一样：

```
myword = { 'B', 'y', 'e', '\0' };
```
>This is because arrays cannot be assigned values. Note, though, that each of its elements can be assigned a value individually. For example, this would be correct:

这是因为数组不能赋值。但是，数组中的每个元素都可以单独赋值。例如：
```
myword[0] = 'B';
myword[1] = 'y';
myword[2] = 'e';
myword[3] = '\0';
```

>### Strings and null-terminated character sequences

### `Strings` 和 以空结尾的字符序列

>Plain arrays with null-terminated sequences of characters are the typical types used in the C language to represent strings (that is why they are also known as *C-strings*). In C++, even though the standard library defines a specific type for strings (class `[string](http://www.cplusplus.com/string)`), still, plain arrays with null-terminated sequences of characters (C-strings) are a natural way of representing strings in the language; in fact, string literals still always produce null-terminated character sequences, and not `string` objects.

存放以空结尾字符序列的数组是C语言中用于表示字符串的典型类型（这就是为什么这种形式的字符串也称作_C字符串_）。在C++中，虽然标准库中定义了一个`strings`类型 (class [string](http://www.cplusplus.com/string))，但C++仍然支持C字符串，实际上，字符串文字常量让然总是生成以空结尾的字符序列，而不是 `string` 对象。

>In the standard library, both representations for strings (C-strings and library strings) coexist, and most functions requiring strings are overloaded to support both.

在标准库中，两种字符串（C字符串和`strings`）都存在，并且大部分需要用到字符串的函数都做了重载以支持这两种字符串。

>For example, `cin` and `cout` support null-terminated sequences directly, allowing them to be directly extracted from `cin`or inserted into `cout`, just like strings. For example:

举个例子，`cin` 和 `cout` 都直接支持以空结尾的字符序列，允许直接从 `cin` 中提取 或 插入到 `cout`，就像 `strings` 一样。例如：
```
// strings and NTCS:
#include <iostream>
#include <string>
using namespace std;

int main ()
{
  char question1[] = "What is your name? ";
  string question2 = "Where do you live? ";
  char answer1 [80];
  string answer2;
  cout << question1;
  cin >> answer1;
  cout << question2;
  cin >> answer2;
  cout << "Hello, " << answer1;
  cout << " from " << answer2 << "!\n";
  return 0;
}
```
输出：
```
What is your name? Homer
Where do you live? Greece
Hello, Homer from Greece!
```

>In this example, both arrays of characters using null-terminated sequences and strings are used. They are quite interchangeable in their use together with `cin` and `cout`, but there is a notable difference in their declarations: arrays have a fixed size that needs to be specified either implicit or explicitly when declared; `question1` has a size of exactly 20 characters (including the terminating null-characters) and `answer1` has a size of 80 characters; while strings are simply strings, no size is specified. This is due to the fact that strings have a dynamic size determined during runtime, while the size of arrays is determined on compilation, before the program runs.

这个例子中，两种字符串都用到了。在与cin和cout一起使用时，两种字符串完全可以互换，但是两者的声明存在明显的差异：数组有固定的大小，需要在声明时隐式或显式指定；`question1`恰好为20个字符（包括结尾的空字符），'answer1'的大小为80个字符；而`strings`只是简单的字符串，没有制定大小。这是因为，`strings`会在运行时动态确定字符串大小，而数组的大小必须在编译阶段（也就是程序运行前）确定。

>In any case, null-terminated character sequences and strings are easily transformed from one another:

在任何情况下，以空字符结尾的字符序列和`strings`都可以很容易地相互转换:

>Null-terminated character sequences can be transformed into strings implicitly, and strings can be transformed into null-terminated character sequences by using either of `string`'s member functions `c_str` or `data`:

以空字符结尾的字符序列可以隐式转换为`strings`，`strings`也可以用`string`的成员函数 `c_str` 或 `data` 转换为以空字符结尾的字符序列：
```
char myntcs[] = "some text";
string mystring = myntcs;  // convert c-string to string
cout << mystring;          // printed as a library string
cout << mystring.c_str();  // printed as a c-string
```
>(note: both `c_str` and `data` members of `string` are equivalent)

(注意: `string` 的 `c_str` 和 `data` 是等价的)
