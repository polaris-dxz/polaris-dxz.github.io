---
title: vps 部署 blog 的一些坑
tags:
---

## git 版本过低导致http 请求失败
这个情况还是比较常见的，原因就是 你的git 版本太低了。

```shell
git --version # git version 1.7.1
```
首先安装各种依赖，卸载 centOS 6.5 自带的 git 1.7.1 并更新至 2.1.2

```shell
# 安装各种依赖包，以及 toolchain
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install  gcc perl-ExtUtils-MakeMaker
# 卸载 git
yum remove git
# 下载 git 2.1.2
cd /usr/src
wget https://www.kernel.org/pub/software/scm/git/git-2.1.2.tar.gz --no-check-certificate
tar xzf git-2.1.2.tar.gz && cd git-2.1.2
make prefix=/usr/local/git all && make prefix=/usr/local/git install
echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
source /etc/bashrc
# 这时候你的 git 版本就应该是2.1.2了
git --version
```



