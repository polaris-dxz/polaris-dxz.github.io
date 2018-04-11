---
title: ios知识脉络梳理
date: 2014-05-19 23:34:21
tags: 
categories: iOS开发
thumbnail: https://i0.hdslb.com/bfs/drawyoo/71c32ae66719b070ef7b565cc7e3c6237915e385.jpg
---

目录

[TOC]



## （一）、Foundation 相关知识点

### 一、内存管理的思考方式

#### 1、内存管理的原则：

* 自己生成的对象，自己持有

* 不是自己生成的对象，自己也能持有 （需要手动 retain）

  > ```objective-c
  > id obj = [NSMutableArray array]; // 取得对象的存在，但自己并不持有
  > [obj retain]; // 自己持有对象
  > ```

* 不是自己持有的对象，自己无法释放

* 不在需要自己持有的对象时，就要释放

| 对象操作  | OC 方法                          |
| ----- | ------------------------------ |
| 生成并持有 | +new/+alloc/-copy/-mutableCopy |
| 持有对象  | -retain                        |
| 释放对象  | - release                      |
| 废弃对象  | - dealloc                      |

#### 2、autorelease：（与 release 的区别）

* autorelease 可以取得对象的存在，但是自己不持有对象；
* autorelease 可以是对象在超出指定的生存空间时能够自动并正确的释放；
* autorelease 不是立即释放对象的，而是将该对象注册到 autoreleasepool 中，pool 结束时（drain）自动调用 release



#### 3、 所有权修饰符：（一共四种）

* `__weak`（__weak修饰的变量所引用的对象被废弃时，会将 nil 赋给该变量）

* `__strong`

* `__unsafe_unretained`

* `__autoreleasing`

  ​

#### 4、property声明的属性与所有权修饰符的对应关系

| property 声明中的属性                          | 所有权修饰符                 |
| ---------------------------------------- | ---------------------- |
| `assign`                                 | `__unsafe_unretained`  |
| ``unsafe_unretained`copy` | `__unsafe_unretained` |                        |
| `retain`                                 | `__strong`             |
| `strong`                                 | `__strong`             |
| `copy`                                   | `__strong`(赋值的是被复制的对象) |
| `weak`                                   | `__weak`               |

#### 5、objc使用什么机制管理对象内存？

> 通过 retainCount 的机制来决定对象是否需要释放。 每次 runloop 的时候，都会检查对象的 retainCount，如果retainCount 为 0，说明该对象没有地方需要继续使用了，可以释放掉了。

6、ARC通过什么方式帮助开发者管理内存？

7、不手动指定autoreleasepool的前提下，一个autorealese对象在什么时刻释放？（比如在一个vc的viewDidLoad中创建）

8、苹果是如何实现autoreleasepool的？

### 二、block 与内存管理

#### 1、使用block时什么情况会发生引用循环，如何解决？

#### 2、在block内如何修改block外部变量？

#### 3、使用系统的某些block api（如UIView的block版本写动画时），是否也考虑引用循环问题？

### 三、关于 Copy 的一些问题

#### 1、如何让自己的类用 copy 修饰符？

让自己的类用 copy 修饰符：

* 声明该类遵循 NSCopying 协议或者遵循 NSMutableCopying 协议
* 实现 -copyWithZone： 方法，该方法生成并持有该对象的副本。

#### 2、如何重写带关键字的 setter？

```objective-c
_obj = [obj copy]; // 返回一个该对象的副本
```

#### 3、用@property声明的NSString（或NSArray，NSDictionary）经常使用copy关键字，为什么？如果改用strong关键字，可能造成什么问题？



#### 4、深复制（内容复制）和浅复制（指针复制）

为了弄清这个概念，我们先来弄清楚在 集合与非集合类的 可变和不可变对象分别执行 copy 和 mutableCopy 操作。

```objective-c
/*
 * 1、无论是集合类和非集合类，只有不可变对象进行 copy 操作是浅复制，其他情况均是深复制，因为副本的结果是不
 *    可变的。其他情况副本的结果是可变的。
 * 
 * 2、集合对象的内容复制仅局限于本身，对于元素来说，仍然是指针复制（浅复制）。所以，集合对象的深复制是单层
 *    深复制。
 */

[immutableObject copy] // 浅复制
[immutableObject mutableCopy] //深复制 (对集合类来说，是单层深复制)
[mutableObject copy] //深复制 (对集合类来说，是单层深复制)
[mutableObject mutableCopy] //深复制 (对集合类来说，是单层深复制)
```

> 关于叫复制还是叫拷贝，我觉得叫复制更为准确些，这个过程有点像 OSX 复制一个文件的副本的感觉
>
> [1]: https://www.zybuluo.com/MicroCai/note/50592	"iOS 集合的深复制与浅复制"



### 四、关于@property

#### 1、 @property中有哪些属性关键字？/ @property 后面可以有哪些修饰符？

* 原子性：nonatomic、atomic （默认是 atomic）（atomic 需要消耗大量内存资源，故ios 不推荐使用）
* 读写：readonly、readwrite （默认是readwrite）
* 内存管理：strong、weak、assign、copy、unsafe_unretained（默认是 strong 或assign）
* 重命名方法名：
  * ~~setter=<#name#>~~不常用，也不推荐使用
  * getter=<#name#>

#### 2、 @protocol 和 category 中如何使用 @property

* 在 protocol 中使用 property 只会生成 setter 和 getter 方法声明,我们使用属性的目的,是希望遵守我协议的对象能实现该属性
* category 使用 @property 也是只会生成 setter 和 getter 方法的声明,如果我们真的需要给 category 增加属性的实现,需要借助于运行时的两个函数：
  * `objc_setAssociatedObject`
  * `objc_getAssociatedObject`

#### 3、weak属性需要在dealloc中置nil么？

不需要。ARC 下无论是 strong 还是 weak 都不需要置nil，ARC 会自动帮我们做这件事情。

#### 4、@synthesize和@dynamic分别有什么作用？

一般情况下：成员变量 +  @synthesize = @property

>1. @property有两个对应的词，一个是 @synthesize，一个是 @dynamic。如果 @synthesize和 @dynamic都没写，那么默认的就是`@syntheszie var = _var;`
>2. @synthesize 的语义是如果你没有手动实现 setter 方法和 getter 方法，那么编译器会自动为你加上这两个方法。
>3. @dynamic 告诉编译器：属性的 setter 与 getter 方法由用户自己实现，不自动生成。（当然对于 readonly 的属性只需提供 getter 即可）。假如一个属性被声明为 @dynamic var，然后你没有提供 @setter方法和 @getter 方法，编译的时候没问题，但是当程序运行到 `instance.var = someVar`，由于缺 setter 方法会导致程序崩溃；或者当运行到 `someVar = var` 时，由于缺 getter 方法同样会导致崩溃。编译时没问题，运行时才执行相应的方法，这就是所谓的动态绑定。



#### 5、什么情况需要@synthesize

* **同时重写了 setter 和 getter 时**（这种情况访问下划线变量会报错）
* 重写了*只读属性的 getter* 时
* 使用了 @dynamic 时
* 在 @protocol 中定义的所有属性
* 在 category 中定义的所有属性
* 重载的属性

#### 6、IBOutlet连出来的视图属性为什么可以被设置成weak?



### 五、关于运行时 Runtime

Objective-C 是一门动态语言，主要就体现在Runtime 上。

#### 1、向对象发送一个消息和` objc_sendMessage(receiver, SEL：MethodID) `函数有什么关系？

> [obj foo];在objc编译时，会被转意为：`objc_msgSend(obj, @selector(foo));`。



#### 2、什么时候会报unrecognized（未被承认的） selector的异常？



#### 3、一个objc对象的isa的指针指向什么？有什么作用？

指向该对象的类对象。

> @interface Chinese : People
>
> Chinese isa People



#### 4、super 和 self 有什么区别？

> super的本质是一个编译器标示符，和 self 是指向的同一个消息接受者！他们两个的不同点在于：super 会告诉编译器，调用 class 这个方法时，要去父类的方法，而不是本类里的。

super：先找父类的方法，没有在找子类；

self：先从当前类的列表里开始找，如果没有在去父类那找。



#### 5、 runtime如何通过selector找到对应的IMP地址？（分别考虑类方法和实例方法）

> 每一个类对象中都一个方法列表,方法列表中记录着方法的名称,方法实现,以及参数类型,其实selector本质就是方法名称,通过这个方法名称就可以在方法列表中找到对应的方法实现。

```objective-c
IMP methodIMP = [self methodForSelector:@selector(foo:)];
methodIMP(); // 所以 IMP 实际上是一个指针，此处 IMP 应该是Implementation的缩写
```



#### 6、objc中的类方法和实例方法有什么本质区别和联系？

> 类方法：
>
> 1. 类方法是属于类对象的
> 2. 类方法只能通过类对象调用
> 3. 类方法中的self是类对象
> 4. 类方法可以调用其他的类方法
> 5. 类方法中不能访问成员变量
> 6. 类方法中不能直接调用对象方法
>
> 实例方法：
>
> 1. 实例方法是属于实例对象的
> 2. 实例方法只能通过实例对象调用
> 3. 实例方法中的self是实例对象
> 4. 实例方法中可以访问成员变量
> 5. 实例方法中直接调用实例方法
> 6. 实例方法中也可以调用类方法(通过类名

#### 7、`_objc_msgForward`函数是做什么的，直接调用它将会发生什么？

#### 8、 runtime如何实现weak变量的自动置nil？

#### 9、能否向编译后得到的类中增加实例变量？能否向运行时创建的类中添加实例变量？为什么？

#### 10、 IB中User Defined Runtime Attributes如何使用？





### 六、RunLoop 和多线程

#### 1、runloop和线程有什么关系？

#### 2、runloop的mode作用是什么？

#### 3、 以+ scheduledTimerWithTimeInterval...的方式触发的timer，在滑动页面上的列表时，timer会暂定回调，为什么？如何解决？

#### 4、猜想runloop内部是如何实现的？

#### 5、如何用GCD同步若干个异步调用？（如根据若干个url异步加载多张图片，然后在都下载完成后合成一张整图）

#### 6、`dispatch_barrier_async`的作用是什么？

#### 7、苹果为什么要废弃`dispatch_get_current_queue`？

因为容易造成死锁

#### 8、多线程原子性与非原子性、自旋锁与互斥锁的问题

[1]: http://blog.csdn.net/yi_zz32/article/details/49952727	"多线程——原子、非原子，自旋锁和互斥锁"
[2]: http://blog.csdn.net/cg_lueng/article/details/50971465	"多线程：原子性与非原子性"



### 七、KVO、单例、代理

#### 1、addObserver:forKeyPath:options:context:各个参数的作用分别是什么，observer中需要实现哪个方法才能获得KVO回调？

#### 2、如何手动触发一个value的KVO

#### 3、 KVC的keyPath中的集合运算符如何使用？

#### 4、 KVC和KVO的keyPath一定是属性么？

#### 5、何关闭默认的KVO的默认实现，并进入自定义的KVO实现？

#### 6、apple用什么方式实现对一个对象的KVO？



### 八、调试与 LLDB

#### 1、如何调试BAD_ACCESS错误

#### 2、 lldb（gdb）常用的调试命令？

#### 3、BAD_ACCESS在什么情况下出现？



### 九、基础知识

#### 1、iOS中self.和下划线的区别？

[参考链接](https://www.jianshu.com/p/4295cd39604e?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

#### 2、懒加载与单例模式的区别？

懒加载是重写的 get 方法，懒加载也称延迟加载，即在使用的时候才加载，不用在 viewDidLoad 里就全部分配内存，保证了用的时候在分配内存

单例模式指的是某个类的对象是系统的唯一实例。



