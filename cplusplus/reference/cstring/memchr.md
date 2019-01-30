---
layout: cplusplus
---
注: 本文翻译自[C++官方网站](http://www.cplusplus.com/reference/cstring/memchr/).

# `function`<br/>memchr
```c++
const void * memchr ( const void * ptr, int value, size_t num );
      void * memchr (       void * ptr, int value, size_t num );
```

**在内存块中查找字符**
在`ptr`指向的内存块的前`num`个字节中搜索第一个值为`value`（被编译器解释为`unsigned char`类型）的内存，然后返回指向这块内存的指针。

为了进行比较，`value`和`ptr`数组中检出的每个字节都被编译器解释为`unsigned char`类型。

<!--
Locate character in block of memory
Searches within the first num bytes of the block of memory pointed by ptr for the first occurrence of value (interpreted as an unsigned char), and returns a pointer to it.

Both value and each of the bytes checked on the the ptr array are interpreted as unsigned char for the comparison.
-->

### 参数<!--Parameters-->

* ptr
指向执行搜索的内存块的指针。
* value
要查找的值。这个值作为`int`型传入，但在函数内部会把这个值转换为`unsigned char`类型以用于执行字节与字节的比较。
* num
要分析的字节数。
`size_t`是`unsigned integral`类型的别名.

<!--
ptr
Pointer to the block of memory where the search is performed.
value
Value to be located. The value is passed as an int, but the function performs a byte per byte search using the unsigned char conversion of this value.
num
Number of bytes to be analyzed.
size_t is an unsigned integral type.
-->

### 返回值<!--Return Value-->

指向由`ptr`指向的内存块中第一个值为`value`的内存区域的指针。
如果没有这个值，则返回空指针。
（*译者注：注意，返回值是`void *`或`const void *`，所以可能需要进行类型转换。*）

<!--
A pointer to the first occurrence of value in the block of memory pointed by ptr.
If the value is not found, the function returns a null pointer.
-->

### 可移植性<!--Portability-->

C语言中，这个函数仅声明为：
```c++
void * memchr ( const void *, int, size_t );
```
但C++提供里两个重载的函数.（*译者注：即本文开头的两个函数声明*）

<!--
In C, this function is only declared as:
```
void * memchr ( const void *, int, size_t );
```
instead of the two overloaded versions provided in C++.
-->

### 实例<!--Example-->
```c++
/* memchr example */
#include <stdio.h>
#include <string.h>

int main ()
{
  char * pch;
  char str[] = "Example string";
  pch = (char*) memchr (str, 'p', strlen(str));
  if (pch!=NULL)
    printf ("'p' found at position %d.\n", pch-str+1);
  else
    printf ("'p' not found.\n");
  return 0;
}
```
输出:
```
'p' found at position 5.
```

### 参阅<!--See also-->

|memcmp|Compare two blocks of memory (function )|
|strchr|Locate first occurrence of character in string (function )|
|strrchr|Locate last occurrence of character in string (function )|
