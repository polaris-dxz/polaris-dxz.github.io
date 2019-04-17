---
title: 图解HTTP读书笔记
tags:
---
## 第一章
### OSI 七层协议与 TCP/IP 四层协议

* OSI 七层：应表会传网数物
* TCP/IP 四层：
  * 应用层：（HTTP 数据 ： HTTP 报文）
  * 传输层：（TCP/UDP 首部:TCP/UDP 报头）
  * 网络层：网络层用来处理在网络上流动的数据包。数据包是该层传输的最小单位。（IP 首部：IP 报头）
  * 链路层：用来处理连接网络硬件部分（以太网首部：以太网帧）
  
发送端：每通过一层则加一个首部（封装）
接收端：每通过一层则删一个首部。

知识碎片：
ARP 协议：使用 ARP 协议 凭借 MAC 地址进行通讯。（可以通过通讯方的 IP 地址反查其MAC 地址）。

为了确保准确无误的传输数据，TCP 采用了3次握手传输策略。握手的过程中采用了flag，SYN（synchronize同步） 和 ACK（acknowledgement确认收信）
![Snip20180511_2](http://p8e50ub7d.bkt.clouddn.com/Snip20180511_2.png)


$h(x) = \theta_0 + \theta_1 x$

$$
x^\prime
$$

