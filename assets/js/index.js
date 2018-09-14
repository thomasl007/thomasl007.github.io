var map = [
  {
    "icon":  "res/cpp.png",
    "title": "C++",
    "anchors": [
      {
        "href": "cplusplus/%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86.html",
        "title": "内存管理"
      },
      {
        "href": "cplusplus/%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2(Implicit%20conversion).html",
        "title": "类型转化(Type conversions)"
      },
      {
        "href": "cplusplus/%E5%AE%8F%E5%AE%9A%E4%B9%89.html",
        "title": "宏定义"
      },
      {
        "href": "cplusplus/%E6%9C%AD%E8%AE%B0.html",
        "title": "札记"
      }
    ]
  },
  {
    "icon":  "res/flutter.png",
    "title": "Flutter",
    "anchors": [
      {
        "href": "flutter/started.html",
        "title": "started"
      },
    ]
  },
  {
    "icon":  "res/mysql.png",
    "title": "MySQL",
    "anchors": [
      {
        "href": "mysql/MySQL%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%88%AA%E5%8F%96.html",
        "title": "MySQL字符串截取"
      },
      {
        "href": "mysql/MySQL%E5%AF%BC%E5%85%A5%E6%95%B0%E6%8D%AE%E5%BA%93.html",
        "title": "MySQL导入数据库"
      },
      {
        "href": "mysql/MySQL查看表结构.html",
        "title": "MySQL查看表结构"
      },
    ]
  },
  {
    "icon":  "res/vim.png",
    "title": "Vim",
    "anchors": [
      {
        "href": "vim/Vim%E5%88%86%E9%A1%B5(Tab).html",
        "title": "Vim分页(Tab)",
      },
      {
        "href": "vim/Vim%E5%89%AA%E8%B4%B4%E6%9D%BF.html",
        "title": "Vim剪贴板",
      },
      {
        "href": "vim/Vim%E5%A4%9A%E6%96%87%E4%BB%B6%E6%90%9C%E7%B4%A2(vimgrep).html",
        "title": "Vim多文件搜索(vimgrep)",
      },
      {
        "href": "vim/Vim%E6%8F%92%E5%85%A5%E6%A8%A1%E5%BC%8F%E4%B8%AD%E7%9A%84%E5%BF%AB%E6%8D%B7%E9%94%AE.html",
        "title": "Vim插入模式中的快捷键",
      },
      {
        "href": "vim/Vim%E7%AA%97%E5%8F%A3%E6%93%8D%E4%BD%9C.html",
        "title": "Vim窗口操作",
      },
    ]
  },
  {
    "icon": "https://www.linux.org/styles/uix/uix/logo_small.png",
    "title": "Linux",
    "anchors": [
      {
        "href": "linux/%E6%9F%A5%E7%9C%8B%E7%AB%AF%E5%8F%A3.html",
        "title": "查看端口"
      },
      {
        "href": "linux/FastDFS%E9%85%8D%E7%BD%AE%E5%92%8C%E4%BD%BF%E7%94%A8.html",
        "title": "FastDFS配置和使用"
      },
      {
        "href": "linux/Ubuntu%E5%BC%80%E6%9C%BA%E8%87%AA%E5%90%AF%E5%8A%A8.html",
        "title": "Ubuntu开机自启动"
      },
      {
        "href": "linux/MySQL%E9%85%8D%E7%BD%AE.html",
        "title": "MySQL配置"
      },
      {
        "href": "linux/Linux.html",
        "title": "Linux"
      },
      {
        "href": "linux/Ubuntu.html",
        "title": "Ubuntu"
      },
      {
        "href": "linux/CentOS.html",
        "title": "CentOS"
      },
      {
        "href": "linux/Nginx%E9%85%8D%E7%BD%AE.html",
        "title": "Nginx配置"
      },
      {
        "href": "linux/SELinux.html",
        "title": "SELinux"
      },
    ]
  }
];
function append_catalog() {
  $(map).map(function(i, category) {
    var $li = $("<li></li>");
    $("ul.collapsible").append($li)

    var $div_header = $("<div class='collapsible-header waves-effect'></div>");
    $li.append($div_header);

    var $img = $("<img class='icon'/>").attr("src", category.icon);
    $div_header.append($img);

    var $title = category.title;
    $div_header.append($title);

    var $div_body = $("<div class='collapsible-body'></div>");
    $li.append($div_body)

    $(category.anchors).map(function(i, anchor) {
      var $a = $("<a class='waves-effect waves-light' target='_blank'></a>").attr("href", anchor.href).text(anchor.title);
      $div_body.append($a);
    });
  });
}
