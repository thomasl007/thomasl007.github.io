---
---
* content
{:toc}

### Git宏观认知

首先明确两点：
1. Git 和 SVN 不同，SVN 的仓库在服务器上，而Git是分布式的，每个终端上都有一个仓库，只在本地即可对工程进行版本控制。
2. Git 有个**暂存区**的概念。工程文件（就是你要进行管理的文件）放在**工作区（Working Directory）**。`.git`目录是**版本库（Repository）**，
版本库中有一个称为 stage（或者叫 index）的**暂存区**。它们的关系如下：

![Git本地仓库结构图]({{ site.baseurl }}/assets/img/git-commit.png)

### 从远程仓库获取工程（git clone）

假设远程仓库已经存在，而我们本地没有任何内容。我们要拉取远程仓库到本地来完成开发工作。
这时我们需要使用`git clone`命令。

#### 最基本最常见的用法

**最基本也是最常见**的用法是：
```
git clone https://remote_repo_url/shenmewanyier
```
*https://shenmewanyier/shenmewanyier ：是远程仓库的地址。*
执行这个命令会在本地创建一个名为 shenmewanyier 的目录，里边包括工程文件和一个`.git`目录。
*注：这个命令会将远程仓库的全部内容 clone 的本地，包括全部分支和历史版本。(我们暂且认为是全部内容，实际未必，之后讲解)*

#### 指定 clone 到本地时创建的目录名

如果你想在 clone 时**指定本地创建的目录名**，直接把目录名写在后边即可：
```
git clone https://remote_repo_url/shenmewanyier zhegewanyier
```
*zhegewanyier ：就是你想指定的目录名。*

#### 其他用法（通常开发时不会用到）

##### clone 同时切换分支

`git clone` 的默认分支是 master，如果你希望在 clone 之后直接切换到指定的某个分支，你可以这样做：
```
git clone -b 分支名 https://remote_repo_url/shenmewanyier
```
*-b：用于指定分支。master是你想 clone 的远程分支的名称。*

##### 只 clone 其中一个分支，或最后提交的几个历史版本

`git clone`命令默认会将整个工程 clone 到本地，包括工程的全部分支和历史版本，通常这是我们希望的。
但有些情况下，你可能想**只获取其中一个分支**，这时你可以这样：
```
git clone --single-branch https://remote_repo_url/shenmewanyier
```
*注：可以添加 -b <branch> 指定要克隆哪个分支*

或者你可能想**只获取最后一个历史版本**，这时你可以这样：
```
git clone --depth=1 https://remote_repo_url/shenmewanyier
```
*--depth=1：用于指定获取最近提交的几个历史版本，=1即获取一个*

### 分支

#### 查看分支

执行 `git clone` 命令可以从远程仓库获取全部分支，但此时执行**查看分支命令**：
```
git branch
```
你只能看到一个分支（默认是 master 分支）。这是因为其他分支都是隐藏的，你可以使用`-a`参数来查看全部分支：
```
git branch -a
```
或者也可以使用`-r`参数查看远程分支
```
git branch -r
```

#### 创建分支

创建分支是我们在开发中很常用的操作：
```
git checkout -b dev # 创建dev分支，并切换到dev分支
```
等价于
```
git branch dev      # 创建dev分支
git checkout dev    # 切换到dev分支
```

#### 合并分支

假设，要把 dev 分支的内容合并到 master 上
第一步，我们要先切换到 master 分支
```
git checkout master
```
第二步，进行合并
将dev分支合并到当前分支（注意，merge成功后，会自动执行commit，所以这里要写 commit 说明）
```
git merge dev -m '你的commit说明'
```
**！！注意！！：**
Git默认会**尽量**采用**Fast forward**方式合并分支。
这种合并方式非常快，从代码角度来说，就是直接将 master 指针指向了 dev 分支的最新提交。
显然这样就会存在一个问题（如果你认为是问题的话），如果查看分支线就会发现，你只能看到 master 的线，而看不到 dev 的线。而且在删除dev之后，dev的分支信息会删除。
这可能是你希望的，但如果你不希望这样，可以添加`--no-ff`命令强制关闭Fast forward。
注意上边说的是**尽量**，Fast forward 的条件很严格，通常开发中应该很少能采用这种合并方式。
如果 merge 过程中产生冲突，则不能进行 Fast forward。这时需要你处理冲突后再commit。
如果从 master 创建分支之后 master 分支上有了新的提交，这时即使没有冲突也不能使用 Fast forward。

如果你想避免使用 Fast forward，可以使用`--no-ff`参数：
```
git merge --no-ff -m 'commit log' dev
```

#### 删除分支

如果分支内容都已经合并到其他分支：
```
git branch -d dev # 删除dev分支
```

如果分支有变更内容未合并到主分支，但还是想删除，则可以强制删除：
```
git branch -D dev # 强制删除dev分支
```

### 查看工程状态（哪些文件被修改了，哪些文件没 add 等等）

有时，你可能想要查看本地工程的状态，你可以使用这个命令：
```
git status
```
这个命令会列出当前工作区中哪些文件有变更，哪些文件未被 Git 管理等。
*注意，如果已经 commit 了全部内容，则工作区是干净的，这个命令将返回`nothing to commit, working tree clean`*

### 上传变更到本地仓库（不上传到远程仓库）

Git 上传变更需要分两步进行。假设工作区（即你的本地工程）相较本地仓库已经有了变更内容。
这时想提交变更，我们可以执行以下命令：
```
git add    # 把文件修改添加到暂存区
git commit # 把暂存区的所有内容提交到当前分支
```
**注意，没有添加到暂存区的修改内容是不会被 commit 的，即使是对同一个文件的修改。**例如：
假设我们有个名为 bingo.txt 的文件。
我们对这个文件进行修改，然后执行`git add bingo.txt`将修改加入暂存区。
现在我们再次对这个文件进行修改，然后执行`git commit -m '我是commit说明'`将变更内容提交到本地仓库。
这时，使用`git status`查看工程状态，你会发现，第二次修改的内容没有被 commit。
这是因为`git commit`命令是将暂存区的内容提交到本地仓库，而第二次变更内容并没有使用`git add`命令添加到暂存区，所以这部分变更不会被 commit。

**！！重要！！：这就涉及到了 Git 的一个重要特性——Git管理的是修改，而非文件。**

### 查看历史

如果只想查看当前分支的 log ：
```
git log
```
如果想查看所有分支的 log ：
```
git log --all
```
如果想像图形客户端一样显示所有分支的分支线，可以这样：
```
git log --all --graph
```

### 回滚

因为Git有工作区、暂存区和本地仓库，所以回滚代码有多种情况：

![Git回滚]({{ site.baseurl }}/assets/img/git-reset.png)

#### 第一种，撤销工作区的修改（未 commit 未 add 的修改）

这种情况，变更内容只在工作区，执行以下命令即可撤销文件的全部变更内容，**但要注意，一旦撤销，就没有后悔药了**。
```
git checkout -- <file>
```

#### 第二种，回滚暂存区的修改（未 commit，已 add 的修改）

执行以下命令，可以从暂存区撤销修改，**重新放回工作区**
```
git reset HEAD <file>
```
*注：这种其实是使用了 reset 的 --mixed 参数，即`git reset --mixed HEAD <file>`*
然后就可以参照*第一种*了。

#### 第三种，回滚版本库、暂存区和工作区的修改（已 commit 的修改）

**注意，执行以下操作后，工作区和暂存区中未 commit 的变更都会丢失。**

需要告诉 Git 你要回滚到哪个版本，Git 有三种形式获取版本：
1. 版本号
使用`git log`可以查看到版本号
（不需要把整个版本号都输入，只输入前几位就行，Git会自动匹配）
2. `HEAD^`
`HEAD` ： 代表当前版本
`HEAD^` : 代表上一版本
`HEAD^^` : 代表上上一版本
...
3. `HEAD~`
HEAD~100 : 代表往上100个版本

使用以下命令进行回滚
```
git reset --hard HEAD^
```
*HEAD^ ：表示回滚到上一个版本，注意跟第二种的区别，这里有参数 `--hard`*

#### 第四种，回滚远程分支

使用第三种方式回滚本地分支后，再使用 push 推送到远程分支：
（**注：有些服务器不允许执行这种操作。这时就得用 revert 了，往下看。**）
```
git push -f
```
*注意：这里必须使用了`-f`强制提交，否则 git 会提示错误，因为回滚后你的本地仓库没有远程仓库新。*

#### reset 、 revert 、 rebase

回滚已提交到仓库的变更时，可以使用三种方式：reset、revert、rebase。上边都是使用的 reset。

**三者之间的区别是什么呢？**
实际上，这三个命令干的**完全不是一回事**。
* reset：是将仓库重置**到**某个历史版本，这个历史版本之后的所有变更都会撤销，提交的 log 也会删除。
* revert：是**撤销**某个历史版本的变更，然后已变更的形式再次提交到仓库，即，会生成一条 revert 的 log。
* rebase: 可以用于**删除**某个历史版本的变更，同时也会删除这个版本的 log，**但这会导致这个版本之后的所有 commit id 都变更。**。
（注意：这里说的是“可以用于”，rebase 的主要功能不只这个。）

rebase 的使用稍微复杂些：
先使用以下命令切换到要删除的版本的**前一个版本**
```
git rebase -i 要删除的版本的前一个版本的版本号
```
**！！注意！！：这个命令到这里并没有结束**
执行这个命令之后，会显示编辑框，选择要进行的操作。具体内容稍后添加。

#### 后悔 reset、rebase 了怎么办？

虽然 reset 和 rebase 可以删除 log，但这并不意味你的操作是“神不知鬼不觉的”。
我们可以使用以下命令查看命令历史，即，查看对仓库执行过的所有操作：
```
git reflog
```
这个命令会列出版本号，你懂的。

### 远程仓库

Git是分布式的，我们本地就有一个仓库，这样的好处之一是，我们在不联网的状态下，在本地也可以对项目进行版本管理。
如果想与其他人共享代码，则通常需要使用远程仓库。

#### 添加远程仓库

我们本地已有远程仓库，要添加本地仓库，可以使用以下命令：
```
git remote add origin 远程仓库地址
```
`origin`是我们定义的远程仓库的名字，`origin`是Git对远程仓库的默认叫法，通常都使用这个名字，你也可以改成别的。

添加成功后，我们需要把本地仓库中的分支提交到远程仓库，并与远程仓库的分支关联。
```
git push -u origin master # 向远程仓库origin提交master分支，-u参数使本地的master分支与远程的master分支相关联
```

关联之后，只要使用以下命令即可把本地master分支的最新修改推送至远程仓库
```
git push origin master
```

**注：可以添加不同地址的远程仓库**

#### 查看远程仓库信息

```
git remote    # 返回远程仓库名
git remote -v # 查看远程仓库详细信息（包括远程仓库的地址）
```

#### 上传到远程仓库

推送指定分支到远程仓库，以master分支为例
```
git push origin master
```

#### 从本地删除远程仓库

```
git remote rm origin
```

## 暂存变更内容

如果你修改了一些内容，突然想暂停这部分修改，去做一些别的修改，但现在又不想提交已修改的内容。
这是可以把当前的修改内容暂存起来。
```
git stash
```
执行这个命令之后，查看git status，你会发现，工作区没有变更内容。
但注意，stash不会暂存为被git管理的文件（未add进来的文件）。

查看暂存内容
```
git stash list
```
要提取暂存内容，但不从暂存列表中删除
```
git stash apply
```
要提取暂存内容，并从暂存列表中删除
```
git stash pop
```
要提取指定的暂存内容，可以先用`git stash list`查看stash的id
例如，id是stash@{0}
```
git stash apply stash@{0}
```
要删除暂存内容（后边可以加stash的id）
```
git stash drop
```

## clone其他分支

`git clone`只会克隆远程仓库的master分支。
要获取其他分支，比如，克隆远程的dev分支
```
git checkout -b dev origin/dev
```
如果想向这个分支提交内容，则还需要
```
git branch --set-upstream-to=origin/dev dev # 指定本地dev分支与远程origin/dev分支的链接
或
git branch --set-upstream-to dev origin/dev
```
否则会提示`There is no tracking information for the current branch.`


## rebase

rebase操作可以把本地未push的分叉提交历史整理成直线；
rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。
```
git rebase
```

## 标签（tag）

在HEAD上加标签
```
git tag tag_name
```
在指定commit id上加标签
```
git tag tag_name commit_id
```
给标签加说明
```
git tag -a tag_name -m 'comment'
```
查看全部标签
```
git tag
```
删除本地标签
```
git tag -d tag_name
```
推送指定标签到远程仓库
```
git push origin tag_name
```
推送全部标签到远程仓库
```
git push origin --tags
```
删除远程标签
```
git tag -d tag_name                 # 先删除本地标签
git push origin :refs/tags/tag_name # 删除远程标签，注意格式，有点怪
```

## Git配置

让Git显示颜色，会让命令输出看起来更醒目
```
git config --global color.ui true
```

#### 给git的命令设置别名，比如，svn里的checkout可以简写为co

```
git config --global alias.co checkout
git config --global alias.unstage 'reset HEAD'
```
`--global`使配置应用于当前用户，不加的话只是应用于当前工程

## .gitignore

检查规则是否有问题
```
git check-ignore -v App.class
.gitignore:3:*.class    App.class
```

强制添加
```
git add -f xxx
```

## 常见错误

问题：
warning: LF will be replaced by CRLF in
方案：
针对当前工程：git config core.autocrlf false
针对全局进行：git config --global core.autocrlf false
