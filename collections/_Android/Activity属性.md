---
---

[官方文档](https://developer.android.google.cn/guide/topics/manifest/activity-element?hl=zh-cn)

```
<activity android:allowEmbedded=["true" | "false"]
          android:allowTaskReparenting=["true" | "false"]
          android:alwaysRetainTaskState=["true" | "false"]
          android:autoRemoveFromRecents=["true" | "false"]
          android:banner="drawable resource"
          android:clearTaskOnLaunch=["true" | "false"]
          android:configChanges=["mcc", "mnc", "locale",
                                 "touchscreen", "keyboard", "keyboardHidden",
                                 "navigation", "screenLayout", "fontScale",
                                 "uiMode", "orientation", "screenSize",
                                 "smallestScreenSize"]
          android:documentLaunchMode=["intoExisting" | "always" |
                                  "none" | "never"]
          android:enabled=["true" | "false"]
          android:excludeFromRecents=["true" | "false"]
          android:exported=["true" | "false"]
          android:finishOnTaskLaunch=["true" | "false"]
          android:hardwareAccelerated=["true" | "false"]
          android:icon="drawable resource"
          android:label="string resource"
          android:launchMode=["standard" | "singleTop" |
                              "singleTask" | "singleInstance"]
          android:maxRecents="integer"
          android:multiprocess=["true" | "false"]
          android:name="string"
          android:noHistory=["true" | "false"]  
          android:parentActivityName="string"
          android:permission="string"
          android:process="string"
          android:relinquishTaskIdentity=["true" | "false"]
          android:resizeableActivity=["true" | "false"]
          android:screenOrientation=["unspecified" | "behind" |
                                     "landscape" | "portrait" |
                                     "reverseLandscape" | "reversePortrait" |
                                     "sensorLandscape" | "sensorPortrait" |
                                     "userLandscape" | "userPortrait" |
                                     "sensor" | "fullSensor" | "nosensor" |
                                     "user" | "fullUser" | "locked"]
          android:stateNotNeeded=["true" | "false"]
          android:supportsPictureInPicture=["true" | "false"]
          android:taskAffinity="string"
          android:theme="resource or theme"
          android:uiOptions=["none" | "splitActionBarWhenNarrow"]
          android:windowSoftInputMode=["stateUnspecified",
                                       "stateUnchanged", "stateHidden",
                                       "stateAlwaysHidden", "stateVisible",
                                       "stateAlwaysVisible", "adjustUnspecified",
                                       "adjustResize", "adjustPan"] >   
    . . .
</activity>
```

### android:excludeFromRecents

> 是否应将该 Activity 启动的任务排除在最近使用的应用列表（即概览屏幕）之外。<br/>
就是说，当该 Activity 是新任务的根 Activity 时，此属性决定任务是否应出现在最近使用的应用列表中。<br/>
如果应将任务排除在列表之外，请设置“true”；<br/>
如果应将其包括在内，则设置“false”。<br/>
默认值为“false”。<br/>

如果不想让程序显示在最近程序列表中（就是后台任务列表），可以将`excludeFromRecents`设置为`true`，<br/>
这样可以给用户营造一种已经彻底退出的假象。<br/>
（注意，要达到这种效果，MAIN Activity还要设置为android.intent.category.LAUNCHER才可以）<br/>
如果要真正关闭Acivity，还需要配置`android:noHistory`一起使用。<br/>

### android:noHistory

> 当用户离开 Activity 并且其在屏幕上不再可见时，是否应从 Activity 堆栈中将其移除并完成（调用其 finish() 方法）—“true”表示应将其完成，“false”表示不应将其完成。 默认值为“false”。
> “true”一值表示 Activity 不会留下历史轨迹。 它不会留在任务的 Activity 堆栈内，因此用户将无法返回 Activity。 在此情况下，如果您启动另一个 Activity 来获取该 Activity 的结果，系统永远不会调用 onActivityResult()。
> 该属性是在 API 级别 3 引入的。

举个例子：
现在有三个Activity：A,B,C。<br/>
B的noHistory属性设置为true，A和C默认为false。<br/>
当A跳转到B，B跳转到C时，点击返回，会直接回到A，而不是B，即A->B->C->返回->A。<br/>
综上，当noHistory为true时，当用户离开Activity并且Activity不可见时，系统会调用Activity的finish()方法，关闭Activity。<br/>
*这里有个细节需要注意一下，从A跳转到B，然后按Home键退到后台，再进入最近程序列表，显示的仍然是B，但在列表中点击进入程序后，显示的是A。*<br/>

### android:stateNotNeeded

> 能否在不保存 Activity 状态的情况下将其终止并成功重新启动。<br/>
“true”表示可在不考虑其之前状态的情况下重新启动；<br/>
“false”表示需要之前状态。<br/>
默认值为“false”。
正常情况下，为保存资源而暂时关闭 Activity 前，系统会调用其 onSaveInstanceState() 方法。<br/>
该方法将 Activity 的当前状态存储在一个 Bundle 对象中，然后在 Activity 重新启动时将其传递给 onCreate()。 <br/>
如果该属性设置为“true”，系统可能不会调用 onSaveInstanceState()，并且会向 onCreate() 传递 null 而不是 Bundle - 这与它在 Activity 首次启动时完全一样。
“true”设置可确保 Activity 能够在未保留状态时重新启动。 <br/>
例如，显示主屏幕的 Activity 可以使用该设置来确保其由于某种原因崩溃时不会被移除。

这个属性设置为true之后，系统kill这个Activity之后，会立即自动重启。但实际试了一下，不会掉onDestory，会掉onCreate。

### android:screenOrientation

Activity 在设备上的显示方向。如果 Activity 是在多窗口模式下运行，系统会忽略该属性。

|属性|官方说明|备注|
|-|
|“unspecified”|默认值。由系统选择方向。在不同设备上，系统使用的政策以及基于政策在特定上下文所做的选择可能有所差异。||
|“behind”|与 Activity 栈中紧接着它的 Activity 的方向相同。||
|“landscape”|横向方向（显示的宽度大于高度）。||
|“portrait”|纵向方向（显示的高度大于宽度）。||
|“reverseLandscape”|与正常横向方向相反的横向方向。API 级别 9 中的新增配置。||
|“reversePortrait”|与正常纵向方向相反的纵向方向。API 级别 9 中的新增配置。||
|“sensorLandscape”|横向方向，但根据设备传感器，可以是正常或反向的横向方向。API 级别 9 中的新增配置。|与“landscape”的区别：<br/>“landscape”是固定；<br/>“sensorLandscape”是可以上下颠倒的|
|“sensorPortrait”|纵向方向，但根据设备传感器，可以是正常或反向的纵向方向。API 级别 9 中的新增配置。||
|“userLandscape”|横向方向，但根据设备传感器和用户的传感器首选项，可以是正常或反向的横向方向。 如果用户锁定了基于传感器的旋转，其行为与 landscape 相同，否则，其行为与 sensorLandscape 相同。API 级别 18 中的新增配置。||
|“userPortrait”|纵向方向，但根据设备传感器和用户的传感器首选项，可以是正常或反向的纵向方向。 如果用户锁定了基于传感器的旋转，其行为与 portrait 相同，否则，其行为与 sensorPortrait 相同。API 级别 18 中的新增配置。||
|“sensor”|方向由设备方向传感器决定。显示方向取决于用户如何手持设备，它会在用户旋转设备时发生变化。 但一些设备默认情况下不会旋转到所有四种可能的方向。要允许全部四种方向，请使用 "fullSensor"。||
|“fullSensor”|方向由 4 种方向中任一方向的设备方向传感器决定。这与 "sensor" 类似，不同的是它允许所有 4 种可能的屏幕方向，无论设备正常情况下采用什么方向（例如，一些设备正常情况下不使用反向纵向或反向横向，但它支持这些方向）。 API 级别 9 中的新增配置。||
|“nosensor”|决定方向时不考虑物理方向传感器。传感器会被忽略，因此显示不会随用户对设备的移动而旋转。 除了这个区别，系统在选择方向时使用的政策与“unspecified”设置相同。||
|“user”|用户当前的首选方向。||
|"fullUser"|如果用户锁定了基于传感器的旋转，其行为与 user 相同，否则，其行为与 fullSensor 相同，允许所有 4 种可能的屏幕方向。 API 级别 18 中的新增配置。||
|“locked”|将方向锁定在其当前的任意旋转方向。API 级别 18 中的新增配置。||
