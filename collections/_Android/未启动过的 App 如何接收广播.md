---
---

*据说3.1之前的版本是不需要特殊处理的，这里只针对3.1及之后的版本进行说明。*

#### 为什么 3.1 之后的版本中，新安装的 App 接不到广播

从Android3.1开始，新安装的 App 会被置为 **stopped** 状态，只有在至少手动启动这个程序一次后该程序才会改变状态。
同时，系统给 Intent 定义了两个新的 Flag，用来控制 Intent 是否要对处于 **stopped** 状态的 App 起作用。
* `FLAG_INCLUDE_STOPPED_PACKAGES // 表示包含未启动的App`
* `FLAG_EXCLUDE_STOPPED_PACKAGES // 表示不包含未启动的App`

系统发出的广播默认都加上了`FLAG_EXCLUDE_STOPPED_PACKAGES`Flag，即排除了 **stopped** 状态的 App，所以新安装的 App 接收不到。
Android这样做的目的是防止广播无意或者不必要地开启未启动的App的后台服务。

#### 让未启动过的 App 也能接收广播

发送广播时，需要有 `FLAG_INCLUDE_STOPPED_PACKAGES` Flag，即
```Java
Intent intent = new Intent();
intent.setAction("your_action");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);
```

注册广播时，需要采用静态方式注册，并且指定 `android:exported=true`，即，允许被其他 App 启动。
```XML
<receiver
    android:name="your_receiver"
    android:exported="true">
    <intent-filter>
        <action android:name="your_action"/>
    </intent-filter>
</receiver>
```
