---
---
[website](http://square.github.io/picasso/)
[sources](https://github.com/square/picasso)
当前基于[2.71828](https://github.com/square/picasso/tree/2.71828)版本分析

##### 流程

*[图片来源](https://juejin.im/post/58b7f59a44d904006acbbb83)*
![流程图]({{ site.baseurl }}/assets/img/picasso_process.png)


#### 类说明

###### ·Picasso

`单例模式`,`对外接口`
图片加载、转换、缓存的管理类。

*另外：这里有个很高端的地方: 在使用get()方法获取Picasso单例对象时, 不需要传递Context, 因为Picasso通过注册Provider进而从Provider中获取了Context.*

###### ·RequestCreator

`Builder模式`, `链式API`, `对外接口`
每请求一个图片就对应一个RequestCreator。
用于构建图片下载请求. 实际上调用`Picasso#load()`方法后获取就是这个类的对象。
Request的属性
* 占位图
* 缓存策略
* 裁剪规则
* 显示大小
* 优先级
* ...

###### ·DeferredRequestCreator

从类名上理解是延后的RequestCreator.
这个类实际上只有在target是ImageView, 并且希望图片的宽高适应ImageView的宽高时才会用到.
如果创建请求时还不能获取ImageView的宽和高的时候, 则创建一个DeferredRequestCreator对象, DeferredRequestCreator对ImageView的状态进行监听, 直到可以获取到宽和高时再继续创建并执行请求。  

###### ·Request

请求实体类，存储向`RequestCreator`中传入的信息(如URI、占位图、缓存策略、裁剪规则、显示大小、优先级等).

###### ·Action

tags: `抽象类`
直接子类: `TargetAction`, `GetAction`, `FetchAction`, `ImageViewAction`, `RemoteViewsAction`.
请求包装类，存储`RequestCreator`设置的属性(包括`Request`对象, 内存策略, 网络策略), 最终提交给线程执行下载。

*这里需要注意一下, Picasso会使用一个Map来记录针对每个target(通常是一个ImageView)的请求, target本身作为Key. 在发布一个请求之前, Picasso会判断针对这个target是否已经有请求, 如果有并且还跟当前请求不同, 则Picasso会干掉之前的请求, 发布这个新的请求.*

###### ·Dispatcher

分发器，分发执行针对Action的各种请求、分发结果等。
Dispatcher中实际上是使用了一个Android的Handler将事件加入事件队列.

###### ·BitmapHunter

实际是一个Runnable, 是Picasso的一个核心的类，执行图片下载(实际是使用`RequestHandler`)，获取结果后解码成Bitmap, 然后做一些转换操作, 如图片旋转、裁剪等。

###### ·RequestHandler

实际执行获取图片操作的类, `BitmapHunter`使用这个类获取图片(使用`Downloader`下载).
直接子类:
* NetworkRequestHandler
处理来自网络的图片
* FileRequestHandler
处理来自文件系统的图片
* AssetRequestHandler
加载asset目录下的图片
* ResourceRequestHandler
加载res下的图片
* ContentStreamRequestHandler
加载ContentProvider提供的图片
* MediaStoreRequestHandler
处理MediaStore中的图片
* ContactsPhotoRequestHandler
加载com.android.contacts/中的图片

###### ·Downloader

图片下载器. `RequestHandler`使用这个类下载图片, 默认使用`OkHttpDownloader`, 也可以自己实现.
直接子类:
* OkHttpDownloader
用OkHttp实现的图片下载器，默认就是用的这个下载器。

###### ·PicassoExecutorService

Picasso使用的线程池，默认池大小为3。

###### ·Cache

内存缓存策略. 默认使用`LruCache`, 也可以自己实现.
直接子类:
* LruCache
一个使用最近最少使用策略的内存缓存。

###### ·Target

只在使用TargetAction时使用这个类, 用于回调图片加载事件，有3个回调方法, 
* onPrepareLoad
在请求提交前回调
* onBitmapLoaded
请求成功回调，并返回Bitmap
* onBitmapFailed
请求失败回调

###### ·PicassoDrawable

继承BitmapDrawable, 实现了过渡动画和图片来源的标识（就是图片来源的指示器, debug用的, 要调用 setIndicatorsEnabled(true)方法才生效），请求成功后会包装成BitmapDrawable显示到ImageView上。

###### ·Response

返回的结果信息，Stream流或者Bitmap。

###### ·MemoryPolicy

内存缓存策略，一个枚举类型。

###### ·NetworkPolicy

磁盘缓存策略，一个枚举类型。  

###### ·Stats: 

这个类相当于日志记录，会记录如：内存缓存的命中次数，丢失次数，下载次数，转换次数等等，我们可以通过`StatsSnapshot`类将日志打印出来，看一下整个项目的图片加载情况。

###### ·StatsSnapshot

状态快照，与`Stats`对应，打印`Stats`纪录的信息。
