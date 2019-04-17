---
title: 浅谈 iOS 系统下的物理内存与虚拟内存
tags:
---

之前看慕课网的视频：《[iOS 内存管理及优化](https://www.imooc.com/video/11075)》发现自己理解的并不深刻，写篇文章浅谈一下到底什么是物理内存和虚拟内存，并记录下自己的体会。
<!-- more -->

首先第一个问题，什么是物理内存和虚拟内存。

1.物理内存：
> wiki中给的解释是，物理内存是指由于安装内存条而获得的临时储存空间。即我们平时说的 RAM。

2.虚拟内存：
> 虚拟内存是计算机系统内存管理的一种技术。其实从字面上，我们可以理解为用磁盘空间来扩展物理内存。（严格的说，并不只是利用磁盘空间来扩展内存空间，具体这部分内容大三的《操作系统》说的很细，有必要的话可以复习下）。

了解了这些概念后，我们在来说一说 iOS 系统中的虚拟内存（virtual memory）。

先引用我另一篇文章里关于物理内存的概念。

```c
// resident memory = dirty memory+clean memory that loaded in physical memory
// clean memory
char *buf = malloc(100*1024*1024)

// dirty memory
for(int i=0; i < 3*1024*1024; ++i){
    buf[i] = rand()
}
``` 
iOS系统下，虚拟内存是指将物理内存地址，针对每个进程，映射到不同的虚拟内存地址上。于是在一个物理并不够大的设备上，32 位的进程也能使用 4 GB 的虚拟内存地址，64 位的进程能使用 18 EB 的虚拟内存地址。但在同一时间真正能使用内存量，仍然是设备的物理内存大小，虚拟内存并不会改变这个物理限制。

windows 下指的是交换文件，即当进程使用的内存超过物理内存大小时，操作系统会将一部分暂时用不到的内存写入磁盘的交换文件，以腾出空间；当需要用到时，又会将交换文件中所需的部分读取到物理内存中。

这里需要注意，OS X是可以使用交换文件的，iOS不行。

最后，是时候拿出[官方文档](https://developer.apple.com/library/content/documentation/Performance/Conceptual/ManagingMemory/Articles/AboutMemory.html)祭天了~

其实到发文时间为止，app 卡顿跟虚拟内存已经没啥太大关系了，开发者应该把更多精力放在 layer 上面。




 



