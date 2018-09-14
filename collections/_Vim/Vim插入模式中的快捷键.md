---
---
<link rel="stylesheet" type="text/css" href="../css/common.css"/>

## 删除

|快捷键|说明|备注|
|-|-|-|
|ctrl-h|向前删除一个字符||
|ctrl-w|向前删除一个单词||
|ctrl-u|向前删除至行首||
|ctrl-k|向后删除至行尾|有错误|

## 缩进

|快捷键|说明|备注|
|-|-|-|
|ctrl-t|增加缩进||
|ctrl-d|减少缩进||

## 复制

|快捷键|说明|备注|
|-|-|-|
|ctrl-y|复制上一行中相同列的字符||
|ctrl-e|复制下一行中相同列的字符||

## 粘贴

|快捷键|说明|备注|
|-|-|-|
|ctrl-r {寄存器名}|在当前位置插入寄存器{寄存器名}中的内容，可能包含缩进|`:h i_CTRL-R` 查看帮助文档|
|ctrl-r ctrl-p {寄存器名}|在当前位置插入寄存器{寄存器名}中的内容，不包含缩进|`:h i_CTRL-R` 查看帮助文档|

<script type="text/javascript" src="../js/md.js"></script>
<script>
setHeader("Vim插入模式中的快捷键");
</script>
