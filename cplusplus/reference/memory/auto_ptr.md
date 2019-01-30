---
layout: cplusplus
---
_header file_: ```<memory>```
_class template_: ```template <class X> class auto_ptr;```

Automatic Pointer [deprecated]

>**Note:** This class template is deprecated as of C++11. [unique_ptr](http://www.cplusplus.com/unique_ptr) is a new facility with a similar functionality, but with improved security (no fake copy assignments), added features (*deleters*) and support for arrays. See [unique_ptr](http://www.cplusplus.com/unique_ptr) for additional information.

**注意：**C++11开始，这个类模板已废弃，[unique_ptr](http://www.cplusplus.com/unique_ptr)是一个提供了相同功能的新模板，但安全性更高（非伪拷贝赋值），增加了(*deleters*) ，并且支持数组。参见 [unique_ptr](http://www.cplusplus.com/unique_ptr) 。

>This class template provides a limited *garbage collection* facility for pointers, by allowing pointers to have the elements they point to automatically destroyed when the *auto_ptr* object is itself destroyed.

这个类模板为指针提供了一个有限的*垃圾回收*功能，允许在 `auto_ptr` 对象销毁时，自动销毁指针指向的元素。

>auto_ptr objects have the peculiarity of taking ownership of the pointers assigned to them: An auto_ptr object that has ownership over one element is in charge of destroying the element it points to and to deallocate the memory allocated to it when itself is destroyed. The destructor does this by calling operator delete automatically.

`auto_ptr` 对象拥有分配给它们的指针的所有权，它会负责销毁它指向的元素，并在其自身销毁时释放分配给它的内存。析构函数通过调用操作符 `delete` 自动完成这一切。

>Therefore, no two auto_ptr objects should own the same element, since both would try to destruct them at some point. When an assignment operation takes place between two auto_ptr objects, ownership is transferred, which means that the object losing ownership is set to no longer point to the element (it is set to the null pointer).

因此，不应该有两个`auto_ptr`对象拥有相同的元素，因为它们都会在某些时候尝试析构它们拥有的元素。在两个`auto_ptr`对象之间进行赋值操作时，元素的所有权会转移，失去元素所有权的对象将不再指向任何元素（被设置为控指针）。

>### Template parameters

### 模板参数

X
>The type of the managed object, aliased as member type element_type.

托管对象的类型，别名为element_type，代表成员的类型

>### Member types

### 成员类型

>The following alias is a member type of auto_ptr.

以下别名代表 `auto_ptr` 的成员的类型。

>### Member functions

### 成员函数
|function||
|-|-|
|[(constructor)](http://www.cplusplus.com/reference/memory/auto_ptr/auto_ptr/)|Construct auto_ptr object (public member function )|
|[(destructor)](http://www.cplusplus.com/reference/memory/auto_ptr/~auto_ptr/)|Destroy auto_ptr (public member function )|
|[get](http://www.cplusplus.com/reference/memory/auto_ptr/get/)|Get pointer (public member function )|
|[operator*](http://www.cplusplus.com/reference/memory/auto_ptr/operator*/)|Dereference object (public member function )|
|[operator->](http://www.cplusplus.com/reference/memory/auto_ptr/operator-%3E/)|Dereference object member (public member function )|
|[operator=](http://www.cplusplus.com/reference/memory/auto_ptr/operator=/)|Release and copy auto_ptr (public member function )<br/>注：伪拷贝，所有权转移，右值被释放了|
|[release](http://www.cplusplus.com/reference/memory/auto_ptr/release/)|Release pointer (public member function )<br/>注：将内部指针指向空，但不释放指向的内存，用返回值交出原来指向的内存的所有权|
|[reset](http://www.cplusplus.com/reference/memory/auto_ptr/reset/)|Deallocate object pointed and set new value (public member function )<br/>注：将内部指针指向空，并释放指向的内存|
|[(conversion operators)](http://www.cplusplus.com/reference/memory/auto_ptr/operators/)|Conversion operators (public member function )|
