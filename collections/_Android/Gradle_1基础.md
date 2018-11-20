---
---
[Gradle官方文档](http://groovy-lang.org/documentation.html)

## gradle daemon

[gradle daemon](https://docs.gradle.org/current/userguide/gradle_daemon.html)是一个后台进程。<br/>
因为Gradle启动时需要创建一个JVM的实例，所以启动比较慢。<br/>
gradle daemon可以缩短（免除）gradle的启动时间。<br/>
在gradle第一次启动之后，gradle daemon作为守护进程一直保留第一次启动时创建的JVM实例，使gradle一直使用这个JVM实例。<br/>
<br/>
默认情况下gradle daemon是启用的，可以使用<br/>
```
org.gradle.daemon=false
```
关闭。<br/>
在daemon运行状态，如果想停止运行，可使用以下命令<br/>
```
gradle --stop
```

## gradle构建语言（Gradle DSL）

Gradle构建语言也称为Gradle DSL（即 [Domain Specific Language](https://docs.gradle.org/current/dsl/)）。<br/>
DSL是指*针对特定任务定制的语言*。<br/>
DSL有个*domain*的概念，以Android为例，domain指的是android构建，直白点说就是build.gradle中的`android {}`<br/>
Gradle DSL使你可以只负责描述构建，Gradle负责实际的构建过程。<br/>
*目前的理解是，在gradle构建脚本文件中，可以使用Java、Groovy或Scala等任何JVM语言来编写脚本。*<br/>

## Gradle 语法

Gradle 使用 Groovy 语言。<br/>
大多数的Java也是有效的Groovy。<br/>
Groovy中的`+`是重载的，所以`+`运算符不仅可以进行数字的运算，还可以进行字符串的拼接。<br/>

### 变量声明

Gradle声明变量时，可以指定变量类型，也可以使用`def`声明*动态类型*变量。<br/>
动态类型变量可以赋值为其他类型。<br/>

### 字符串

可以使用`${groovy代码}`的形式在字符串中执行简单的groovy代码。<br/>

### 列表

#### 列表的定义

列表的定义超级简单<br/>
```
def myList = ["Gradle", "Groovy", "Android"]
```

#### 列表的高级用法

对列表中每个项目执行闭包<br/>
```
def printItem = {item -> println "List item $item"}
myList.each(printItem)
```
**另一种写法**<br/>
在语句中直接使用闭包（不知道是不是可以称为“匿名闭包”）
```
myList.each{println "Compacly printing each list item: $it"}
```
注意两点:
1、这里没有圆括号；<br/>
2、如果闭包中只有一个参数，则这个参数默认这个参数名为`it`。<br/>

### 函数

以`def`开头，但def不是返回值类型，函数块中的最后一个表达式即为返回的内容。<br/>
**一个很特别的语法**<br/>
如果函数有参数，则可以在函数调用时省略参数两边的圆括号。<br/>
但函数嵌套调用时，需要使用圆括号避免歧义。<br/>

### 闭包（closure）

闭包实际上是一种特殊的函数声明方法。<br/>
它是一种可以打包、传递和赋值给变量的函数。<br/>
```
def myClosure = {
  println "Hello closure"
}
myClosure()
```

#### 闭包的委托对象

闭包可以有一个委托对象。<br/>
设置委托对象后，可以在闭包中访问委托对象中的成员变量和方法。<br/>
```
class GroovyGreeter {
    String greeting = "Default greeting"
    def printGreeting() { println "Greeting: $greeting" }
}
def myGroovyGreeter = new GroovyGreeter()
// 定义闭包
def greetingClosure = {
    // 注意这里，闭包中并没有定义greeting变量，这个变量第一在类GroovyGreeter中
    greeting = "Setting the greeting from a closure"
    printGreeting()
}
// 这步是关键，设置委托对象
greetingClosure.delegate = myGroovyGreeter
greetingClosure()
```

#### 闭包传递参数

闭包传参的语法很特别。<br/>
参数和函数体都在花括号中，以`->`分割，即，`参数 -> 函数体`。<br/>
多个参数以逗号分割。<br/>
例子：
```
def myClosure = { arg0, arg1 ->
    arg0 + arg1
}
```

### 类

Groovy自动为类的所有成员变量添加`getter`和`setter`。<br/>

## Gradle Wrapper

其实就是一个包含一些 Gradle 相关文件的文件夹。<br/>
Gradle Wrapper 可以指定使用的 Gradle 版本，使所有人在编译同一工程时使用相同版本的 Gradle。<br/>
Gradle Wrapper包含四个文件：<br/>
jar、属性文件和两个 `gradlew` 脚本文件<br/>

其中，`gradlew`文件用于执行gradle命令。<br/>
*[gradlew 即 gradle wrapper 的缩写](https://docs.gradle.org/current/userguide/gradle_wrapper.html)*

### 创建 Gradle Wrapper

```
gradle wrapper
```

#### 指定创建Wrapper时使用的Gradle版本

在build.gradle文件中（以使用2.2版本为例）
```
wrapper {
  gradleVersion = '2.2'
}
```

### 配置Wrapper

#### 查看Wrapper使用的Gradle版本

```
./gradlew --version
```

#### 修改Wrapper使用的gradle版本

##### 第一种：直接修改配置文件
Wrapper配置选项位置
```
gradle/wrapper/gradle-wrapper.properties
```
在此文件中修改gradle版本

##### 第二种：修改build.gradle文件
修改build.gradle中指定的gradle版本，然后更新
```
gradle wrapper
```

## 引入其他配置脚本

我们可以使用一下方式引入其他配置脚本：
```
apply from:"solution.gradle"
```
**需要注意的是，引入配置脚本可以理解为“粘贴”，即将被引入脚本的内容粘贴到当前脚本中，所以如果脚本中有相对路径，则需要注意。**

## task

[官方文档](https://docs.gradle.org/current/userguide/tutorial_using_tasks.html)

### task类别

* ad hoc task
例如，`task myTask {}`
* type task
定义任务时，指定type属性，例如，`task copyFiles(type: Copy)`

### 运行task

gradlew命令默认执行build.gradle文件中的task<br/>
例如，build.gradle文件中定义了一个名为hello的task<br/>
```
task hello {
}
```
则执行./gradlew hello时默认执行build.gradle文件中的名为hello的task。<br/>
如果想执行其他编译脚本，可以使用`-b`参数，例如<br/>
有个名为mine.gradle的文件，其中定义了一个名为hello的task，则可以使用以下命令执行hello<br/>
```
./gradlew -b mine.gradle hello
```
查看全部任务，包括自定义任务。

### 构建脚本的委托

整个构建脚本会委托给一个项目[project](https://docs.gradle.org/current/dsl/org.gradle.api.Project.html)对象。(所以，构建脚本中可以使用项目对象的属性和方法)<br/>
Gradle DSL中的所有关键字都是该项目对象的属性或方法。
例如：project对象中有一个名为[task](https://docs.gradle.org/current/dsl/org.gradle.api.Task.html)的方法，用于声明task

### 声明task

```
project.task("myTask1")
```
因为整个脚本已经委托给了`project`对象，所以我们其实可以直接这么写
```
task("myTask1")
```
因为Groovy对于有参函数的调用可以省略括号，所以我们其实可以直接这么写
```
task "myTask1"
```
因为Groovy的抽象语法树转换（abstract syntax tree transformation, AST）功能，我们可以直接去掉双引号<br/>
[参考这个](https://stackoverflow.com/questions/27584463/understanding-the-groovy-syntax-in-a-gradle-task-definition)
```
task myTask1
```
到这里就出现我们前边提到的定义hello任务的形式了`task hello {}`。<br/>

#### task配置

我们可以给已声明的任务添加属性<br/>
假设我们已声明了任务myTask<br/>
```
myTask.description = "this is desc"
myTask.group = "this is group"

```
执行查看任务命令就会看到效果。<br/>
**上边都是扯淡的属性，下边这个重要**<br/>
即，指明task要执行的操作。<br/>
我们可以在要执行的操作列表的末尾添加一个闭包：
```
myTask.doLast {}
// 以下两种写法也可以，但是新版gradle中已经标记为“过时”了
myTask << {}
myTask.leftShift {}
```
也可以在开头添加一个闭包：
```
myTask.doFirst {}
```

#### 声明task同时传递闭包

声明task同时传递要执行的操作的闭包，可以这样
```
task myTask << {}
```
也可以在声明task的同时传递配置闭包
```
task myTask {
    description "this is desc"
    group "this is group"
    doLast {
        println "here's the action"
    }
}
```
这种写法其实是设置配置闭包的委托对象为myTask，这样在闭包中就可以访问myTask的属性和方法。<br/>
仔细看，在闭包中配置属性时，并没有使用 `=`，这其实是调用了Groovy自动生成的setter方法（Groovy中的setter方法与属性同名），还记得吗？Groovy中调用有参函数时，可以省略圆括号。<br/>
**一个需要注意的地方**<br/>
如果要将集合赋值给属性，则必须使用`=`<br/>

#### 声明task同时配置属性

[某些](https://docs.gradle.org/current/javadoc/org/gradle/api/tasks/TaskContainer.html#create(java.util.Map))属性可以在task声明时直接配置
```
task myTask(description: "Another description") << {
}
```

### task之间的关系

[官方文档](https://docs.gradle.org/current/userguide/more_about_tasks.html#sec:adding_dependencies_to_tasks)

#### 依赖（dependsOn）

如果在TaskB未完成时，TaskA不能做任何事，则*TaskA依赖TaskB*
```
task putOnSocks {
    doLast {
        println "Putting on socks."
    }
}
task putOnShoes {
    dependsOn "putOnSocks" // 注意这里，putOnShoes依赖putOnSocks
    doLast {
        println "Putting on shoes."
    }
}
```
执行putOnShoes时，gradle会先执行putOnSocks，再执行putOnShoes。<br/>
也可以依赖多个task
```
task getReady {
    // 注意这里，记得吗？将集合赋值给属性时，必须不能省略“=”
    dependsOn = ["takeShower", "eatBreakfast", "putOnShoes"]
}
```
**这里有一点需要注意一下**<br/>
如果执行`gradle tasks`，gradle不会输出putOnSocks，因为gradle会认为putOnSocks仅仅是服务于putOnShoes的。<br/>
可以使用`gradle tasks --all`查看所有任务。

#### 终结（finalizedBy）

如果每次TaskA执行后，都会执行TaskB，则*TaskA以TaskB结束*
```
task eatBreakfast {
    finalizedBy "brushYourTeeth"
    doLast{
        println "Om nom nom breakfast!"
    }
}
task brushYourTeeth {
    doLast {
        println "Brushie Brushie Brushie."
    }
}
```
执行eatBreakfast，gradle会在执行eatBreakfast之后执行brushYourTeeth。

#### 排序

##### mustRunAfter和shouldRunAfter

TaskA和TaskB都可以独立执行，但两个任务都执行时，<br/>
·如果TaskA必须在TaskB之后执行，则mustRunAfter。<br/>
·如果应该先执行TaskA再执行TaskB，则shouldRunAfter。<br/>
*shouldRunAfter没有mustRunAfter约束性强，在两种情况下会被忽略*<br/>
*1.多个任务之间产生了循环关系时。*<br/>
*2.使用并发（parallel）执行，并且除shouldRunAfter之外的所有关系都满足时。*<br/>
*总之就是，强关系用mustRunAfter，弱关系用shouldRunAfter。*
```
task takeShower {
    doLast {
        println "Taking a shower."
    }
}
task putOnFragrance {
    shouldRunAfter "takeShower"
    doLast{
        println "Smellin' fresh!"
    }
}
```
执行```gradle -q putOnFragrance takeShower```，则gradle会先执行takeShower，再执行putOnFragrance
如果希望takeShower执行失败时能继续执行putOnFragrance，则使用`--continue`参数。

### 创建自定义task

1、自定义Task类，集成DefaultTask
```
class HelloTask extends DefaultTask {}
```
现在HelloTask与Ad hoc task能做的事是相同的，因为我们没有实现任何内容

2、添加action
Gradle使用注解添加action
```
class HelloTask extends DefaultTask {
    @TaskAction
    void doAction() {
        println 'Hello World'
    }
}
```

3、创建task
```
task hello(type: HelloTask)
```

4、添加属性
```
class HelloNameTask extends DefaultTask {
    String firstName

    @TaskAction
    void doAction() {
        println 'Hello, $firstName'
    }
}
```

5、 创建task
```
task helloName(type: HelloNameTask) {
    firstName = 'Jeremy'
}
```

### 参数化

Gradle提供三种方式向`project`对象添加属性，以参数化构建脚本。<br/>
命令行、gradle.properties、环境变量
假设有以下task
```
task printGreeting {
    doLast {
        println greeting
    }
}
```
如果我们直接执行printGreeting，一定会报错，因为Gradle找不到greeting属性。<br/>
我们可以通过以下三种方式，给构建脚本传递属性。

#### gradle.properties

在与构建脚本同级目录中的`gradle.properties`文件中添加以下内容
```
greeting = "hello from properties file"
```

#### 命令行

注：命令行的优先级高于`gradle.properties`
```
gradle -Pgreeting="hello from the command line" printGreeting
```

#### 向project对象的ext属性传递闭包

注：优先级最高
在构建脚本中，添加以下内容
```
ext {
    greeting = "Hello from inside the build script"
}
```

## 脚本构建的生命周期

生命周期可分三部分：初始化、配置、执行。<br/>
Gradle遇到配置闭包时会立即执行。<br/>

## 多工程构建

### settings.gradle

`settings.gradle` 告诉 gradle 哪些子工程需要参与多工程构建。<br/>
例如：
```
include ':app', ':app2'
```

### 命令行查看有哪些子工程

```
./gradlew projects
```

## 附录

### 命令表

|gradle命令|说明|
|-|
|```gradle tasks```|查看所有可用任务（有时可能需要`--all`）|
|```gradle dependencies```|查看项目依赖（可以添加`--configuration 依赖配置类型（例如，runtime）`查看特定类型的依赖）|

### 命令参数表

|参数|说明|
|-|
| `-b`|指定构建脚本|
| `-q`|[quiet]静默模式，不输出诊断信息|
| `--continue`|执行过程中有任务失败时，不终止，继续执行|
| `-P`|向构建脚本传递属性|

### 关键字表

`task`, `android`关键字都来源于gradle构建语言。<br/>

### Demo

demo from [Learn X in Y](https://learnxinyminutes.com/docs/groovy/)
```
/*
  Set yourself up:

  1) Install SDKMAN - http://sdkman.io/
  2) Install Groovy: sdk install groovy
  3) Start the groovy console by typing: groovyConsole

*/

//  Single line comments start with two forward slashes
/*
Multi line comments look like this.
*/

// Hello World
println "Hello world!"

/*
  Variables:

  You can assign values to variables for later use
*/

def x = 1
println x

x = new java.util.Date()
println x

x = -3.1499392
println x

x = false
println x

x = "Groovy!"
println x

/*
  Collections and maps
*/

//Creating an empty list
def technologies = []

/*** Adding a elements to the list ***/

// As with Java
technologies.add("Grails")

// Left shift adds, and returns the list
technologies << "Groovy"

// Add multiple elements
technologies.addAll(["Gradle","Griffon"])

/*** Removing elements from the list ***/

// As with Java
technologies.remove("Griffon")

// Subtraction works also
technologies = technologies - 'Grails'

/*** Iterating Lists ***/

// Iterate over elements of a list
technologies.each { println "Technology: $it"}
technologies.eachWithIndex { it, i -> println "$i: $it"}

/*** Checking List contents ***/

//Evaluate if a list contains element(s) (boolean)
contained = technologies.contains( 'Groovy' )

// Or
contained = 'Groovy' in technologies

// Check for multiple contents
technologies.containsAll(['Groovy','Grails'])

/*** Sorting Lists ***/

// Sort a list (mutates original list)
technologies.sort()

// To sort without mutating original, you can do:
sortedTechnologies = technologies.sort( false )

/*** Manipulating Lists ***/

//Replace all elements in the list
Collections.replaceAll(technologies, 'Gradle', 'gradle')

//Shuffle a list
Collections.shuffle(technologies, new Random())

//Clear a list
technologies.clear()

//Creating an empty map
def devMap = [:]

//Add values
devMap = ['name':'Roberto', 'framework':'Grails', 'language':'Groovy']
devMap.put('lastName','Perez')

//Iterate over elements of a map
devMap.each { println "$it.key: $it.value" }
devMap.eachWithIndex { it, i -> println "$i: $it"}

//Evaluate if a map contains a key
assert devMap.containsKey('name')

//Evaluate if a map contains a value
assert devMap.containsValue('Roberto')

//Get the keys of a map
println devMap.keySet()

//Get the values of a map
println devMap.values()

/*
  Groovy Beans

  GroovyBeans are JavaBeans but using a much simpler syntax

  When Groovy is compiled to bytecode, the following rules are used.

    * If the name is declared with an access modifier (public, private or
      protected) then a field is generated.

    * A name declared with no access modifier generates a private field with
      public getter and setter (i.e. a property).

    * If a property is declared final the private field is created final and no
      setter is generated.

    * You can declare a property and also declare your own getter or setter.

    * You can declare a property and a field of the same name, the property will
      use that field then.

    * If you want a private or protected property you have to provide your own
      getter and setter which must be declared private or protected.

    * If you access a property from within the class the property is defined in
      at compile time with implicit or explicit this (for example this.foo, or
      simply foo), Groovy will access the field directly instead of going though
      the getter and setter.

    * If you access a property that does not exist using the explicit or
      implicit foo, then Groovy will access the property through the meta class,
      which may fail at runtime.

*/

class Foo {
    // read only property
    final String name = "Roberto"

    // read only property with public getter and protected setter
    String language
    protected void setLanguage(String language) { this.language = language }

    // dynamically typed property
    def lastName
}

/*
  Logical Branching and Looping
*/

//Groovy supports the usual if - else syntax
def x = 3

if(x==1) {
    println "One"
} else if(x==2) {
    println "Two"
} else {
    println "X greater than Two"
}

//Groovy also supports the ternary operator:
def y = 10
def x = (y > 1) ? "worked" : "failed"
assert x == "worked"

//Groovy supports 'The Elvis Operator' too!
//Instead of using the ternary operator:

displayName = user.name ? user.name : 'Anonymous'

//We can write it:
displayName = user.name ?: 'Anonymous'

//For loop
//Iterate over a range
def x = 0
for (i in 0 .. 30) {
    x += i
}

//Iterate over a list
x = 0
for( i in [5,3,2,1] ) {
    x += i
}

//Iterate over an array
array = (0..20).toArray()
x = 0
for (i in array) {
    x += i
}

//Iterate over a map
def map = ['name':'Roberto', 'framework':'Grails', 'language':'Groovy']
x = ""
for ( e in map ) {
    x += e.value
    x += " "
}
assert x.equals("Roberto Grails Groovy ")

/*
  Operators

  Operator Overloading for a list of the common operators that Groovy supports:
  http://www.groovy-lang.org/operators.html#Operator-Overloading

  Helpful groovy operators
*/
//Spread operator:  invoke an action on all items of an aggregate object.
def technologies = ['Groovy','Grails','Gradle']
technologies*.toUpperCase() // = to technologies.collect { it?.toUpperCase() }

//Safe navigation operator: used to avoid a NullPointerException.
def user = User.get(1)
def username = user?.username


/*
  Closures
  A Groovy Closure is like a "code block" or a method pointer. It is a piece of
  code that is defined and then executed at a later point.

  More info at: http://www.groovy-lang.org/closures.html
*/
//Example:
def clos = { println "Hello World!" }

println "Executing the Closure:"
clos()

//Passing parameters to a closure
def sum = { a, b -> println a+b }
sum(2,4)

//Closures may refer to variables not listed in their parameter list.
def x = 5
def multiplyBy = { num -> num * x }
println multiplyBy(10)

// If you have a Closure that takes a single argument, you may omit the
// parameter definition of the Closure
def clos = { print it }
clos( "hi" )

/*
  Groovy can memoize closure results [1][2][3]
*/
def cl = {a, b ->
    sleep(3000) // simulate some time consuming processing
    a + b
}

mem = cl.memoize()

def callClosure(a, b) {
    def start = System.currentTimeMillis()
    mem(a, b)
    println "Inputs(a = $a, b = $b) - took ${System.currentTimeMillis() - start} msecs."
}

callClosure(1, 2)
callClosure(1, 2)
callClosure(2, 3)
callClosure(2, 3)
callClosure(3, 4)
callClosure(3, 4)
callClosure(1, 2)
callClosure(2, 3)
callClosure(3, 4)

/*
  Expando

  The Expando class is a dynamic bean so we can add properties and we can add
  closures as methods to an instance of this class

  http://mrhaki.blogspot.mx/2009/10/groovy-goodness-expando-as-dynamic-bean.html
*/
  def user = new Expando(name:"Roberto")
  assert 'Roberto' == user.name

  user.lastName = 'Pérez'
  assert 'Pérez' == user.lastName

  user.showInfo = { out ->
      out << "Name: $name"
      out << ", Last name: $lastName"
  }

  def sw = new StringWriter()
  println user.showInfo(sw)


/*
  Metaprogramming (MOP)
*/

//Using ExpandoMetaClass to add behaviour
String.metaClass.testAdd = {
    println "we added this"
}

String x = "test"
x?.testAdd()

//Intercepting method calls
class Test implements GroovyInterceptable {
    def sum(Integer x, Integer y) { x + y }

    def invokeMethod(String name, args) {
        System.out.println "Invoke method $name with args: $args"
    }
}

def test = new Test()
test?.sum(2,3)
test?.multiply(2,3)

//Groovy supports propertyMissing for dealing with property resolution attempts.
class Foo {
   def propertyMissing(String name) { name }
}
def f = new Foo()

assertEquals "boo", f.boo

/*
  TypeChecked and CompileStatic
  Groovy, by nature, is and will always be a dynamic language but it supports
  typechecked and compilestatic

  More info: http://www.infoq.com/articles/new-groovy-20
*/
//TypeChecked
import groovy.transform.TypeChecked

void testMethod() {}

@TypeChecked
void test() {
    testMeethod()

    def name = "Roberto"

    println naameee

}

//Another example:
import groovy.transform.TypeChecked

@TypeChecked
Integer test() {
    Integer num = "1"

    Integer[] numbers = [1,2,3,4]

    Date date = numbers[1]

    return "Test"

}

//CompileStatic example:
import groovy.transform.CompileStatic

@CompileStatic
int sum(int x, int y) {
    x + y
}

assert sum(2,5) == 7
```
