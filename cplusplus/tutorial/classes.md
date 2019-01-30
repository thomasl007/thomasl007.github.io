---
layout: cplusplus
---
<!--
*Classes* are an expanded concept of *data structures*: like data structures, they can contain data members, but they can also contain functions as members.
-->
*类*是*数据结构体*概念的扩展：与数据结构体类似，类也可以包含数据成员，但除此之外类还可以包含函数成员。
(_译注: 这里说的*数据结构体*是指C语言的结构体，而非C++中的`struct`，C++中`struct`的作用与`class`**基本**相同_)
<!--
An *object* is an instantiation of a class. In terms of variables, a class would be the type, and an object would be the variable.
-->
*对象*是类的实例。用变量的定义来理解就是: 类是类型，而对象是变量。
<!--
Classes are defined using either keyword `class` or keyword `struct`, with the following syntax:
-->
类使用关键字`class`或`struct`定义，语法如下（_译注：伪代码_）：
```
class class_name {    // 类名
  access_specifier_1: // 访问权限标识符1
    member1;          // 成员1
  access_specifier_2: // 访问权限标识符2
    member2;          // 成员2
  ...
} object_names;       // 对象名
```
<!--
Where `class_name` is a valid identifier for the class, `object_names` is an optional list of names for objects of this class. The body of the declaration can contain *members*, which can either be data or function declarations, and optionally *access specifiers*.
-->
其中`class_name`是类的有效标识符，`object_names`是该类对象的可选名称列表。 声明的主体可以包含*members*，它可以是数据或函数声明，另外还有可选的*访问说明符*。
<!--
Classes have the same format as plain *data structures*, except that they can also include functions and have these new things called *access specifiers*. An *access specifier* is one of the following three keywords: `private`, `public` or `protected`. These specifiers modify the access rights for the members that follow them:
-->
类与普通的*数据结构体*具有相同的格式，但类还可以包含函数并具有称为*访问修饰符*的这些新东西。 *访问修饰符*是以下三个关键字之一：`private`，`public`或`protected`。 这些说明符修改了遵循它们的成员的访问权限：

*   `private` members of a class are accessible only from within other members of the same class (or from their *"friends"*).
*   `protected` members are accessible from other members of the same class (or from their *"friends"*), but also from members of their derived classes.
*   Finally, `public` members are accessible from anywhere where the object is visible.
<!--
By default, all members of a class declared with the `class` keyword have private access for all its members. Therefore, any member that is declared before any other *access specifier* has private access automatically. For example: 
-->
默认情况下，用`class`声明的类的所有成员拥有私有访问权限。就是说，那些声明在其他*访问修饰符*之前的，没有被任何*访问修饰符*修饰的成员，默认拥有`private`权限。例如：
```
class Rectangle {
    int width, height;
  public:
    void set_values (int,int);
    int area (void);
} rect;
```
<!--
Declares a class (i.e., a type) called `Rectangle` and an object (i.e., a variable) of this class, called `rect`. This class contains four members: two data members of type `int` (member `width` and member `height`) with *private access*(because private is the default access level) and two member functions with *public access*: the functions `set_values`and `area`, of which for now we have only included their declaration, but not their definition.
-->
这个例子中声明了一个名为`Rectangle`的类（也就是类型）和这个类的一个对象（也就是变量）`rect`。这个类包含4个成员：两个*私有的*`int`型数据成员（`width`和`height`）和两个*公有的*成员函数：`set_values`和 `area`，现在我们只写了这两个函数的声明，还没有写函数定义。
<!--
Notice the difference between the *class name* and the *object name*: In the previous example, `Rectangle` was the *class name* (i.e., the type), whereas `rect` was an object of type `Rectangle`. It is the same relationship `int` and `a` have in the following declaration:
-->
需要注意*类名*和*对象名*之间的区别。在这个例子中，`Rectangle`是*类名*（即类型），而`rect`是`Rectangle`类型的对象。这种关系就像下边这条语句中的`int`和`a`的关系。
```
int a;
```
<!--
where `int` is the type name (the class) and `a` is the variable name (the object). 
-->
`int`是类型名（类），`a`是变量名（对象）。
<!--
After the declarations of `Rectangle` and `rect`, any of the public members of object `rect` can be accessed as if they were normal functions or normal variables, by simply inserting a dot (`.`) between *object name* and *member name*. This follows the same syntax as accessing the members of plain data structures. For example: 
-->
在声明`Rectangle`和`rect`之后，我们就可以用*`对象名.成员名`*的形式访问对象`rect`的共有成员。这种语法跟普通的数据结构体成员的方式是相同的。例如：
```
rect.set_values (3,4);
myarea = rect.area();
```
<!--
The only members of `rect` that cannot be accessed from outside the class are `width` and `height`, since they have private access and they can only be referred to from within other members of that same class.
-->
`rect`的`width`和`height`不能在类外访问，因为它们是私有的，只能被同一个类（例如这里的`Rectangle`）的其他成员访问（例如`set_values`和`area`函数）。
<!--
Here is the complete example of class Rectangle:
-->
以下是类`Rectangle`的完成示例：
```
// classes example
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    void set_values (int,int);
    int area() {return width*height;}
};

void Rectangle::set_values (int x, int y) {
  width = x;
  height = y;
}

int main () {
  Rectangle rect;
  rect.set_values (3,4);
  cout << "area: " << rect.area();
  return 0;
}
```
<!--
This example reintroduces the *scope operator* (`::`, two colons), seen in earlier chapters in relation to namespaces. Here it is used in the definition of function `set_values` to define a member of a class outside the class itself.
-->
这个例子中再次用到了*域操作符*（`::`，两个英文冒号）——前边关于命名空间的章节中也讲解过。这里的*域操作符*用在函数`set_values`的定义中，用于在类外进行成员函数的定义。
<!--
Notice that the definition of the member function `area` has been included directly within the definition of class `Rectangle` given its extreme simplicity. Conversely, `set_values` it is merely declared with its prototype within the class, but its definition is outside it. In this outside definition, the operator of scope (`::`) is used to specify that the function being defined is a member of the class `Rectangle` and not a regular non-member function.
-->
注意，成员函数`area`已经直接定义在类`Rectangle`的定义中。而`set_values`只在类中用函数原型进行了声明，它的定义在类外。在类外定义中，域操作符`::`用于声明其后的函数是类`Rectangle`的成员，而不是一个常规的非成员函数。
<!--
The scope operator (`::`) specifies the class to which the member being defined belongs, granting exactly the same scope properties as if this function definition was directly included within the class definition. For example, the function `set_values` in the previous example has access to the variables `width` and `height`, which are private members of class `Rectangle`, and thus only accessible from other members of the class, such as this.
-->
域操作符`::`表明定义的成员属于哪个类，并赋予完全相同的范围属性，就好像此函数定义直接包含在类定义中一样。
<!--
The only difference between defining a member function completely within the class definition or to just include its declaration in the function and define it later outside the class, is that in the first case the function is automatically considered an *inline* member function by the compiler, while in the second it is a normal (not-inline) class member function. This causes no differences in behavior, but only on possible compiler optimizations.

Members `width` and `height` have private access (remember that if nothing else is specified, all members of a class defined with keyword `class` have private access). By declaring them private, access from outside the class is not allowed. This makes sense, since we have already defined a member function to set values for those members within the object: the member function `set_values`. Therefore, the rest of the program does not need to have direct access to them. Perhaps in a so simple example as this, it is difficult to see how restricting access to these variables may be useful, but in greater projects it may be very important that values cannot be modified in an unexpected way (unexpected from the point of view of the object).

The most important property of a class is that it is a type, and as such, we can declare multiple objects of it. For example, following with the previous example of class `Rectangle`, we could have declared the object `rectb` in addition to object `rect`:

|

```
123456789101112131415161718192021222324
```

 |

```
// example: one class, two objects
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    void set_values (int,int);
    int area () {return width*height;}
};

void Rectangle::set_values (int x, int y) {
  width = x;
  height = y;
}

int main () {
  Rectangle rect, rectb;
  rect.set_values (3,4);
  rectb.set_values (5,6);
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}
```

 |

<pre style="margin: 0px;"><samp>rect area: 12
rectb area: 30</samp> </pre>

 |

[Edit & Run](http://www.cplusplus.com/doc/tutorial/classes/# "Open C++ Shell (in a new window)")

 |

In this particular case, the class (type of the objects) is `Rectangle`, of which there are two instances (i.e., objects): `rect` and `rectb`. Each one of them has its own member variables and member functions.

Notice that the call to `rect.area()` does not give the same result as the call to `rectb.area()`. This is because each object of class `Rectangle` has its own variables `width` and `height`, as they -in some way- have also their own function members `set_value` and `area` that operate on the object's own member variables.

Classes allow programming using object-oriented paradigms: Data and functions are both members of the object, reducing the need to pass and carry handlers or other state variables as arguments to functions, because they are part of the object whose member is called. Notice that no arguments were passed on the calls to `rect.area` or `rectb.area`. Those member functions directly used the data members of their respective objects `rect` and `rectb`.

###  Constructors

What would happen in the previous example if we called the member function `area` before having called `set_values`? An undetermined result, since the members `width` and `height` had never been assigned a value.

In order to avoid that, a class can include a special function called its *constructor*, which is automatically called whenever a new object of this class is created, allowing the class to initialize member variables or allocate storage.

This constructor function is declared just like a regular member function, but with a name that matches the class name and without any return type; not even `void`.

The `Rectangle` class above can easily be improved by implementing a constructor:

|

```
1234567891011121314151617181920212223
```

 |

```
// example: class constructor
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    Rectangle (int,int);
    int area () {return (width*height);}
};

Rectangle::Rectangle (int a, int b) {
  width = a;
  height = b;
}

int main () {
  Rectangle rect (3,4);
  Rectangle rectb (5,6);
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}
```

 |

<pre style="margin: 0px;"><samp>rect area: 12
rectb area: 30</samp> </pre>

 |

[Edit & Run](http://www.cplusplus.com/doc/tutorial/classes/# "Open C++ Shell (in a new window)")

 |

The results of this example are identical to those of the previous example. But now, class `Rectangle` has no member function `set_values`, and has instead a constructor that performs a similar action: it initializes the values of `width` and `height` with the arguments passed to it.

Notice how these arguments are passed to the constructor at the moment at which the objects of this class are created:

|

```
12
```

 |

```
Rectangle rect (3,4);
Rectangle rectb (5,6);
```

 |  |

Constructors cannot be called explicitly as if they were regular member functions. They are only executed once, when a new object of that class is created.

Notice how neither the constructor prototype declaration (within the class) nor the latter constructor definition, have return values; not even `void`: Constructors never return values, they simply initialize the object.

### Overloading constructors

Like any other function, a constructor can also be overloaded with different versions taking different parameters: with a different number of parameters and/or parameters of different types. The compiler will automatically call the one whose parameters match the arguments:

|

```
1234567891011121314151617181920212223242526272829
```

 |

```
// overloading class constructors
#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
  public:
    Rectangle ();
    Rectangle (int,int);
    int area (void) {return (width*height);}
};

Rectangle::Rectangle () {
  width = 5;
  height = 5;
}

Rectangle::Rectangle (int a, int b) {
  width = a;
  height = b;
}

int main () {
  Rectangle rect (3,4);
  Rectangle rectb;
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}
```

 |

<pre style="margin: 0px;"><samp>rect area: 12
rectb area: 25</samp> </pre>

 |

[Edit & Run](http://www.cplusplus.com/doc/tutorial/classes/# "Open C++ Shell (in a new window)")

 |

In the above example, two objects of class `Rectangle` are constructed: `rect` and `rectb`. `rect` is constructed with two arguments, like in the example before.

But this example also introduces a special kind constructor: the *default constructor*. The *default constructor* is the constructor that takes no parameters, and it is special because it is called when an object is declared but is not initialized with any arguments. In the example above, the *default constructor* is called for `rectb`. Note how `rectb` is not even constructed with an empty set of parentheses - in fact, empty parentheses cannot be used to call the default constructor:

|

```
12
```

 |

```
Rectangle rectb;   // ok, default constructor called
Rectangle rectc(); // oops, default constructor NOT called
```

 |  |

This is because the empty set of parentheses would make of `rectc` a function declaration instead of an object declaration: It would be a function that takes no arguments and returns a value of type `Rectangle`.

### Uniform initialization

The way of calling constructors by enclosing their arguments in parentheses, as shown above, is known as *functional form*. But constructors can also be called with other syntaxes:

First, constructors with a single parameter can be called using the variable initialization syntax (an equal sign followed by the argument):

`class_name object_name = initialization_value;` 

More recently, C++ introduced the possibility of constructors to be called using *uniform initialization*, which essentially is the same as the functional form, but using braces (`{}`) instead of parentheses (`()`):

`class_name object_name { value, value, value, ... }` 

Optionally, this last syntax can include an equal sign before the braces.

Here is an example with four ways to construct objects of a class whose constructor takes a single parameter:

|

```
1234567891011121314151617181920
```

 |

```
// classes and uniform initialization
#include <iostream>
using namespace std;

class Circle {
    double radius;
  public:
    Circle(double r) { radius = r; }
    double circum() {return 2*radius*3.14159265;}
};

int main () {
  Circle foo (10.0);   // functional form
  Circle bar = 20.0;   // assignment init.
  Circle baz {30.0};   // uniform init.
  Circle qux = {40.0}; // POD-like

  cout << "foo's circumference: " << foo.circum() << '\n';
  return 0;
}
```

 |

<pre style="margin: 0px;"><samp>foo's circumference: 62.8319</samp></pre>

 |

[Edit & Run](http://www.cplusplus.com/doc/tutorial/classes/# "Open C++ Shell (in a new window)")

 |

An advantage of uniform initialization over functional form is that, unlike parentheses, braces cannot be confused with function declarations, and thus can be used to explicitly call default constructors:

|

```
123
```

 |

```
Rectangle rectb;   // default constructor called
Rectangle rectc(); // function declaration (default constructor NOT called)
Rectangle rectd{}; // default constructor called
```

 |  |

The choice of syntax to call constructors is largely a matter of style. Most existing code currently uses functional form, and some newer style guides suggest to choose uniform initialization over the others, even though it also has its potential pitfalls for its preference of `[initializer_list](http://www.cplusplus.com/initializer_list)` as its type.

### Member initialization in constructors

When a constructor is used to initialize other members, these other members can be initialized directly, without resorting to statements in its body. This is done by inserting, before the constructor's body, a colon (`:`) and a list of initializations for class members. For example, consider a class with the following declaration:

|

```
123456
```

 |

```
class Rectangle {
    int width,height;
  public:
    Rectangle(int,int);
    int area() {return width*height;}
};
```

 |  |

The constructor for this class could be defined, as usual, as:

|  |

```
Rectangle::Rectangle (int x, int y) { width=x; height=y; }
```

 |  |

But it could also be defined using *member initialization* as:

|  |

```
Rectangle::Rectangle (int x, int y) : width(x) { height=y; }
```

 |  |

Or even:

|  |

```
Rectangle::Rectangle (int x, int y) : width(x), height(y) { }
```

 |  |

Note how in this last case, the constructor does nothing else than initialize its members, hence it has an empty function body.

For members of fundamental types, it makes no difference which of the ways above the constructor is defined, because they are not initialized by default, but for member objects (those whose type is a class), if they are not initialized after the colon, they are default-constructed.

Default-constructing all members of a class may or may always not be convenient: in some cases, this is a waste (when the member is then reinitialized otherwise in the constructor), but in some other cases, default-construction is not even possible (when the class does not have a default constructor). In these cases, members shall be initialized in the member initialization list. For example:

|

```
12345678910111213141516171819202122232425
```

 |

```
// member initialization
#include <iostream>
using namespace std;

class Circle {
    double radius;
  public:
    Circle(double r) : radius(r) { }
    double area() {return radius*radius*3.14159265;}
};

class Cylinder {
    Circle base;
    double height;
  public:
    Cylinder(double r, double h) : base (r), height(h) {}
    double volume() {return base.area() * height;}
};

int main () {
  Cylinder foo (10,20);

  cout << "foo's volume: " << foo.volume() << '\n';
  return 0;
}
```

 |

<pre style="margin: 0px;"><samp>foo's volume: 6283.19</samp></pre>

 |

[Edit & Run](http://www.cplusplus.com/doc/tutorial/classes/# "Open C++ Shell (in a new window)")

 |

In this example, class `Cylinder` has a member object whose type is another class (`base`'s type is `Circle`). Because objects of class `Circle` can only be constructed with a parameter, `Cylinder`'s constructor needs to call `base`'s constructor, and the only way to do this is in the *member initializer list*.

These initializations can also use uniform initializer syntax, using braces `{}` instead of parentheses `()`:

|  |

```
Cylinder::Cylinder (double r, double h) : base{r}, height{h} { }
```

 |  |

### Pointers to classes

Objects can also be pointed to by pointers: Once declared, a class becomes a valid type, so it can be used as the type pointed to by a pointer. For example: 

|  |

```
Rectangle * prect;
```

 |  |

is a pointer to an object of class `Rectangle`.

Similarly as with plain data structures, the members of an object can be accessed directly from a pointer by using the arrow operator (`->`). Here is an example with some possible combinations:

|

```
123456789101112131415161718192021222324252627
```

 |

```
// pointer to classes example
#include <iostream>
using namespace std;

class Rectangle {
  int width, height;
public:
  Rectangle(int x, int y) : width(x), height(y) {}
  int area(void) { return width * height; }
};

int main() {
  Rectangle obj (3, 4);
  Rectangle * foo, * bar, * baz;
  foo = &obj;
  bar = new Rectangle (5, 6);
  baz = new Rectangle[2] { {2,5}, {3,6} };
  cout << "obj's area: " << obj.area() << '\n';
  cout << "*foo's area: " << foo->area() << '\n';
  cout << "*bar's area: " << bar->area() << '\n';
  cout << "baz[0]'s area:" << baz[0].area() << '\n';
  cout << "baz[1]'s area:" << baz[1].area() << '\n';
  delete bar;
  delete[] baz;
  return 0;
}
```

 |

[Edit & Run](http://www.cplusplus.com/doc/tutorial/classes/# "Open C++ Shell (in a new window)")

 |

This example makes use of several operators to operate on objects and pointers (operators `*`, `&`, `.`, `->`, `[]`). They can be interpreted as:

| expression | can be read as |
| `*x` | pointed to by `x` |
| `&x` | address of `x` |
| `x.y` | member `y` of object `x` |
| `x->y` | member `y` of object pointed to by `x` |
| `(*x).y` | member `y` of object pointed to by `x` (equivalent to the previous one) |
| `x[0]` | first object pointed to by `x` |
| `x[1]` | second object pointed to by `x` |
| `x[n]` | (`n+1`)th object pointed to by `x` |

Most of these expressions have been introduced in earlier chapters. Most notably, the chapter about arrays introduced the offset operator (`[]`) and the chapter about plain data structures introduced the arrow operator (`->`).

### Classes defined with struct and union

Classes can be defined not only with keyword `class`, but also with keywords `struct` and `union`.

The keyword `struct`, generally used to declare plain data structures, can also be used to declare classes that have member functions, with the same syntax as with keyword `class`. The only difference between both is that members of classes declared with the keyword `struct` have `public` access by default, while members of classes declared with the keyword `class` have `private` access by default. For all other purposes both keywords are equivalent in this context.

Conversely, the concept of *unions* is different from that of classes declared with `struct` and `class`, since unions only store one data member at a time, but nevertheless they are also classes and can thus also hold member functions. The default access in union classes is `public`.
