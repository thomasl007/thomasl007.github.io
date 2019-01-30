---
layout: cplusplus
---
class template

<string>

# std::char_traits

*   [C++98](javascript:switch1.select(1))
*   [C++11](javascript:switch1.select(2))
*   [](http://www.cplusplus.com/site/versions/)

<pre style="margin: 0px;">template <class charT> struct char_traits;
template <> struct char_traits<char>;
template <> struct char_traits<wchar_t>;
</pre>

Character traits

Character traits classes specify character properties and provide specific semantics for certain operations on characters and sequences of characters.
字符特征类指定字符属性并为字符和字符序列上的特定操作提供特定的语义。

The standard library includes a standard set of *character traits classes* that can be instantiated from the <tt>char_traits</tt>template, and which are used by default both for the [basic_string](http://www.cplusplus.com/basic_string) objects and for the [input/output stream](http://www.cplusplus.com/iolibrary) objects. But any other class that follows the requirements of a *character traits class* can be used instead. This reference attempts to describe both the definition of the standard <tt>char_traits</tt> and the requirements for custom *character traits classes*.

### Template parameters

<dl>

<dt style="background-color: rgb(240, 240, 240); font-family: monospace; margin-top: 5px;">charT</dt>

<dd style="margin-bottom: 10px;">Character type.
The class defines the standard *character traits* for this character type.
This shall be one of the types for which an specialization is provided.
Aliased as member type <tt>char_traits::char_type</tt>.</dd>

</dl>

### Template specializations

The <tt>char_traits</tt> standard template supports to be instantiated with at least the following character types:

*   [C++98](javascript:switch2.select(1))
*   [C++11](javascript:switch2.select(2))
*   [](http://www.cplusplus.com/site/versions/)

| type | Description |
| <tt>char</tt> | Basic character set (size of 1 byte) |
| <tt>wchar_t</tt> | Wide character set (same size, signedness, and alignment as another integral type) |

### Member types

*   [C++98](javascript:switch3.select(1))
*   [C++11](javascript:switch3.select(2))
*   [](http://www.cplusplus.com/site/versions/)

| member type | description for *character traits types* | definition |
| char | wchar_t |
| <tt>char_type</tt> | The template parameter (<tt>charT</tt>) | <tt>char</tt> | <tt>wchar_t</tt> |
| <tt>int_type</tt> | Integral type that can represent all <tt>charT</tt> values, as well as [eof()](http://www.cplusplus.com/char_traits::eof) | <tt>int</tt> | <tt>wint_t</tt> |
| <tt>off_type</tt> | A type that behaves like [streamoff](http://www.cplusplus.com/streamoff) | <tt>streamoff</tt> | <tt>streamoff</tt> |
| <tt>pos_type</tt> | A type that behaves like [streampos](http://www.cplusplus.com/streampos) | <tt>streampos</tt> | <tt>wstreampos</tt> |
| <tt>state_type</tt> | Multibyte transformation state type, such as [mbstate_t](http://www.cplusplus.com/mbstate_t) | <tt>mbstate_t</tt> | <tt>mbstate_t</tt> |

### Member functions

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**eq**](http://www.cplusplus.com/reference/string/char_traits/eq/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Compare characters for equality ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**lt**](http://www.cplusplus.com/reference/string/char_traits/lt/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Compare characters for inequality ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**length**](http://www.cplusplus.com/reference/string/char_traits/length/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Get length of null-terminated string ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**assign**](http://www.cplusplus.com/reference/string/char_traits/assign/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Assign character ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**compare**](http://www.cplusplus.com/reference/string/char_traits/compare/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Compare sequences of characters ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**find**](http://www.cplusplus.com/reference/string/char_traits/find/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Find first occurrence of character ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**move**](http://www.cplusplus.com/reference/string/char_traits/move/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Move character sequence ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**copy**](http://www.cplusplus.com/reference/string/char_traits/copy/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Copy character sequence ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**eof**](http://www.cplusplus.com/reference/string/char_traits/eof/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">End-of-File character ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**not_eof**](http://www.cplusplus.com/reference/string/char_traits/not_eof/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Not End-of-File character ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**to_char_type**](http://www.cplusplus.com/reference/string/char_traits/to_char_type/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">To char type ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**to_int_type**](http://www.cplusplus.com/reference/string/char_traits/to_int_type/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">To int type ( public static member function )</dd>

</dl>

<dl class="links" style="clear: both; width: 728px; margin: 3px; border: 1px solid silver; background-color: rgb(240, 240, 240);">

<dt style="float: left; padding: 1px 3px; background-color: rgb(240, 240, 240);">[**eq_int_type**](http://www.cplusplus.com/reference/string/char_traits/eq_int_type/)</dt>

<dd style="margin-left: 165px; border-left: 1px solid silver; background-color: rgb(255, 255, 255); padding: 1px 3px;">Compare int_type values ( public static member function )</dd>

</dl>
