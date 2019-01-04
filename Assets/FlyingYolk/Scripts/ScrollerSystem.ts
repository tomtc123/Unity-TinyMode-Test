namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    @ut.requiredComponents(ut.Core2D.TransformLocalPosition, game.Scroller)
    export class ScrollerSystem extends ut.ComponentSystem {
        
        OnUpdate(): void {
            let gameConfig = game.GameService.getGameConfig(this.world);
            this.world.forEach([ut.Core2D.TransformLocalPosition, game.Scroller],
                (transform, scroller) => {
                    let p = transform.position;
                    p.x -= gameConfig.currentScrollSpeed;
                    transform.position = p;
                });
        }
    }
}