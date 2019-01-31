---
layout: cplusplus
---
注: 本文翻译自[C++官方网站](http://www.cplusplus.com/reference/cstdlib/atof/).

# `function`<br/>atof

> 译者注: atoi 是 ascii to integer 的缩写

```cpp
double atof (const char* str);
```

**Convert string to double**
Parses the C string `str`, interpreting its content as a floating point number and returns its value as a `double`.

The function first discards as many whitespace characters (as in [isspace]()) as necessary until the first non-whitespace character is found. Then, starting from this character, takes as many characters as possible that are valid following a syntax resembling that of floating point literals (see below), and interprets them as a numerical value. The rest of the string after the last valid character is ignored and has no effect on the behavior of this function.

|versions||
|-|-|
|C90 (C++98)|A valid floating point number for atof using the "C" locale is formed by an optional sign character (+ or -), followed by a sequence of digits, optionally containing a decimal-point character (.), optionally followed by an exponent part (an e or E character followed by an optional sign and a sequence of digits).|
|C99/C11 (C++11)|A valid floating point number for atof using the "C" locale is formed by an optional sign character (+ or -), followed by one of:<br/>- A sequence of digits, optionally containing a decimal-point character (.), optionally followed by an exponent part (an e or E character followed by an optional sign and a sequence of digits).<br/>- A 0x or 0X prefix, then a sequence of hexadecimal digits (as in [isxdigit]()) optionally containing a period which separates the whole and fractional number parts. Optionally followed by a power of 2 exponent (a p or P character followed by an optional sign and a sequence of hexadecimal digits).<br/>- `INF` or `INFINITY` (ignoring case).<br/>- `NAN` or `NAN` sequence (ignoring case), where sequence is a sequence of characters, where each character is either an alphanumeric character (as in [isalnum]()) or the underscore character (_).|

If the first sequence of non-whitespace characters in `str` does not form a valid floating-point number as just defined, or if no such sequence exists because either `str` is empty or contains only whitespace characters, no conversion is performed and the function returns 0.0.

### 参数

* str
C-string beginning with the representation of a floating-point number.

### 返回值

On success, the function returns the converted floating point number as a double value.
If no valid conversion could be performed, the function returns zero (0.0).
If the converted value would be out of the range of representable values by a double, it causes `undefined behavior`. See [strtod]() for a more robust cross-platform alternative when this is a possibility.

### Example

```cpp
/* atof example: sine calculator */
#include <stdio.h>      /* printf, fgets */
#include <stdlib.h>     /* atof */
#include <math.h>       /* sin */

int main ()
{
  double n,m;
  double pi=3.1415926535;
  char buffer[256];
  printf ("Enter degrees: ");
  fgets (buffer,256,stdin);
  n = atof (buffer);
  m = sin (n*pi/180);
  printf ("The sine of %f degrees is %f\n" , n, m);
  return 0;
}
```
Output:
```
Enter degrees: 45
The sine of 45.000000 degrees is 0.707101
```

### Data races

The array pointed by str is accessed.

### Exceptions (C++)

**No-throw guarantee:** this function never throws exceptions.

If str does not point to a valid C-string, or if the converted value would be out of the range of values representable by a `double`, it causes `undefined behavior`.

### See also

|strtod|Convert string to double `(function)`|
|atoi|Convert string to integer `(function)`|
|atol|Convert string to long integer `(function)`|
