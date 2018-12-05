---
---
## dispatchTouchEvent

Activity、ViewGroup、View中都有。<br/>
分发点击事件

## onInterceptTouchEvent

只ViewGroup有，<br/>
被 dispatchTouchEvent 调用，<br/>
用于拦截手势事件，每个手势事件都会先调用onInterceptTouchEvent。<br/>
默认返回false<br/>

## onTouchEvent

Activity、ViewGroup、View中都有。<br/>
被 dispatchTouchEvent 调用，<br/>
用于执行点击事件。<br/>

### ViewGroup中，<br/>

默认返回false<br/>

### View中，<br/>

默认返回true<br/>

## 事件传递流程

Activity -> ViewGroup -> View<br/>

Activity
1. Activity.dispatchTouchEvent<br/>
    *直接调 DecorView（即，ViewGroup）的 dispatchTouchEvent 处理*
    1. ViewGroup.dispatchTouchEvent<br/>
    1. Activity.onTouchEvent<br/>
    Activity自己处理点击事件，事件结束

ViewGroup
1. ViewGroup.dispatchTouchEvent<br/>
    *在调 onInterceptTouchEvent 之前，会先调 disallowIntercept 判断是否有子View请求不拦截点击事件*<br/>
    1. ViewGroup.onInterceptTouchEvent<br/>
        1. false<br/>
            View.dispatchTouchEvent<br/>
        1. true<br/>
            ViewGroup自己消费点击事件，事件结束<br/>

View
1. View.dispatchTouchEvent<br/>
    1. onTouch（开发者自己实现的）
        1. true<br/>
            事件由开发者自己实现的逻辑处理
        1. View.onTouchEvent<br/>
            1. View自己处理点击时间，事件结束<br/>

**总结**
1. 都是通过 dispatchTouchEvent 将事件向上传递。
1. **实际上，事件的分发是由 ViewGroup 主导的**
    1. 只有 ViewGroup 有权利决定事件是否向子View（包括ViewGroup）传递<br/>
    （使用 onInterceptTouchEvent 判断）
    1. Activity直接将事件交给 ViewGroup
    1. View 得听 ViewGroup 的指挥
1. **还有一点需要注意(但不太确定，需要验证)，貌似 ACTION_DOWN 事件很关键，如果 ACTION_DOWN 事件被某个 View 拦截，则其他事件都会由这个 View 处理**
