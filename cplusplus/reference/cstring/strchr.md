---
layout: cplusplus
---
注: 本文翻译自[C++官方网站](http://www.cplusplus.com/reference/cstring/strchr/).

# `function`<br/>strchr
```
const char * strchr ( const char * str, int character );
      char * strchr (       char * str, int character );
```
<!--
Locate first occurrence of character in string
Returns a pointer to the first occurrence of character in the C string str.

The terminating null-character is considered part of the C string. Therefore, it can also be located in order to retrieve a pointer to the end of a string.
-->
**在字符串中查找字符第一次出现的位置**
返回指向C字符串`str`中第一个要查找的字符的位置。

末尾的空字符是C字符串的一部分. 而且这个空字符也可以查找, 目的是获取指向字符串末尾的指针.

<!--
Parameters
str
C string.
character
Character to be located. It is passed as its int promotion, but it is internally converted back to char for the comparison.
-->

### 参数

* str
C字符串
* character
要查找的字符. 这个字符作为`int`类型传递, 但在函数内部会转回`char`型用于进行比较.

<!--
Return Value
A pointer to the first occurrence of character in str.
If the character is not found, the function returns a null pointer.
-->

### 返回值

A pointer to the first occurrence of character in str.
If the character is not found, the function returns a null pointer.

<!--
Portability
In C, this function is only declared as:
```
char * strchr ( const char *, int );
```
instead of the two overloaded versions provided in C++.
-->

### 可移植性

In C, this function is only declared as:
```
char * strchr ( const char *, int );
```
instead of the two overloaded versions provided in C++.

### 示例<!--Example-->

```c++
/* strchr example */
#include <stdio.h>
#include <string.h>

int main ()
{
  char str[] = "This is a sample string";
  char * pch;
  printf ("Looking for the 's' character in \"%s\"...\n",str);
  pch=strchr(str,'s');
  while (pch!=NULL)
  {
    printf ("found at %d\n",pch-str+1);
    pch=strchr(pch+1,'s');
  }
  return 0;
}
```
输出:
```
Looking for the 's' character in "This is a sample string"...
found at 4
found at 7
found at 11
found at 18
```

### 参阅<!--See also-->

|strrchr|Locate last occurrence of character in string (function )|
|memchr|Locate character in block of memory (function )|
|strpbrk|Locate characters in string (function )|
