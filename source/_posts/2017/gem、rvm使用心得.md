---
title: gem、rvm使用心得
date: 2018-01-09 17:06:37
categories: linux
tags:
- gem
- rvm
thumbnail: thum.jpg
---

# gem,rvm使用心得

##### rvm 和 gem 的关系

- rvm 全称是 Ruby Version Manager，即Ruby 版本管理器。
- gem，即RubyGems，是一个用于对 Ruby 组件进行打包 Ruby 的打包系统，可以从远程服务器下载并安装 Rails。

> [Ruby](https://baike.baidu.com/item/Ruby) on Rails 是一个用于开发数据库驱动的网络应用程序的完整框架。Rails基于[MVC](https://baike.baidu.com/item/MVC)（模型- 视图- 控制器）设计模式。从视图中的[Ajax](https://baike.baidu.com/item/Ajax)应用，到控制器中的访问请求和反馈，到封装数据库的模型，Rails 为你提供一个纯Ruby的开发环境。发布网站时，你只需要一个数据库和一个网络服务器即可。
>
> Ruby On Rails是一个用于编写网络应用程序的软件包.它基于一种计算机软件语言Ruby,给程序开发人员提供了强大的框架支持.你可以用比以前少的多的代码和 短的多的时间编写出一流的网络软件。



**查看gem 源**：

```
$ gem source
```

|      |                     |      |
| ---- | ------------------- | ---- |
| -a   | --add SOURCE_URI    | 添加源  |
| -l   | --list              | 列表   |
| -r   | --remove SOURCE_URI | 删除   |
| -c   | --clear-all         | 清除所有 |
| -u   | --update            | 更新   |

```
$ gem sources -r http://rubygems.org/ #删除默认的源

$ gem sources -a https://ruby.taobao.org #添加淘宝源
```



- Mac OSX 必须要安装的库

  ```
  $ brew install libxml2 libxslt libiconv
  ```

- 载入 RVM 环境

  ```
  $ source ~/.rvm/scripts/rvm
  ```

- 用 RVM 安装 ruby 环境

  ```
  $ rvm requirements
  $ rvm install 2.3.0
  ```

- 安装 Bundler

  ```
  $ gem install bundler
  ```

- 安装 Rails 环境

  ```
  $ gem install rails
  ```

- homebrew 安装 ruby

  ```
  $ brew install ruby
  ```

- RVM 安装

  ```
  $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
  $ \curl -sSL https://get.rvm.io | bash -s stable
  $ source ~/.bashrc
  $ source ~/.bash_profile
  ```

- 列出以及 ruby 版本

  ```
  $ rvm list known
  ```

- 切换 ruby 版本

  ```
  $ rvm use 2.2.0
  ```

  ​

- 修改 RVM 下载 Ruby 的源，到 Ruby China 的镜像:

  ```
  $ echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db
  ```

  ​

  [1]: https://ruby-china.org/wiki/rvm-guide	"ruby wiki"
  [2]: https://www.ruby-toolbox.com/	"热门的 Gem"

  ​