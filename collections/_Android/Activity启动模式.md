---
---
* content
{:toc}

## Activity启动模式

### standard

默认启动模式。
每次启动都会重新创建实例。
与上一级Activity同栈。

### singleTop

两种情况：

1. 已经有一个SingleTopActivity的实例位于栈顶
不重新创建实例，直接使用栈顶的这个实例。
    1. 先回调栈顶实例的`onPause()`
    1. 再回调`onNewIntent()`->`onResume()`
**注意：这时不会执行`onCreate()`和`onStart()`**
1. 栈中没有SingleTopActivity实例或SingleTopActivity实例不位于栈顶
与standard模式的情况完全相同

### singleTask

#### taskAffinity

先要了解一下taskAffinity。
taskAffinity用于指定Activity所处的栈的名字。

**注意事项**

taskAffinity属性主要和singleTask启动模式或者allowTaskReparenting属性配对使用，在其他情况下没有意义。
taskAffinity的名字必须包含至少一个`.`。

**指定方法**

在activity中指定
```
<activity
    android:taskAffinity="栈的名字"
    />
```
如果activity中未指定，则跟随application
```
<application
    android:taskAffinity="栈的名字"
    >
</application>
```
如果application中也没有指定，则默认以包名作为栈的名字。

#### singleTask

SingleTaskActivity的启动行为，与它的taskAffinity有关。
在启动SingleTaskActivity时，首先会判断当前是否存在与它的taskAffinity对应的栈。

1. 如果不存在
    1. 创建对应的栈
    1. 创建SingleTaskActivity实例放入新创建的栈中。
1. 如果存在
    1. 查找当前这个栈中是否存在SingleTaskActivity实例
        1. 如果存在
            1. 将栈中位于SingleTaskActivity实例之上的所有Activity都出栈（clearTop）
            1. 回调SingleTaskActivity实例的`onPause()`方法
            1. 回调SingleTaskActivity的`onNewIntent`->`onStart()`->`onResume()`（不回调`onCreate()`，与singleTop不同，会回调`onStart()`）
        1. 如果不存在
            1. 创建SingleTaskActivity实例放入栈中

即以下流程:

<div class="flow">
<textarea class="code" style="display: none;" rows="0">
st=>start: 启动Activity
e=>end: 完成
cond1=>condition: 是否存在
与它的taskAffinity
对应的栈
op1=>operation: 创建对应的栈
op2=>operation: 创建Activity实例
放入新创建的栈中
cond2=>condition: 栈中是否存在
Activity实例
op3=>operation: 将栈中
位于SingleTaskActivity实例之上的
所有Activity都出栈
（即,clearTop）
op4=>operation: 先回调这个实例的 onPause() 方法
op5=>operation: 再回调
onNewIntent()
onStart()
onResume()
（不回调 onCreate() ，
与singleTop不同，会回调 onStart()）
op6=>operation: 创建
SingleTaskActivity实例
放入栈中

st->cond1
cond1(no)->op1->op2->e
cond1(yes)->cond2
cond2(yes)->op3->op4->op5->e
cond2(no)->op6->e
</textarea>
</div>

**一种特殊的情况**

不同App中的Activity，使用相同的taskAffinity，
则两个Activity会共用同一个栈，**注意：这时即使两个activity是同包同名的，也不会共用同一个实例。**。

### singleInstance

SingleInstanceActivity很复杂...

SingleInstanceActivity实例在整个系统中是唯一的。
启动SingleInstanceActivity时，首先判断系统中是否存在SingleInstanceActivity的实例

1. 如果不存在
    1. 创建一个新的栈
    1. 创建SingleInstanceActivity实例。
1. 如果存在，使用同一个实例
    1. 同一App中
        1. 回调这个实例的`onPause()`方法
        1. 回调`onNewIntent()`->`onResume()`(**注意：没有`onStart()`**)
    1. 不同App中
        1. 回调`onCreate()`->`onStart()`->`onResume()`

即以下流程:

<div class="flow">
<textarea class="code" style="display: none;" rows="0">
st=>start: 启动Activity
e=>end: 完成
cond1=>condition: 是否存在
Activity实例
op1=>operation: 创建新栈
op2=>operation: 创建Activity实例
cond2=>condition: 同一App中
op3=>operation: 先回调这个实例的 onPause() 方法
op4=>operation: 再回调
onNewIntent()
onResume()
(注意：没有 onStart())
op5=>operation: 回调
onCreate()
onStart()
onResume()

st->cond1
cond1(no)->op1->op2->e
cond1(yes)->cond2
cond2(yes)->op3->op4->e
cond2(no)->op5->e
</textarea>
</div>

**一种非常特殊的情况**

假设有两个App：A和B，都有SingleInstanceActivity。

1、 执行以下步骤：

1. A启动SingleInstanceActivity
1. B启动SingleInstanceActivity
1. 在最近任务中彻底关闭SingleInstanceActivity，**注意，这时会回调`onDestroy()`**
1. 回到A，启动SingleInstanceActivity

这时，SingleInstanceActivity的生命周期是：
**`onNewIntent()`->`onStart()`->`onResume()`**

2、 执行以下步骤：

1. A启动SingleInstanceActivity
1. 在最近任务中彻底关闭SingleInstanceActivity，**注意，这时会回调`onDestroy()`**
1. 在A中再次启动SingleInstanceActivity

这时，SingleInstanceActivity的生命周期是：
**`onCreate()`->`onStart()`->`onResume()`**
