---
---

## AppBarLayout

### 子 View 的四种 flag

* **scroll**<br/>
是否跟着一起滚动，一般都会加上这个flag。
* **enterAlways**<br/>
在View完全滚出屏幕的状态下，<br/>
手指向下滑动，则View会立刻跟随手指向下滑动。
* **exitUntilCollapsed**<br/>
手指向上滑动的过程中，<br/>
View会一直向上滚动，直到所剩的高度等于 要求的最小值`android:minHeight`，如果未设置，则全部滚出。
* **enterAlwaysCollapsed**<br/>
在以`exitUntilCollapsed`形式收缩到最小值后，<br/>
手指向下滑动，则View会立刻跟随手指向下滑动。
* **snap**<br/>
就是不给你中间状态，<br/>
只要滑动了，松手时，要么回到原来的位置，要么滚到最终的位置。

## 自定义 Behavior

两组函数<br/>

**第一组**
* layoutDependsOn
* onDependentViewChanged

**第二组**
* onStartNestedScroll
* onNestedPreScroll
