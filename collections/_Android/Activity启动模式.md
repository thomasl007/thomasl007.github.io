---
---
* content
{:toc}

#### 相关概念

Task: 可以简单的理解为Activity栈.

taskAffinity: 用于指定 Activity 所处的 Task 的名字。
**注意：**
taskAffinity 属性主要和 singleTask 启动模式或者 allowTaskReparenting 属性配对使用，在其他情况下没有意义。
taskAffinity 的名字必须包含至少一个`.`。
taskAffinity 的设置方法：
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

#### standard（默认启动模式）

每次`startActivity`都会创建新的实例。
Task 需要分两种情况考虑：
1、如果 Activity 来自同一 app，则两个 Activity 在同一 Task 中。
2、如果 Activity 来自不同 app，
5.0之前：两个 Activity 在同一 Task 中
5.0之后：创建新的 Task 存放新启动的 Activity

#### singleTop

与 standard 只有一个区别：
_(假设有两个 Activity，A 和 B，B 的启动模式是 singleTop)_
如果 A 所在的 Task 的栈顶已经存在 B 的实例，则不重新创建 B 的实例，直接使用栈顶的这个实例。
**但要注意栈顶 Activity 的生命周期变化:**
* **先回调栈顶实例的`onPause()`**
* 再回调`onNewIntent()`->`onResume()`
**注意：这时不会执行`onCreate()`和`onStart()`**

#### singleTask

singleTask Activity 的启动行为，与它的 taskAffinity 有关。
启动 singleTask Activity 时，
**会先判断与 Activity 的 taskAffinity 对应的 Task 是否存在，然后再判断 Activity 是否存在**，具体如下：
如果 Task 不存在，则创建 Task ，然后创建 singleTask Activity 实例放入新创建的 Task 中。
如果 Task 存在，
  查找这个 Task 中是否存在 singleTask Activity 实例，
    如果 Activity 实例不存在，则创建 Activity 实例放入 Task 中
    如果 Activity 实例存在，则将 Task 中位于这个 Activity 实例之上的所有 Activity 都出栈（clearTop）
      **同时注意这个 Activity 实例的生命周期变化**
      1、**先回调 `onPause()`方法**
      2、再回调`onNewIntent`->`onStart()`->`onResume()`
        **注意：不回调`onCreate()`，与 singleTop 不同，会回调`onStart()`

**！！特别注意！！**
不同 App 中的 Activity，如果使用相同的 taskAffinity，则两个 Activity 会共用同一个栈。
**但是，注意，这时即使两个activity是同包同名的，也不会共用同一个实例。**。

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
