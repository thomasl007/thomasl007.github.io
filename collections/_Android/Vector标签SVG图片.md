---
---

#### 语法

|命令|功能|解释|用例|
|-|-|-|-|
|M|move to|移动绘制点，作用相当于把画笔落在哪一点。|`Mx,y`<br/>把画笔移动到x,y，准备在这个地方画图|
|L|line to|直线. 注意，直线是没有宽度的，所以什么也看不到。<br/>设置颜色和线宽:<br/>`android:strokeColor="#333330" `<br/>`android:strokeWidth="10"`|`Lx,y`<br/>直线连到x,y<br/>还有简化命令(貌似在android里无效):<br/>--`H(x)`水平连接<br/>--`V(y)`垂直连接|
|Z|close|闭合，嗯，就是把图封闭起来。|`Z`<br/>没有参数，连接起点和终点|
|C|cubic bezier|三次贝塞尔曲线|`C(x1 y1 x2 y2 x y)`<br/>--控制点: `(x1,y1)`, `(x2,y2)`<br/>--终点: `(x,y)`|
|Q|quatratic bezier|二次贝塞尔曲线|`Q(x1 y1 x y)`<br/>--控制点:`(x1,y1)`<br/>--终点`(x,y)`|
|A|ellipse|圆弧|`A(rx ry x-axis-rotation large-arc-flag sweep-flag x y)`<br/>--`rx ry` 椭圆半径<br/>--`x-axis-rotation` x轴旋转角度<br/>--`large-arc-flag` 为0时表示取小弧度，1时取大弧度 （舍取的时候，是要长的还是短的）<br/>--`sweep-flag` 0取逆时针方向，1取顺时针方向 |

每个命令区分大小写
* 大写: 后面的参数是绝对坐标
* 小写: 后面的参数是相对坐标，相对于上一个点的位置。

参数之间用空格或逗号隔开
