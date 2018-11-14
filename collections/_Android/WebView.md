---
---

# 问题

问题： <br/>
[Android8] WebView 的 canGoBack 函数总返回 false <br/>
原因： <br/>
从Android8开始，WebView的`shouldOverrideUrlLoading`返回值为`false`时才会自动重定向，并且无需调用`loadUrl`，与8.0之前的效果刚好相反。<br/>
方案： <br/>
```
@Override
public boolean shouldOverrideUrlLoading(WebView view, String url) {
    // Android8之前的版本需要返回 true，并且需要自己调loadUrl；8之后相反
    if(Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
        view.loadUrl(url);
        return true;
    }
    return false;
}
```
