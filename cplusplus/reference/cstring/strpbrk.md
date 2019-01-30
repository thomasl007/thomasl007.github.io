---
layout: cplusplus
---
注: 本文翻译自[C++官方网站](http://www.cplusplus.com/reference/cstring/strpbrk/).

# `function`<br/>strpbrk
```
const char * strpbrk ( const char * str1, const char * str2 );
      char * strpbrk (       char * str1, const char * str2 );
```
<!--
Locate characters in string
-->
**在字符串中查找字符，并返回字符的位置**
<!--
Returns a pointer to the first occurrence in str1 of any of the characters that are part of str2, or a null pointer if there are no matches.
-->
在字符串`str1`中查找`str2`中的全部字符，只要`str2`中的任意一个字符在`str1`中出现，则返回指向`str1`中的这个字符的指针；如果`str2`中的所有字符在`str1`中都没有出现，则返回空指针。
（*译者注：可能表述的不是很清楚，可以直接看后边的代码，其实是个挺简单的事。*）
<!--
The search does not include the terminating null-characters of either strings, but ends there.
-->
搜索过程不包括字符串末尾的空字符，但会终止于这个空字符。

<!--
Parameters
* str1
C string to be scanned.
* str2
C string containing the characters to match.
-->

### 参数

* str1
C string to be scanned.
* str2
包含要匹配的字符的C字符串。

<!--
Return Value
A pointer to the first occurrence in str1 of any of the characters that are part of str2, or a null pointer if none of the characters of str2 is found in str1 before the terminating null-character.
If none of the characters of str2 is present in str1, a null pointer is returned.
-->

### 返回值

返回值是一个指针，这个指针指向第一个查找到的字符（被扫描字符串中的）。如果没找到，则返回空指针。

### 可移植性

C语言中，这个函数仅声明为：
```
char * strpbrk ( const char *, const char * );
```
而C++提供里两个重载的函数（*译者注：本文开头的两个函数声明*）。

<!--
Portability
In C, this function is only declared as:
```
char * strpbrk ( const char *, const char * );
```
instead of the two overloaded versions provided in C++.
-->

### 实例
```
/* strpbrk example */
#include <stdio.h>
#include <string.h>

int main ()
{
  char str[] = "This is a sample string";
  char key[] = "aeiou";
  char * pch;
  printf ("Vowels in '%s': ",str);
  pch = strpbrk (str, key);
  while (pch != NULL)
  {
    printf ("%c " , *pch);
    pch = strpbrk (pch+1,key);
  }
  printf ("\n");
  return 0;
}
```
输出:
```
Vowels in 'This is a sample string': i i a a e i
```

### 参阅<!--See also-->

|strcspn|Get span until character in string (function )|
|strchr|Locate first occurrence of character in string (function )|
|strrchr|Locate last occurrence of character in string (function )|
|memchr|Locate character in block of memory (function )|

### 笔记

> 我们来简单实现一下`strpbrk`的功能。
注：这个不是C++源码
```
const char * my_strpbrk ( const char * str1, const char * str2 )
{
    char const * p = str1;
    while ( *p != '\0')
    {
        char const * q = str2;
        while ( *q != '\0' )
        {
            if ( p[0] == q[0] )
            {
                return p;
            }
            q++;
        }
        p++;
    }
    return NULL;
}
```
