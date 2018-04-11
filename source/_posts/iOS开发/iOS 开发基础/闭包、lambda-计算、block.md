---
title: ' 闭包、lambda 计算、block'
date: 2014-05-15 15:07:23
tags:
categories: iOS开发
thumbnail: "https://i0.hdslb.com/bfs/vc/493788433bf17760555a4881fcfbf2c24fbec23e.jpg"
---

# block

导读：

* 什么是 block？
* block 基本原理是什么？
* 使用 block 需要避免哪些问题？



##1、什么是 block

###（1）Block

block 概念：block是带有**自动变量值**的**匿名函数**。也称为闭包（closure）、lambda 计算。

C语言的标注不允许存在这样的函数，但是可以通过函数指针来直接调用函数。

```c 
// 声明一个函数
int func(int count);      

// 声明一个函数指针，并取出 func 的地址赋给 *funcP
int (*funcP)(int count) = &func;   //注：函数形参可有可无，视情况而定

// 通过函数名访问这个函数
int result1 = func(10);   

// 通过函数的指针访问这个函数
int result2 = (*funcP)(10);
```



### （2）函数指针的用途：

函数指针的用途有两个：

* 调用函数
* 作为函数的参数

>```c++
>Class* a; // a 是个对象，类型是指针
>Class *a; // a 是个指针，类型是类
>
>/* 
> *  虽然上述写法均表示声明一个指针型变量，但是着重点不同。
> *  前者意在声明一个变量，后者意在声明一个指针。
> *  这种自行体会就好，不要拘泥于写法。
> */
>```



### （3）悬浮指针的出现及避免

声明一个指针需要注意的问题：

* 避免出现**悬浮指针**（也称迷途指针、失控指针）

悬浮指针的出现：dealloc 一个指针后，没有把指针置空（nil）。

*如果再次调用该指针并没有重新赋值，就会出现问题*。

> 注意：空指针 ！= 迷途指针。空指针指向的地址为空。

> 指针的指针即本身



### （4）函数中可能使用的变量：

* 函数的参数

* 局部变量（自动变量）

* 静态变量（静态局部变量）

* 全局变量

* 静态全局变量

  > 使用全局变量会占用更多的内存（因为其生命期长），不过在计算机配置很高的今天，这个不应该算什么问题，除非使用的是巨大对象的全局变量，能避免就一定要避免。



### （5）OC 中函数和方法的区别

函数和对象无关，方法和对象有关。最主要的是，函数和方法写法不一样啊！

> 函数是指把一个值通过一系列计算得到一个新的值。
>
> 而方法更多考虑的是事情。如让一个人通过一系列动作制造一个新的东西。



### （6）为什么 Block 可以作为函数参数和返回值？

函数的参数和返回值可以是 void、int，也可以是一个类对象，当然也可以是指针（int* char*）。而 block 为什么可以作为函数的参数甚至是返回值呢？

**因为block的本质是 OC 对象。**（OC 的 层面）

block的实质是**栈**上 block 的结构体实例。（C 的层面）这里也可以理解为是一个函数指针。

> ```objective-c
> typedef int(^blk_t)(int); // 声明一个参数为 int 型、返回值为 int 型的 blk_t类型
> blk_t blk = ^(int count){return count+1;};// 声明一个 blk 变量
> int (^blk)(int) = ^(int count){return count+1;};// 等价于第二行
>
> blk_t *blkptr = &blk;// 声明一个名为 blkptr 的 blk_t型的指针，并指向 blk 的地址。
>
> (*blkptr)(10); // 利用指针调用这个 blk
> blk(10); // 直接调用这个 blk
> ```



### （7）__block 说明符

引入`__block`的目的是用来声明变量的作用域的，意思就是 block 外用`__block`声明的变量，block 内也能访问到。虽然这货和全局变量有些类似，但是老机器全局变量用多了会导致浪费内存啊！（因为全局变量生命周期比较长）。

吐槽：乖乖用__block吧，特大的对象做全局变量的时候，也是会出现问题的。



### （8）block 的实质

block的实质是**栈**上 block 的结构体实例。（吐槽，说白了就是通过指针访问的）

（写一个代码用 clang rewrite 一下就明白了，因为有 Foundation 框架，一个5行的代码能重写成将近10万行。。不过核心代码在最后几行，翻到最后看就可以了）

> 重写代码的时候会发现有三个结构体，一个是`__block_imp1 `另一个是`__main_block_imp1_0`还有一个是`__main_block_desc_0`
>
> 这里面引申一个概念就是 IMP 和SEL，具体以后再分析(runtime)，知道SEL 表示（选择器） IMP 表示*函数指针*就可以了。



`__block`的实质是栈上`__block`变量的结构体实例。

```objective-c
// block的实质结构
typedef objc_class *Class; //Class 为 objc_class 结构体的指针类型

typedef struct objc_object{
  Class isa;
} *id; //id为 objc_objec 结构体的指针类型
```



将 block源码转换为 C++源码：`clang -rewrite-objc filename`

| __block变量的配置存储域 | Block 从栈复制到堆是的影响  |
| --------------- | ----------------- |
| 栈（stack）        | 从栈复制到堆并被 Block 持有 |
| 堆（heap/maclloc） | 被 Block 持有        |

栈上的 block ：变量作用域结束时，栈上的 __block变量和 block 被废弃

堆上的 block：变量作用域结束时不受影响，需要手动释放。 



## block 循环引用的问题

如果在 Block 中使用__strong修饰的对象和变量，那么当 Block 从栈复制到堆上的时候，该对象就会被 Block所持有。这样就会引起循环引用。

> 循环引用这里有个重点，Block 是存储在栈上的，普通对象和变量是存储在堆上的。堆（malloc）上的内存需要我们手动管理（需要 dealloc），而栈上的内存顾名思义是按照数据结构中栈的方式管理，即由系统进行分配。



**对象持有 block => block持有 self => self 持有对象，即形成循环引用。**（这里的 self 也包含当前类的其他属性，因为在调用属性的同时也截获了 self）。

> 编译器能查出循环引用。

## copy release

ARC 无效的时候，我们需要手动将 Block 从栈复制到堆。

因为 ARC 无效，所以需要我们手动释放复制的 Block。

这个时候我们用 copy 方法来复制，release 方法来释放。

```objective-c
void (^block_on_heap)(void) = [block_on_stack copy];//正常复制

[block_on_heap release];//正常释放

[block_on_heap retain]; // 因为block 在堆上，所以可以被 retain

[block_on_stack retain];// 因为现在 block 在栈上，所以这个方法没用
```



> ARC 是苹果公司在iOS 5 以后推出的内存管理机制。。iOS 5以前是手动管理的。。如果还问我 ARC 的话，那我基本不考虑你们公司了。。。。



## __block的作用

ARC 无效__block用来避免 Block 中出现的循环引用。

栈——>堆时：__block修饰的变量不会被 retain。没用它修饰的就会被 retain。



## ARC

| 对象操作    | OC 方法                          |
| ------- | ------------------------------ |
| 生成并持有对象 | + alloc、+ new、copy、mutableCopy |
| 持有对象    | - retain                       |
| 释放对象    | - release                      |
| 废弃对象    | - dealloc                      |



## `__strong` 和 `__weak`

__strong：表示对对象的强引用。即在超出其作用域被废弃时，随着强引用的释放，引用的对象也会被释放。



## 内存泄露

循环引用容易导致内存泄露。内存泄露就是应当废弃的对象在超出其生存周期后继续存在。