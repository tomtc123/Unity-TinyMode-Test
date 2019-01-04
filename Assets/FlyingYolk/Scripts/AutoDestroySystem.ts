namespace game {

    export class AutoDestroySystem extends ut.ComponentSystem {

        OnUpdate(): void {

            this.world.forEach([ut.Entity, ut.Core2D.TransformLocalPosition, game.AutoDestroy],
                (entity, transform, autodestroy) => {
                    let p = transform.position;
                    if (p.x < autodestroy.threshold) {
                        ut.Core2D.TransformService.destroyTree(this.world, entity, true);
                    }
                })
        }
    }
}