---
---

## 四个Content***类

ContentProvider、ContentValues、ContentResolver 三者配合使用

|ContentProvider|ContentValues|ContentResolver|
|-|
|数据提供者|数据|数据访问者|
|提供一个Uri作为标识<br/>格式：content://xxx/xxx/|provider和resolver都能识别的数据集类型；<br/>作为两者之间沟通的类型；<br/>以键值对的形式存数据；<br/>键必须是String类型；<br/>值只能是基本类型，不能存储对象类型。|根据Uri对数据进行访问|
|提供诸如：<br/>insert、delete、update、query<br/>等操作|作为provider和resolver的<br/>insert、delete、update、query<br/>等方法的参数|有与ContentProvider对应的方法，<br/>可对数据进行相应的操作|

除以上三种之外，还有一个 ContentObserver<br/>
即，内容观察者<br/>
用于监听指定Uri对应的数据的变化。<br/>
