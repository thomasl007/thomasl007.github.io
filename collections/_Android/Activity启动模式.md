---
---
* standard
* singleTop
* singleTask
* singleInstance

## standard

默认启动模式。<br/>
每次启动都会重新创建实例。<br/>
与上一级Activity同栈。<br/>

## singleTop

两种情况：

1. 已经有一个SingleTopActivity的实例位于栈顶<br/>
不重新创建实例，直接使用栈顶的这个实例。<br/>
    1. 先回调栈顶实例的`onPause()`
    1. 再回调`onNewIntent()`->`onResume()`<br/>
**注意：这时不会执行`onCreate()`和`onStart()`**
1. 栈中没有SingleTopActivity实例或SingleTopActivity实例不位于栈顶<br/>
与standard模式的情况完全相同<br/>

## singleTask

### taskAffinity

先要了解一下taskAffinity。<br/>
taskAffinity用于指定Activity所处的栈的名字。<br/>

#### 注意事项

taskAffinity属性主要和singleTask启动模式或者allowTaskReparenting属性配对使用，在其他情况下没有意义。<br/>
taskAffinity的名字必须包含至少一个`.`。<br/>

#### 指定方法

在activity中指定<br/>
```
<activity
    android:taskAffinity="栈的名字"
    />
```
如果activity中未指定，则跟随application<br/>
```
<application
    android:taskAffinity="栈的名字"
    >
</application>
```
如果application中也没有指定，则默认以包名作为栈的名字。<br/>

### singleTask

SingleTaskActivity的启动行为，与它的taskAffinity有关。<br/>
在启动SingleTaskActivity时，首先会判断当前是否存在与它的taskAffinity对应的栈。<br/>

1. 如果不存在<br/>
    1. 创建对应的栈<br/>
    1. 创建SingleTaskActivity实例放入新创建的栈中。<br/>
1. 如果存在<br/>
    1. 查找当前这个栈中是否存在SingleTaskActivity实例<br/>
        1. 如果存在<br/>
            1. 将栈中位于SingleTaskActivity实例之上的所有Activity都出栈（clearTop）
            1. 回调SingleTaskActivity实例的`onPause()`方法
            1. 回调SingleTaskActivity的`onNewIntent`->`onStart()`->`onResume()`（不回调`onCreate()`，与singleTop不同，会回调`onStart()`）
        1. 如果不存在<br/>
            1. 创建SingleTaskActivity实例放入栈中

#### 一种特殊的情况

不同App中的Activity，使用相同的taskAffinity，<br/>
则两个Activity会共用同一个栈，**注意：这时即使两个activity是同包同名的，也不会共用同一个实例。**。

## singleInstance

SingleInstanceActivity很复杂...<br/>

SingleInstanceActivity实例在整个系统中是唯一的。<br/>
启动SingleInstanceActivity时，首先判断系统中是否存在SingleInstanceActivity的实例<br/>

1. 如果不存在<br/>
    1. 创建一个新的栈<br/>
    1. 创建SingleInstanceActivity实例。<br/>
1. 如果存在，使用同一个实例
    1. 同一App中
        1. 回调这个实例的`onPause()`方法
        1. 回调`onNewIntent()`->`onResume()`(**注意：没有`onStart()`**)
    1. 不同App中
        1. 回调`onCreate()`->`onStart()`->`onResume()`

#### 一种非常特殊的情况

假设有两个App：A和B，都有SingleInstanceActivity。<br/>

1、 执行以下步骤：<br/>

1. A启动SingleInstanceActivity
1. B启动SingleInstanceActivity
1. 在最近任务中彻底关闭SingleInstanceActivity，**注意，这时会回调`onDestroy()`**
1. 回到A，启动SingleInstanceActivity

这时，SingleInstanceActivity的生命周期是：<br/>
**`onNewIntent()`->`onStart()`->`onResume()`**<br/>

2、 执行以下步骤：<br/>

1. A启动SingleInstanceActivity
1. 在最近任务中彻底关闭SingleInstanceActivity，**注意，这时会回调`onDestroy()`**
1. 在A中再次启动SingleInstanceActivity

这时，SingleInstanceActivity的生命周期是：<br/>
**`onCreate()`->`onStart()`->`onResume()`**<br/>
