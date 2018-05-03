---
title: Http - Web 基础概述
date: 2013-05-13 16:58:34
tags: 
- Http 报文
- URL
categories: Http
thumbnail: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515845822875&di=5c5ed7e816115333fa10af3a5d2e12dd&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201708%2F02%2F162015g8shss8wbwb8w193.jpg"
---

唔。。。我真的是太菜了
<!-- more -->
[TOC]

# 一、HTTP报文

![](https://images0.cnblogs.com/blog2015/776887/201507/241034588189239.png)

Http 报文分为请求报文（request）和响应报文（response），主要分三部分：

- ## 1、起始行

  - 请求行：**包含了一个方法和 URL（路径） 以及 HTTP 版本**

  - 响应行：包含了 HTTP 版本，状态码和原因短语

  - 方法：

    > 分为常用的7种 HTTP 方法和对 HTTP 规范的扩展方法。

  - 状态码：

    > 状态码位于响应的起始行中；
    >
    > 状态码数在每条响应报文的起始行中返回的；

  - 原因短语：

    > 通常与状态码成对出现，如200 OK（描述操作状态的、文本的形式的原因短语）

  - 版本号：

    > **注意，版本号不会被当做小数处理，2.22要比2.3要大** 

- ## 2、首部（请求头、响应头、head）

  - 通用首部
  - 请求首部
    - Accept 首部
    - 条件请求首部
    - 安全请求首部
    - 代理请求首部
  - 响应首部
    - 协商首部
    - 安全响应首部
  - 实体首部
    - 内容首部（Content）
    - 实体缓存首部

- ## 3、主体（请求体、响应体、body）

![响应报文首部](响应报文首部.png)

# 二、URL 

##1、URL 语法

<scheme>://<user>:<password>@<host>:<port>/<path>;<params1>;<params2>?<query>&<query2>#<flag>

方案://用户名:密码@主机:端口/路径;参数1;参数2？查询字符串#片段

> URI方案：http（80）、ftp（21）、https（443）、mailto、rtsp、rtmp（1935）、file、telnet（23）、ssh（22），以上为常用的，远不止这些

> rtsp：Real Time Streaming Protocol：实时流传输协议
>
> rtmp：Real Time Message Protocol ：实时信息传输协议

## 2、一些常见的概念

### （1） URI 

URI（统一资源标识符）

* URL（统一资源定位符）
* URN（统一资源名）

### （1）RFC

​         Request For Comments（RFC），是一系列以编号排定的文件。说白了就是 Internet标准定制文件。

​        一个RFC文件在成为官方标准前一般至少要经历4个阶段【RFC2026】：因特网草案、建议标准、草案标准、因特网标准。

### （3）事物

一个 HTTP 事物有一条请求命令和一条响应结果组成。

事物 = 请求 + 响应

### （4）TCP

TCP：传输控制协议，是把东西从一个地方传到另一个地方用的。***转发 HTTP 报文***。

TCP 客户端与服务器是通过套接字（socket）通信的。

HTTP 是**应用**层的，TCP 是**传输**层的。一个侧重应用，一个侧重传输。

作用：

* 无差错的数据传输
* 按序传输（数据总是按照发送的顺序到达目的地）
* 未分段的数据流（可以在任意时刻以任意尺寸发送数据）（尺寸就是 Content-Length）

### （5）隧道（tunnel）

定义：对 HTTP 报文进行**盲转**发的特殊代理。（ 之所以敢盲转还是不因为加了一层 SSL）

### （6）SSL

SSL（安全套接字层，）在 HTTPS 网络协议栈同 TSL 一样，属于安全层

![](https://upload-images.jianshu.io/upload_images/3588755-cca8c7cf776db6ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/644)

### （7）代理与 Agent 代理

这俩货其实不一样，前者指 proxy，用于在客户端和服务器之间转发流量；

后者是代表用户发起 HTTP 请求的客户端程序。（就是 web 机器人、爬虫）。

### （8）报文流

不管报文是从客户端流入服务器，还是从服务器流入客户端，所有的报文都是像河水一样，**下游**流动。

HTTP 使用流入和流出描述***事务处理***的方向。

客服端\

​           服务器

客户端/

# 三、连接管理

###1、OSI 七层协议和 TCP/IP 五层网络协议

总结为一句话：应表会、传网数物（五层协议中应表会为一层）。

###2、TCP 协议中的三次握手

总结为一句话：“船~来~了！船~来~了~吗？船~来~了。”之后服务器把船开往客服端。

![](http://img.blog.csdn.net/20170104214009596?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2h1c2xlaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### 3、TCP 慢启动（slow shtar）

TCP 会通过时间进行自我调谐。开始会限制连接的最大速度，如果数据传输成功，再慢慢提速。这种调谐被称为 TCP 慢启动。

>  新建了一座桥。汽车为了试试这个桥能不能走，先慢慢开过去，如果发现没问题，其他汽车再提速过去。



在提速的过程中，有个概念叫***打开拥塞窗口***。

> 有一个车队要过一座桥。一开始先派一辆车过去，确认没事的话派两个车试试，如果还没事的话派四辆车过去，这个过程就叫打开拥塞窗口。

