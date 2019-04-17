---
title: git 深入学习
date: 2013-04-24 17:07:16
categories: git&svn
tags: github
thumbnail: "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1515664615&di=e299224babfec2bfc85a87315fc28e89&src=http://a3.topitme.com/3/af/64/1128834126ba564af3o.jpg"
---

# （一）git深入学习



### 一、官方说明

##### start a working area (see also: git help tutorial)

- clone      Clone a repository into a new directory

  > 克隆一个 repo 到一个新的目录

- init       Create an empty Git repository or reinitialize（重置） an existing one

  > 创建一个空的 git repo 或者重置一个

  ​

##### work on the current change (see also: git help everyday)

- add        Add file contents to the index

  > add all
  >
  > ```
  > git add .
  > ```

- mv         Move or rename a file, a directory, or a symlink

- reset      Reset current HEAD to the specified state

  > 重置当前 HEAD 区到指定的状态

- rm         Remove files from the working tree and from the index

##### examine the history and state (see also: git help revisions)

- bisect     Use binary search to find the commit that introduced a bug

  > 使用二分法查找

- grep       Print lines matching a pattern

  > *grep* (global search regular expression(RE) and print out the line,全面搜索正则表达式并把行打印出来)

- log        Show commit logs

- show       Show various types of objects

- status     Show the working tree status

  > 显示当前工作树的状态

  ​

  ##### grow, mark and tweak your common history

- branch     List, create, or delete branches（分支）

- checkout   Switch branches or restore working tree files（检出）

- commit     Record changes to the repository（提交到版本库）

- diff       Show changes between commits, commit and working tree, etc

- merge      Join two or more development histories together（合并）

  > 多人开发

- rebase     Reapply commits on top of another base tip

- tag        Create, list, delete or verify a tag object signed with GPG

##### collaborate (see also: git help workflows)

- fetch      Download objects and refs from another repository

  > 从远程的分支获取最新版本到本地，不会自动 merge
  >
  > ```
  > #从远程的origin 的 master主分支下载最新的版本到 origin/master分支上 
  > git fetch origin master:tmp 
  >
  > #比较本地的 master 分支和 origin/master 分支的区别
  > git diff tmp 
  >
  > #合并
  > git merge tmp
  > ```
  >
  >  git fetch 相对比 git pull 安全些

- pull       Fetch from and integrate with another repository or a local branch

  > 从远程的分支获取最新的版本，并 merge 到本地
  >
  > ```
  > git pull origin master
  > ```
  >
  > **fetch + merge = pull**

- push       Update remote refs along with associated objects

### 二、其他用法

- remote 

  > ```
  > git remote    #列出已经存在的分支
  > ```
  >
  > ```
  > git remote -v #列出详细信息，每个名字后面加上地址
  > ```

### 三、具体步骤

```
$cd yourRepoDict
$git init 
$git add .
$git commit -m "xxxxx"
$git remote add origin https://github.com/Yggdrasill-7C9/blog.git
$git push -u origin master
```



# （二）git深入学习

## 一、常见概念

1、**Git 的核心是一个对象数据库。**所有提交的文件、目录、以及相关的元数据都被储存在该数据库中。

* Blob 对象：储存文件内容。
* Tree 对象：储存目录数据。

2、提交图：`git log --graph`

3、Git 主要有两个层面构成：

* 瓷质命令（porcelain command）
* 管道（plumbing）

4、快速合并：

* 有两个分支 a 和 b。其中 b 并未对内容做任何修改。所以合并 ab的时候，实际就是将指针指向了a	。
* 非快进操作：`--no-ff`：强制产生一次新的提交

a —— b —— c ——d \

​             \ ——————e



创建并切换新分支`git checkout -b newbranch`

强制切换新分支`git checkout --force newbranch` 

删除分支 `git branch -d nowbranch`

强制删除当前分支 `git branch -D nowbranch` 



## 二、储藏

希望在不提交的情况下修改当前版本的其他内容

### 1、git stash

git shash 可以将工作区和暂存区中修改 保存在***储藏栈（stash stack）**

### 2、git shash pop

回复栈顶的被储存修改到*工作区*中

### 3、git shash list

查看储藏的修改内容



## 三、

push

pull

merge

fetch

