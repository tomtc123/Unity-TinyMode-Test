# Unity-TinyMode-Test

##环境
Unity 2018.3.0f2 Personal
Tiny Mode 0.13.4 preview

##注意
1.Tweens没有正常工作是因为Project.Modules没有包含‘Tweens’模块
```
ut.Tweens.TweenService.addTween(world,
                player,
                ut.Core2D.TransformLocalPosition.position.y,
                transform.position.y, transform.position.y + .1,
                0.4,
                0,
                ut.Core2D.LoopMode.PingPong,
                ut.Tweens.TweenFunc.InOutQuad,
                false);
```

2.Component\Configuration是不一样的类型  
其中Configuration在project-Configurations可编辑
