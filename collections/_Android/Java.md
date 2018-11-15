---
---
# Java获取文件路径

Java里 getPath、getAbsolutePath、getCanonicalPath 的区别: <br/>
* getPath() 把 File 对象中路径原样返回，不管是相对路径还是绝对路径。
* getAbsolutePath() 返回 当前路径 + getPath() 的路径，字符串拼接，不会处理 `.` 和 `..`。
* getCanonicalPath 返回真正的绝对路径。
