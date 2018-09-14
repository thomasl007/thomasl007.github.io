function setHeader(titleStr) {
  // 设置标题
  var p=document.createElement("p");
  var node=document.createTextNode(titleStr);
  p.appendChild(node);

  var title = document.getElementsByTagName("title")[0];
  if (!title) {
    title = document.createElement("title");
    document.head.appendChild(title);
  }
  title.appendChild(node);

  var header = document.getElementsByClassName('post-header')[0];
  var headerH1 = header.getElementsByTagName("h1")[0];
  if (!headerH1) {
    headerH1 = document.createElement("h1");
    header.appendChild(headerH1);
  }
  var headerH1Node=document.createTextNode(titleStr);
  headerH1.appendChild(headerH1Node);

  // 设置图标
  var eLinkIcon = document.createElement("link");
  eLinkIcon.rel = 'icon';
  eLinkIcon.href = '../res/icon.png';
  eLinkIcon.type = 'image/x-icon';
  document.head.appendChild(eLinkIcon);
}
