---
layout: android
---
* content
{:toc}

### 下载

AOSP 使用 Git 管理。

一、安装 Repo

Repo 实际**TODO**是一个 Git 的脚本，是谷歌为了方便下载 AOSP 弄的。
安装步骤：
1. 在 home 目录下新建 bin 目录。
`mkdir ~/bin`
2. 把这个目录添加到环境变量。
`PATH=～/bin:$PATH`
3. 下载 Repo Launcher
`curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo`
`chmod a+x ~/bin/repo`

二、初始化 Repo client

1. 新建一个目录作为工作目录，目录名随意。
`mkdir myaosp`
`cd myaosp`
2. 配置 Git 的用户名和 email，据说这个 email 得是有效的
`git config --global user.name "Your Name"`
`git config --global user.email "you@example.com"`
3. 初始化 Repo 的最新版本
`repo init -u https://aosp.tuna.tsinghua.edu.cn/platform/manifest`
或者指定分支
`repo init -u https://aosp.tuna.tsinghua.edu.cn/platform/manifest -b android-4.0.1_r1`
**注：repo 需要使用 python2 环境，python3 不行。如果既安装了 python2 也安装了 python3。则修改修改一下 repo 的配置文件，把第一行的 python 改成 python2。**


