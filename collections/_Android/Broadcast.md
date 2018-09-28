---
---

# 未启动的应用接收广播

*据说3.1之前的版本是不需要特殊处理的，这里只针对3.1及之后的版本进行说明。*<br/> 
从Android3.1开始，新安装的程序会被置于"stopped"状态，并且只有在至少手动启动这个程序一次后该程序才会改变状态，能够正常接收到指定的广播消息。<br/>
Android这样做的目的是防止广播无意或者不必要地开启未启动的APP后台服务。

要让未启动的app收到广播,<br/>
首先，广播需要有`FLAG_EXCLUDE_STOPPED_PACKAGES`Flag，即
```Java
Intent intent = new Intent();
intent.setAction("your_action");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);
```
从Android 3.1开始，系统给Intent定义了两个新的Flag<br/>
```Java
`FLAG_INCLUDE_STOPPED_PACKAGES` // 表示包含未启动的App
`FLAG_EXCLUDE_STOPPED_PACKAGES` // 表示不包含未启动的App
```
用来控制Intent是否要对处于停止状态的App起作用。

注册广播时需要采用静态方式注册，并且指定`android:exported=true`
```Java
<receiver android:name="your_receiver"
     android:exported="true">
     <intent-filter>
          <action android:name="your_action"/>
     </intent-filter>
</receiver>
```
