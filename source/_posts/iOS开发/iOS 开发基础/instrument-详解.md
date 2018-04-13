---
title: instrument 详解
date: 2014-05-15 23:26:11
tags: instrument
categories: iOS开发
thumbnail: https://i0.hdslb.com/bfs/drawyoo/08a8f9111655a8a0c2f1dd05ea4f5291692fb08c.jpg
---

[TOC]

![](instrument.png)

## 一、Blank



## 二、Activity Monitor（活动监视器）



## 三、Allocations（内存分配）

![](https://upload-images.jianshu.io/upload_images/325854-060ac29a8dbf6c9c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)


### 1、程序员对内存关注的点

* 正确使用

  * 避免非法访问

    > 即避免访问被释放掉的内存。release 后不能再 retain。

  * 避免内存泄漏

* 高效使用

  * 降低内存峰值
  * 处理内存警告
  * Cache

### 2、Regions（区域）

以下内容参考自 [Stack Overflow](https://stackoverflow.com/questions/13437365/what-is-resident-and-dirty-memory-of-ios!)

视频链接：[iOS内存管理及优化](https://www.imooc.com/video/11075)

* Clean Memory：在闪存中有备份，能够再次读取。主要包括`system framework`、`binary executable of your app`、`memory mapped files`
* Dirty Memory：所有非`Clean Memory`，**系统无法回收**。包括`Heap allocation`、`caches`、`decompressed images`（解压的图片）

### 3、虚拟内存之间的关系

* 虚拟内存层面：（逻辑内存）

  >  virtual memory = clean memory + dirty memory.

* 物理内存层面：

  > resident memory= dirty memory+clean memory that loaded in physical memory

* 总结：

  > virtual memory == (clean memory + dirty memory) > resident memory >dirty memory

```objective-c
// clean memory
- (IBAction)clickAction1{
  char *buf = malloc(100*1024*1024); //100M 虚拟内存
  NSLog(@"%p",buf);
}

// dirty memory
- (IBAction)clickAction2{
  char *buf = malloc(100*1024*1024); //100M 虚拟内存
  NSLog(@"%p",buf);
  for(int i=0; i < 3*1024*1024; ++i){ //分配3M 物理内存，剩余97M 虚拟内存
    buf[i] = rand();
  }
}

- (void)cleanOrDirtyMemory{
  
  	NSString* str1 = [NSString stringWithString:@"dirty"];//dirty memory(堆上分配的内存都是 dirty的，不回收的话系统都会占用这个内存)
    NSString* str2 = @"w";//存在只读数据段里面 
    char *buf = malloc(100*1024*1024); //100M 虚拟内存 (clean，因为我们没有访问到)
    for(int i=0; i < 3*1024*1024; ++i){ //分配3M 物理内存（dirty），剩余97M 虚拟内存(clean)
    buf[i] = rand();//dirty
  }
}
```



### 4、VMTracker：

> ```
> 官方解释：Adds the Allocations and VM Tracker instruments toyour document. Use this template to monitor memory and object-allocationpatterns in your program 
> ```

* Dirty Size：
* Swapped Size：
* Resident Size：

### 5、参数：

* 图形列（Graph）：

  > 当指定类别的复选框被勾选时,instrument工具在跟踪面板里面显示特定类别的图形。 Instruments 应用通常给每个图形类别赋一个颜色。

* 类别(Category)：

  > 通常是一个 Core Foundation 对象、Objective-C 类、或者 malloc 出来的内存空间。

* 净分配字节数(Persistent Bytes)：

  > 当前已经分配内存但是仍然没有被释放的字节的总数。

* 净分配数(#Persistent)：

  > 当前已经分配内存但仍然没有被释放的对象或内存块的数量。

* 临时分配数(#Transient)：

  > 当前已经分配内存但仍然没有被释放的对象或内存块的数量。

* 总分配字节数(Total Bytes)：

  > 所有已经分配内存,而且包括已经被释放了的字节的总数。

* 总分配数(#Total)：

  > 所有当前已经分配内存,包括已经被释放了的对象或内存 块的总数。

* 临时分配/全部内存分配(Transient/Total Bytes)：

  > 当前和全部分配数的直方图。如上图所示当比例变化时,直方条会变颜色，Instruments 应用通常给它们标示不同的颜色来指出分配模式以便进行进一步的研究。

## 四、Cocoa Layout

## 五、Core Animation

## 六、Core Data

## 七、Counters（计数器）

## 八、Energy Log

## 九、File Activity

## 十、Leaks（内存泄漏）

## 十一、Metal System Trace

## 十二、Network

## 十三、SceneKit

## 十四、System Trace（系统跟踪）

## 十五、System Usage

 ios 模拟器暂不支持

## 十六、Time profiler

## 十七、Zombies（僵尸）



