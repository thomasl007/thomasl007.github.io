---
---
## Android有两种Service

|类别|特点|
|Local|本地Service，没有独立的进程|
|Remote|远程Service，独立进程，需要指定`android:process`<br/>因为是独立进程，所以需要使用AIDL进行IPC|

## 启动方式

|启动方式|特点|停止方式|生命周期|
|startService|用于启动后台任务<br/>不能进行通信|stopService|`onCreate()`：不管调几次startService，只调用一次<br/>`onStartCommand`：每次调startService都会调<br/>`onDestroy()`:调stopService或自己调stopSelf时触发|
|bindService|可进行通信|unbindService|`onCreate()`：不管调几次bindService，只调用一次<br/>`onDestroy()`:unbindService或绑定的activity关闭了|
|startService<br/>bindService|两种一起使用|unbindService<br/>stopService|`onCreate()`：不管调几次startService，只调用一次<br/>`onStartCommand`：每次调startService都会调<br/>`onDestroy()`:调unbindService，再调用stopService或自己调stopSelf时触发|

## 生命周期

![Service不同启动方式的生命周期](../../assets/img/android_service.webp)

## onBind方法

用于在bindService时，返回IBinder实例对象，以实现Activity和Service之间的通讯。<br/>
注意：<br/>
如果onBind方法返回null，则ServiceConnection中的onServiceConnected方法不会调用，也就不能实现activity和service之间的通信了。<br/>

## 粘性（sticky）Service（onStartCommand()函数的返回值）

* START_STICKY：<br/>
使用这个返回值时，我们启动的服务跟应用程序"粘"在一起，如果在执行完onStartCommand后，服务被异常kill掉，系统会自动重启该服务。当再次启动服务时，传入的第一个参数将为null;
* START_NOT_STICKY：<br/>
“非粘性的”。使用这个返回值时，如果在执行完onStartCommand后，服务被异常kill掉，系统不会自动重启该服务。
* START_REDELIVER_INTENT：<br/>
重传Intent。使用这个返回值时，如果在执行完onStartCommand后，服务被异常kill掉，系统会自动重启该服务，并将Intent的值传入。

## Service和Thread的区别

Service和Thread实际上没有什么关系。<br/>

如果是本地Service，实际上是运行在主线程上的。<br/>
如果是远程Service，实际上是运行在独立的进程上。<br/>
