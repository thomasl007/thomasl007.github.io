---
---
<link rel="stylesheet" type="text/css" href="../src/md.css">

##### 命令:
`vimgrep`<br/>

##### 缩写:
`vim`<br/>

##### 格式:
`vim[grep][!] /{pattern}/[g][j] {file} ...`<br/>
* g:（一般有g）
    * 无g，（一行）一行中若有多个匹配，只显示一行搜索结果
    * 有g，（多行）每个匹配都会单独显示一行
* j: （一般有j）
    * 无j，（跳转）搜索后自动跳转到第一个匹配结果
<br/>NOTE: 跳转到匹配文件后，当前的窗口会被该文件覆盖，要回到原来的文件，使用ctrl-^
    * 有j，（不跳）只是列出所有匹配的行，不会自动跳转
* !:
    * 加!会忽略当前buffer中的内容

##### 示例
* 在当前文件中搜索关键字 xxx ,但不自动跳转到搜索结果
<br/>`vim/xxx/j %`

##### 搜索范围

以搜索关键字 xxx 为例

|范围|符号|示例|
|-|-|-|
|当前文件|%|vim /xxx/ %|
|当前目录<br/>不包括子目录|\*|vim /xxx/ *|
|当前目录下所有.cpp文件<br/>不包括子目录|\*.cpp|vim /xxx/ *.cpp|
|app目录下所有子目录|app/\*\*|vim /xxx/ app/**|
|当前目录和子目录|\*\*|vim /xxx/ **|
|同上|\*\*/\*|vim /xxx/ \*\*/*|
|当前目录和子目录下<br/>所有.cpp和.h文件|\*\*/\*.{cpp,h}|vim /xxx/ \*\*/\*.{cpp,h}|
|同上|\*\*/\*.cpp \*\*/\*.h|vim /xxx/ \*\*/\*.cpp \*\*/\*.h|

##### 大小写

以在当前文件中搜索关键字 xxx 为例

|命令|示例(支持正则)|
|-|-|
|忽略大小写|vim /\cxxx/ %|
|区分大小写（默认）|vim /\Cxxx/ %|

##### 同类命令

|vimgrep|命令|缩写|
|-|-|-|
|:vimgrepadd|追加搜索结果到quickfix||
|:lvimgrep|不使用quickfix||
|:lvimgrepadd|结合以上两条|

##### 查看搜索结果

|服务于|命令|缩写|功能|备注|
|-|-|-|-|-|
|vimgrep|:clist|:cl|列出结果，但不打开quickfix||
||:copen|:cope|打开quickfix||
||:cwindow|:cw|打开quickfix||
||:cclose|:ccl|关闭quickfix||
||:cnext|:cn|查看下一个结果||
||:cprevious|:cp|查找上一个结果||
||:colder|:col|上次搜索结果||
||:cnewer|:cnew|下次搜索结果||
|lvimgrep|:lopen|:lop|在新窗口中列出搜索结果||
||:lwindow|:lw|在新窗口中列出搜索结果||
||:lclose|:lcl|关闭搜索结果窗口||
||:lnext|:lne|查看下一个结果||
||:lprevious|:lp|查找上一个结果||
||:lolder|:lol|上次搜索结果||
||:lnewer|:lnew|下次搜索结果||

##### 在单独窗口中显示结果：
* sp | vimgrep demo *.c
* vsp | vimgrep demo *.c
