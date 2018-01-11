---
title: github 使用手册
date: 2018-01-09 17:07:16
categories: github
tags: github
thumbnail: /source/_posts/github 使用手册/thum.jpg
---

# github 使用手册

### 官方说明

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

- branch     List, create, or delete branches

- checkout   Switch branches or restore working tree files

- commit     Record changes to the repository

- diff       Show changes between commits, commit and working tree, etc

- merge      Join two or more development histories together

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
  > ​

- push       Update remote refs along with associated objects

### 其他用法

- remote 

  > ```
  > git remote    #列出已经存在的分支
  > ```
  >
  > ```
  > git remote -v #列出详细信息，每个名字后面加上地址
  > ```

### 具体步骤

```
$cd yourRepoDict
$git init 
$git add .
$git commit -m "xxxxx"
$git remote add origin https://github.com/Yggdrasill-7C9/blog.git
$git push -u origin master
```





