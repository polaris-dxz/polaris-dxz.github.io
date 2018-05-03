---
title: weak和 strong
date: 2014-05-20 10:53:58
tags: weak&strong
categories: iOS-Dev
thumbnail: https://i0.hdslb.com/bfs/vc/f5c4831af0acac49b5e45d974c2313a09aee5851.jpg
---

强引用和弱引用常考知识点和易错盲点。
<!-- more -->

@property中 weak 和 strong 的使用先看两段代码：

```objc
@interface ViewController ()

@property (nonatomic,strong)UIButton *button1;

@end

@implementation ViewController

-(UIButton *)button1{
    if (!_button1) {
_button1=[UIButton buttonWithType:UIButtonTypeCustom];
        _button1.frame=CGRectMake(50, 50, 100, 100);
        [_button1 setTitle:@"第一个" forState:UIControlStateNormal];
_button1.backgroundColor=[UIColor redColor];
    }
return _button1;

}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view addSubview:self.button1];
}

@end
```

```objc
@interface ViewController ()

@property (nonatomic,weak) UIButton *button2;

@end
  
@implementation ViewController

-(UIButton *)button2{ 
	
    UIButton *btn=[UIButton buttonWithType:UIButtonTypeCustom];
    btn.frame=CGRectMake(100, 100, 100, 100);
    [btn setTitle:@"第二个" forState:UIControlStateNormal];
    btn.backgroundColor=[UIColor yellowColor];
    return btn;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view addSubview:self.button2];
}

@end
```

@property：strong：视图被移除时，因为有强引用指向他，所以不再次释放一下，则引用计数就是1

@property：weak：从父视图移除时，这个 button 就直接释放了，因为是弱引用，所以不对引用计数造成影响（就像 assign）（xib 用 weak）

weak 的机制：weak 变量能够在引用计数为 0 时被自动设置成 nil，显然是有运行时逻辑在工作的。

