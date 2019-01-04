/// <reference path="ScrollerSystem.ts" />

namespace game {
    
    @ut.executeAfter(game.ScrollerSystem)
    @ut.requiredComponents(ut.Core2D.TransformLocalPosition, game.RepeatingBackground)
    export class RepeatingBackgroundSystem extends ut.ComponentSystem {
     
        OnUpdate(): void {
            this.world.forEach([ut.Core2D.TransformLocalPosition, game.RepeatingBackground],
                (transform, background)=> {
                    let p = transform.position;
                    if (p.x < background.threshold) {
                        p.x += background.distance;
                    }
                    transform.position = p;
                });
        }
    }
}