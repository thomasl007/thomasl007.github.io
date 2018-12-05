---
---
### View中各函数的执行顺序

```
onFinishInflate()
onMeasure() 计算子View的尺寸、位置，以设置自身的尺寸
onSizeChanged()
onLayout() 设置子View的布局
onMeasure()
onLayout() 设置子View的布局
onDraw()
```
