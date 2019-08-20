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
4. **注：repo 需要使用 python2 环境，python3 不行。如果既安装了 python2 也安装了 python3。则修改修改一下 repo 的配置文件，把第一行的 python 改成 python2。**

二、下载

```
wget -c https://mirrors.tuna.tsinghua.edu.cn/aosp-monthly/aosp-latest.tar # 下载初始化包
tar xf aosp-latest.tar
cd AOSP   # 解压得到的 AOSP 工程目录
# 这时 ls 的话什么也看不到，因为只有一个隐藏的 .repo 目录
repo sync # 正常同步一遍即可得到完整目录
# 或 repo sync -l 仅checkout代码
```
此后，每次只需运行 repo sync 即可保持同步。 我们强烈建议您保持每天同步，并尽量选择凌晨等低峰时间

三、编译

1、初始化编译环境
```
source build/envsetup.sh 
或者
. build/envsetup.sh
```

2、选择目标
```
lunch
```

3、编译
```
make
```


