---
---
## Java获取文件路径

Java里 getPath、getAbsolutePath、getCanonicalPath 的区别: <br/>
* getPath() 把 File 对象中路径原样返回，不管是相对路径还是绝对路径。
* getAbsolutePath() 返回 当前路径 + getPath() 的路径，字符串拼接，不会处理 `.` 和 `..`。
* getCanonicalPath 返回真正的绝对路径。

## Java引用

[参考](https://www.2cto.com/kf/201207/139522.html)

* 强引用 <br/>
普通的引用，如果一个对象有强引用，那么垃圾回收器就不会回收它。
* 软引用（SoftReference） <br/>
如果一个对象 **只** 具有软引用，则 <br/>
    * 内存充足时，不回收
    * 内存不足时，回收
* 弱引用（WeakReference） <br/>
如果一个对象 **只** 具有弱引用，则只要垃圾回收器线程扫描到它就会回收。
* 虚引用 <br/>
虚引用主要用来跟踪对象被垃圾回收器回收的活动，虚引用必须和引用队列（ReferenceQueue）联合使用。
