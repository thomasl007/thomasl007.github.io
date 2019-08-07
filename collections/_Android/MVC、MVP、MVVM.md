---
---

### MVC

所有的业务逻辑都由 Model 实现（不是 Controller）。
Controller 只是一个消息分发器，用来解耦 View 和 Model。
**View 和 Model 之间是有交互的**，View 直接向 Model 取数据，Model 直接将数据传给 View。
View 和 Controller 都依赖于 Model。

#### Android 中的 MVC

Android 中使用 MVC 的主要目的应该是使 Model 层可以独立进行测试。
因为 Android 中的 MVC 并不是标准的 MVC，Activity 应该是兼具了 View 和 Controller 的角色。

更符合标准 MVC 的做法是，Activity、Fragment 应该作为 View，定义不依赖于 Android 的类作为 Controller，同样，为了使 Model 层可独立进行测试，Model 也不应该依赖于 Android。

这样做的**好处**是：
M-V-C 三层高度分离，测试性和扩展性得到提高。
**缺点**也很明显：
需要大量使用观察者模式（大量使用接口），提高了代码量。
UI 逻辑变更的话，可能需要更新很多类，降低了代码灵活性。

### MVP

因为 MVC 中的 V 和 M 是有交互的，这样就提高了 V 和 M 的耦合度。
为了解耦 V 和 M，可以使用 MVP 结构。

#### 结构

* Model: 数据层，负责与网络层和数据库层的逻辑交互。
* View: UI层，显示数据, 并向Presenter报告用户行为。
* Presenter: 从Model拿数据，应用到UI层，管理UI的状态，响应用户的行为。

#### Android 中的 MVP

M 与 MVC 中的 M 是一样的，但它跟 V 没有任何交互。
Activity 和 Fragment 完全作为 V 来使用。
定义 Presenter 类，作为 V 和 M 之间的桥梁。

#### 优点

* 分离了视图逻辑和业务逻辑，降低了耦合。（MVC中，M和C是有交互的）
* Activity只处理生命周期的任务，代码变得更加简洁。
* 视图逻辑和业务逻辑分别抽象到了View和Presenter的接口中，提高代码的阅读性。
* Presenter被抽象成接口，可以有多种具体的实现，所以方便进行单元测试。
* 把业务逻辑抽到Presenter中去，避免后台线程引用Activity导致Activity的资源无法被系统回收而引起内存泄露和OOM。

#### 具体实现

MVP三层都抽象为接口。

* V层持有P的接口对象
* P层持有V层和M层的接口对象
* M层为P层的提供数据

### MVVM
