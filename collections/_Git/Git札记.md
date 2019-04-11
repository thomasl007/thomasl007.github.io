---
---
* content
{:toc}

首先明确两点，Git和SVN不同。
第一，SVN的仓库在服务器上，而Git是分布式的，每个终端上都有一个仓库。
第二，Git有个**暂存区**的概念，你的工程文件放在**工作区（Working Directory）**，`.git`目录是**版本库（Repository）**，
版本库中有一个称为stage（或者叫index）的**暂存区**。

## 查看仓库状态（哪些文件被修改了，哪些文件没添加...）

```
git status # 注意，如果已经commit了全部内容，则工作区是干净的，这个命令将放回`nothing to commit, working tree clean`
```

## 上传代码

```
git add    # 把文件修改添加到暂存区
git commit # 把暂存区的所有内容提交到当前分支
git push   # 将本地仓库变更内容上传到远程仓库
```
注意，没有添加到暂存区（即没有执行git add）的修改内容是不会被commit的，即使是对同一个文件的修改。
例如，有文件 bingo.txt
```
# 修改文件内容
git add bingo.txt # 将修改加入暂存区
# 再次修改文件内容
git commit -m '我是commitshuoming'
```
这是使用`git status`查看，你会发现，第二次修改的内容没有被commit，因为它没有被添加到暂存区。
**这也说明，Git管理的是修改，而非文件。**

## 查看历史

```
git log
```
带分支线
```
git log --graph
```

## 回滚

因为Git有工作区、暂存区和本地仓库，所以回滚代码有多种情况：

#### 第一种，未commit，也未add

这种情况，变更内容只在工作区，执行以下命令即可，撤销文件的全部变更内容，**但要注意，一旦撤销，就没有后悔药了**。
```
git checkout -- <file>
```

#### 第二种，未commit，但已add

执行以下命令，可以从暂存区撤销修改，重新放回工作区
```
git reset HEAD <file>
```
然后就可以参照*第一种*了

#### 第三种，已commit

**注意，执行以下操作后，工作区和暂存区中为commit的变更都会丢失。**

需要告诉Git你要回滚到哪个版本。
有三种形式：
1. 版本号
使用`git log`可以查看到版本号
（不需要把整个版本号都输入，只输入前几位就行，Git会自动匹配）
2. HEAD^
HEAD ： 代表当前版本
HEAD^ : 代表上一版本
HEAD^^ : 代表上上一版本
...
3. HEAD~
HEAD~100 : 代表往上100个版本

使用以下命令进行回滚
```
git reset --hard HEAD^ # 回滚到上一个版本，注意跟*第二种*的区别，这里有参数`--hard`
```

#### 后悔回滚了怎么办？

```
git reflog # 查看命令历史，可以查看你执行过的操作
```

## 添加远程仓库

Git是分布式的，我们本地就有一个仓库，这样的好处之一是，我们在不联网的状态下，在本地对项目进行版本管理。
如果想与其他人共享代码，则通常需要一个远程仓库。

我们本地已有远程仓库，要添加本地仓库，可以使用以下命令：
```
git remote add origin 远程仓库地址
```
这里的`origin`是我们定义的远程仓库的名字，`origin`是Git对远程仓库的默认叫法，通常都使用这个名字，你也可以改成别的。

添加成功后，我们需要把本地仓库中的分支提交到远程仓库，并与远程仓库的分支关联。
```
git push -u origin master # 向远程仓库origin提交master分支，-u参数使本地的master分支与远程的master分支向关联
```

关联之后，只要使用以下命令即可把本地master分支的最新修改推送至远程仓库
```
git push origin master
```
## 分支

#### 创建分支

```
git checkout -b dev # 创建dev分支，并切换到dev分支
```
等价于
```
git branch dev      # 创建dev分支
git checkout dev    # 切换到dev分支
```

查看当前分支：
```
git branch
```

#### 合并分支

比如，要把dev分支的内容合并到master上
我们要先切换到master分支
```
git checkout master
```
然后进行合并，合并时要注意
Git默认会尽量采用Fast forward方式合并分支。
这种合并方式非常快，从代码角度来说，就是直接将master指针指向了dev分支的最新提交。
但这样就会存在一个问题，如果查看分支线就会发现，你只能看到master的线，而看不到dev的线。
而且在删除dev之后，dev的分支信息会删除。
这可能是你希望的，但如果你不希望这样，可以添加`--no-ff`命令强制关闭Fast forward。

注意到上边说的是**尽量**，如果merge过程中产生冲突，则不能进行Fast forward。这时需要你处理冲突后，在commit。
```
git merge dev # 将dev分支合并到当前分支，注意，merge成功后，会自动执行commit
```
如果不想使用Fast forward
```
git merge --no-ff -m 'commit log' dev
```

#### 删除分支

```
git branch -d dev # 删除dev分支
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

