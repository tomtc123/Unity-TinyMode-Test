namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    @ut.requiredComponents(game.ScorePoint)
    @ut.optionalComponents(ut.Audio.AudioSource)
    export class ScorePointSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            let player = game.GameService.getPlayer(this.world);
            if (player.isNone()) {
                return;
            } 
            let gameConfig = game.GameService.getGameConfig(this.world);
            let playerPosition = ut.Core2D.TransformService.computeWorldPosition(this.world, player);

            this.world.forEach([ut.Entity, game.ScorePoint], 
                (entity, scorepoint) => {
                    let p = ut.Core2D.TransformService.computeWorldPosition(this.world, entity);
                    if (p.x < playerPosition.x) {
                        gameConfig.currentScore += scorepoint.value;
                        this.world.removeComponent(entity, game.ScorePoint);
                        this.world.setConfigData(gameConfig); 
                        console.log("score=", gameConfig.currentScore);
                    }
                })
        }
    }
}