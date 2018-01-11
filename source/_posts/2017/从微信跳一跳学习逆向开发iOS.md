---
title: 从微信跳一跳学习逆向开发iOS
date: 2018-01-09 17:05:40
categories: 
- iOS开发
- 逆向开发	
tags: 随笔
thumbnail: https://i.pximg.net/c/600x600/img-master/img/2018/01/07/13/52/00/66686682_p0_master1200.jpg
---

# 从微信跳一跳学习逆向开发 iOS

### 一、libimobiledevice与 adb

libimobiledevice：逆向出 iOS 与 Mac Windows 接口的通讯协议

adb：安卓下调试工具



### 二、安装libimobiledevice

```
$ brew update
$ brew install libimobiledevice
#libimobiledevice中并不包含ipa的安装命令，所以还需要安装
$ brew install ideviceinstaller
```



