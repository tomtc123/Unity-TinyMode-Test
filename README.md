# Unity-TinyMode-Test

## 环境
Unity 2018.3.0f2 Personal

Tiny Mode 0.13.4 preview

## 注意
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

3.LayerSorting需要加SortingGroup才起作用  

4.ut.Core2D.TransformService  
```
/** Computes a new local matrix of the kind produced in the TransformLocal
      component.
      This function does not use TransformLocal, and can be quite resource
      intensive. Use it only if the cached result in TransformLocal is not available.*/
  static computeLocalMatrix(world: ut.WorldBase, node: Entity): Matrix4x4;
  /** Computes a new Object to World matrix of the kind produced in the TransformObjectToWorld
      component. This function does not use TransformObjectToWorld, and can be quite
      resource intensive. Use it only if the cached result in TransformLocal
      is not available.*/
  static computeWorldMatrix(world: ut.WorldBase, node: Entity): Matrix4x4;
  /** Computes a transform node's world position.
      This function uses the computeWorldMatrix function to compute the world
      matrix (bypassing caching), and returns the position of that.
      
      This function can be quite resource intensive. When possible, read the
      TransformObjectToWorld component instead.*/
  static computeWorldPosition(world: ut.WorldBase, node: Entity): Vector3;
  /** Computes a transform node's world rotation.
      This function uses the computeWorldMatrix function to compute the world
      matrix (bypassing caching), and returns the rotation of that.
      
      This function can be quite resource intensive. When possible, read the
      TransformObjectToWorld component instead.*/
  static computeWorldRotation(world: ut.WorldBase, node: Entity): Quaternion;
```
