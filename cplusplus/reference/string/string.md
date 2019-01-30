---
layout: cplusplus
---
```
#include <string>
```
class
```
std::string
```
typedef
```
typedef basic_string<char> string;
```
>String class

字符串类

>Strings are objects that represent sequences of characters.

字符串是表示字符序列的对象。

The standard ```string``` class provides support for such objects with an interface similar to that of a [standard container](http://www.cplusplus.com/stl) of bytes, but adding features specifically designed to operate with strings of single-byte characters.
标准字符串类为类似于标准字节容器的接口提供对这些对象的支持，但增加了专门设计用来处理单字节字符串的功能。

The ```string``` class is an instantiation of the [basic_string](http://www.cplusplus.com/basic_string) class template that uses ```char``` (i.e., bytes) as its *character type*, with its default [char_traits](http://www.cplusplus.com/char_traits) and [allocator](http://www.cplusplus.com/allocator) types (see [basic_string](http://www.cplusplus.com/basic_string) for more info on the template).

字符串类是basic_string类模板的一个实例，它使用char（即字节）作为其字符类型，其默认char_traits和allocator类型（有关模板的更多信息，请参见basic_string）。

Note that this class handles bytes independently of the encoding used: If used to handle sequences of multi-byte or variable-length characters (such as UTF-8), all members of this class (such as [length](http://www.cplusplus.com/string::length) or [size](http://www.cplusplus.com/string::size)), as well as its iterators, will still operate in terms of bytes (not actual encoded characters).

请注意，此类独立于所使用的编码处理字节：如果用于处理多字节或可变长度字符（如UTF-8）的序列，则此类的所有成员（如长度或大小）以及 它的迭代器仍然按照字节操作（不是实际编码的字符）。

### Member types

| member type | definition |
|-|-|
| value_type | char |
| traits_type | [char_traits](http://www.cplusplus.com/char_traits)<char> |
| allocator_type | [allocator](http://www.cplusplus.com/allocator)<char> |
| reference | char& |
| const_reference | const char& |
| pointer | char* |
| const_pointer | const char* |
| iterator | a [random access iterator](http://www.cplusplus.com/RandomAccessIterator) to char (convertible to const_iterator) |
| const_iterator | a [random access iterator](http://www.cplusplus.com/RandomAccessIterator) to const char |
| reverse_iterator | [reverse_iterator](http://www.cplusplus.com/reverse_iterator)<iterator> |
| const_reverse_iterator | [reverse_iterator](http://www.cplusplus.com/reverse_iterator)<const_iterator> |
| difference_type | [ptrdiff_t](http://www.cplusplus.com/ptrdiff_t) |
| size_type | [size_t](http://www.cplusplus.com/size_t) |

### Member functions

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**(constructor)**](http://www.cplusplus.com/reference/string/string/string/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Construct string object (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**(destructor)**](http://www.cplusplus.com/reference/string/string/~string/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">String destructor (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**operator=**](http://www.cplusplus.com/reference/string/string/operator=/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">String assignment (public member function )</dd>

</dl>

**Iterators**:

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**begin**](http://www.cplusplus.com/reference/string/string/begin/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return iterator to beginning (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**end**](http://www.cplusplus.com/reference/string/string/end/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return iterator to end (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**rbegin**](http://www.cplusplus.com/reference/string/string/rbegin/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return reverse iterator to reverse beginning (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**rend**](http://www.cplusplus.com/reference/string/string/rend/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return reverse iterator to reverse end (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**cbegin **](http://www.cplusplus.com/reference/string/string/cbegin/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return const_iterator to beginning (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**cend **](http://www.cplusplus.com/reference/string/string/cend/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return const_iterator to end (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**crbegin **](http://www.cplusplus.com/reference/string/string/crbegin/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return const_reverse_iterator to reverse beginning (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**crend **](http://www.cplusplus.com/reference/string/string/crend/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return const_reverse_iterator to reverse end (public member function )</dd>

</dl>

**Capacity**:

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**size**](http://www.cplusplus.com/reference/string/string/size/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return length of string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**length**](http://www.cplusplus.com/reference/string/string/length/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return length of string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**max_size**](http://www.cplusplus.com/reference/string/string/max_size/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return maximum size of string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**resize**](http://www.cplusplus.com/reference/string/string/resize/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Resize string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**capacity**](http://www.cplusplus.com/reference/string/string/capacity/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Return size of allocated storage (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**reserve**](http://www.cplusplus.com/reference/string/string/reserve/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Request a change in capacity (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**clear**](http://www.cplusplus.com/reference/string/string/clear/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Clear string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**empty**](http://www.cplusplus.com/reference/string/string/empty/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Test if string is empty (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**shrink_to_fit **](http://www.cplusplus.com/reference/string/string/shrink_to_fit/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Shrink to fit (public member function )</dd>

</dl>

**Element access**:

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**operator[]**](http://www.cplusplus.com/reference/string/string/operator[]/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get character of string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**at**](http://www.cplusplus.com/reference/string/string/at/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get character in string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**back **](http://www.cplusplus.com/reference/string/string/back/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Access last character (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**front **](http://www.cplusplus.com/reference/string/string/front/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Access first character (public member function )</dd>

</dl>

**Modifiers**:

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**operator+=**](http://www.cplusplus.com/reference/string/string/operator+=/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Append to string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**append**](http://www.cplusplus.com/reference/string/string/append/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Append to string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**push_back**](http://www.cplusplus.com/reference/string/string/push_back/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Append character to string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**assign**](http://www.cplusplus.com/reference/string/string/assign/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Assign content to string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**insert**](http://www.cplusplus.com/reference/string/string/insert/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Insert into string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**erase**](http://www.cplusplus.com/reference/string/string/erase/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Erase characters from string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**replace**](http://www.cplusplus.com/reference/string/string/replace/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Replace portion of string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**swap**](http://www.cplusplus.com/reference/string/string/swap/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Swap string values (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**pop_back **](http://www.cplusplus.com/reference/string/string/pop_back/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Delete last character (public member function )</dd>

</dl>

**String operations**:

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**c_str**](http://www.cplusplus.com/reference/string/string/c_str/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get C string equivalent (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**data**](http://www.cplusplus.com/reference/string/string/data/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get string data (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**get_allocator**](http://www.cplusplus.com/reference/string/string/get_allocator/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get allocator (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**copy**](http://www.cplusplus.com/reference/string/string/copy/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Copy sequence of characters from string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**find**](http://www.cplusplus.com/reference/string/string/find/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find content in string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**rfind**](http://www.cplusplus.com/reference/string/string/rfind/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find last occurrence of content in string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**find_first_of**](http://www.cplusplus.com/reference/string/string/find_first_of/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find character in string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**find_last_of**](http://www.cplusplus.com/reference/string/string/find_last_of/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find character in string from the end (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**find_first_not_of**](http://www.cplusplus.com/reference/string/string/find_first_not_of/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find absence of character in string (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**find_last_not_of**](http://www.cplusplus.com/reference/string/string/find_last_not_of/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find non-matching character in string from the end (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**substr**](http://www.cplusplus.com/reference/string/string/substr/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Generate substring (public member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**compare**](http://www.cplusplus.com/reference/string/string/compare/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Compare strings (public member function )</dd>

</dl>

### Member constants

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**npos**](http://www.cplusplus.com/reference/string/string/npos/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Maximum value for size_t (public static member constant )</dd>

</dl>

### Non-member function overloads

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**operator+**](http://www.cplusplus.com/reference/string/string/operator+/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Concatenate strings (function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**relational operators**](http://www.cplusplus.com/reference/string/string/operators/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Relational operators for string (function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**swap**](http://www.cplusplus.com/reference/string/string/swap-free/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Exchanges the values of two strings (function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**operator>>**](http://www.cplusplus.com/reference/string/string/operator%3E%3E/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Extract string from stream (function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**operator<<**](http://www.cplusplus.com/reference/string/string/operator%3C%3C/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Insert string into stream (function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**getline**](http://www.cplusplus.com/reference/string/string/getline/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get line from stream into string (function )</dd>

</dl>
