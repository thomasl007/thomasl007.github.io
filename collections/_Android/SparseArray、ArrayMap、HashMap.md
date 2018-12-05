---
---
[参考](https://blog.csdn.net/u010687392/article/details/47809295)

## HashMap

HashMap内部是使用一个默认容量为16的数组来存储数据的，<br/>
数组中每一个元素却又是一个链表的头结点，<br/>
所以，更准确的来说，HashMap内部存储结构是使用哈希表的拉链结构（数组+链表）<br/>
每一个结点都是Entry类型<br/>
Entry存储的内容有key、value、hash值、和next下一个Entry<br/>
这些Entry数据是按什么规则进行存储的呢？
就是通过计算元素key的hash值，然后对HashMap中数组长度取余得到该元素存储的位置，<br/>
计算公式为hash(key)%len，比如：假设hash(14)=14,hash(30)=30,hash(46)=46，我们分别对len取余，得到hash(14)%16=14，hash(30)%16=14，hash(46)%16=14，<br/>
所以key为14、30、46的这三个元素存储在数组下标为14的位置<br/>
只要一满足扩容条件，HashMap的空间将会以2倍的规律进行增大。<br/>

## SparseArray
key使用int，HashMap中必须使用Integer<br/>
通过两个数组来进行数据存储的，一个存储key，另外一个存储value<br/>
在存储和读取数据时候，使用的是二分查找法<br/>
由于其添加、查找、删除数据都需要先进行一次二分查找，所以在数据量大的情况下性能并不明显，将降低至少50%。<br/>
满足下面两个条件我们可以使用SparseArray代替HashMap：<br/>
* 数据量不大，最好在千级以内
* key必须为int类型，这中情况下的HashMap可以用SparseArray代替

## ArrayMap
内部是使用两个数组进行数据存储，一个数组记录key的hash值，另外一个数组记录Value值<br/>
和SparseArray一样，也会对key使用二分法进行从小到大排序<br/>
应用场景和SparseArray的一样，如果在数据量比较大的情况下，那么它的性能将退化至少50%。<br/>
