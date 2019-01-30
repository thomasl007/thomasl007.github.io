---
layout: cplusplus
---
类模板（class template）

头文件**```#include <string>```**

# std::basic_string

```
template < class charT,
           class traits = char_traits<charT>, // basic_string::traits_type
           class Alloc = allocator<charT>     // basic_string::allocator_type
           > class basic_string;
```

泛型字符串类（Generic string class）

The **```basic_string```** is the generalization of class [string](http://www.cplusplus.com/string) for any character type (see [string](http://www.cplusplus.com/string) for a description).

### 模板参数（Template parameters）

* charT
Character type.
字符类型
The string is formed by a sequence of characters of this type.
字符串由这种类型的字符序列组成。
This shall be a non-array [POD type](http://www.cplusplus.com/is_pod).
应该是一个**非**数组类型 [POD type](http://www.cplusplus.com/is_pod)。

* traits
[Character traits](http://www.cplusplus.com/char_traits) class that defines essential properties of the characters used by [basic_string](http://www.cplusplus.com/basic_string) objects (see [char_traits](http://www.cplusplus.com/char_traits)).
字符特征类，用于定义```basic_string```对象使用的字符的基本属性（参见[char_traits](http://www.cplusplus.com/char_traits)）
```traits::char_type``` shall be the same as ```charT```.
```traits :: char_type```应与```charT```相同。
Aliased as member type ```basic_string::traits_type```.
成员类型```basic_string::traits_type```的别名。

* Alloc
Type of the allocator object used to define the storage allocation model. By default, the [allocator](http://www.cplusplus.com/allocator) class template is used, which defines the simplest memory allocation model and is value-independent.
分配器对象的类型，用于定义存储分配模型。 默认情况下，使用分配器类模板，它定义了最简单的内存分配模型，并且与值无关。
Aliased as member type ```basic_string::allocator_type```.
成员类型```basic_string :: allocator_type```的别名。

Note: Because the first template parameter is not aliased as any member type, ```charT``` is used throughout this reference to refer to this type.
注意：因为第一个模板参数不是任何成员类型的别名，所以在此引用中使用charT来引用此类型。

### Template instantiations

* [**string**](http://www.cplusplus.com/reference/string/string/)
String class (class )
* [**wstring**](http://www.cplusplus.com/reference/string/wstring/)
Wide string (class )
* [**u16string**](http://www.cplusplus.com/reference/string/u16string/)
String of 16-bit characters (class )
* [**u32string**](http://www.cplusplus.com/reference/string/u32string/)
String of 32-bit characters (class )

### Member types

[Help about versions](http://www.cplusplus.com/site/versions/)

| member type | definition | notes |
|-|-|-|
| traits_type | The second template parameter (traits) | defaults to: [char_traits](http://www.cplusplus.com/char_traits)<charT> |
| allocator_type | The third template parameter (Alloc) | defaults to: [allocator](http://www.cplusplus.com/allocator)<charT> |
| value_type | traits_type::char_type | shall be the same as charT |
| reference | allocator_type::reference<sup>**```C++98```**</sup><br/>value_type&<sup>**```C++11```**</sup> | for the default [allocator](http://www.cplusplus.com/allocator): charT&<sup>**```C++98```**</sup> |
| const_reference | allocator_type::const_reference<sup>**```C++98```**</sup><br/>const value_type&<sup>**```C++11```**</sup> | for the default [allocator](http://www.cplusplus.com/allocator): const charT&<sup>**```C++98```**</sup> |
| pointer | allocator_type::pointer<sup>**```C++98```**</sup><br/>[allocator_traits](http://www.cplusplus.com/allocator_traits)<allocator_type>::pointer<sup>**```C++11```**</sup> | for the default [allocator](http://www.cplusplus.com/allocator): charT* |
| const_pointer | allocator_type::const_pointer<sup>**```C++98```**</sup><br/>[allocator_traits](http://www.cplusplus.com/allocator_traits)<allocator_type>::const_pointer<sup>**```C++11```**</sup> | for the default [allocator](http://www.cplusplus.com/allocator): const charT* |
| iterator | a [random access iterator](http://www.cplusplus.com/RandomAccessIterator) to charT | convertible to const_iterator |
| const_iterator | a [random access iterator](http://www.cplusplus.com/RandomAccessIterator) to const charT |  |
| reverse_iterator | [reverse_iterator](http://www.cplusplus.com/reverse_iterator)<iterator> |  |
| const_reverse_iterator | [reverse_iterator](http://www.cplusplus.com/reverse_iterator)<const_iterator> |  |
| difference_type | allocator_type::difference_type<sup>**```C++98```**</sup><br/>[allocator_traits](http://www.cplusplus.com/allocator_traits)<allocator_type>::difference_type<sup>**```C++11```**</sup> | usually the same as [ptrdiff_t](http://www.cplusplus.com/ptrdiff_t) |
| size_type | allocator_type::size_type<sup>**```C++98```**</sup><br/>[allocator_traits](http://www.cplusplus.com/allocator_traits)<allocator_type>::size_type<sup>**```C++11```**</sup> | usually the same as [size_t](http://www.cplusplus.com/size_t) |
