namespace game {

    export class GameOverSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            let gameOver = false;
            this.world.forEach(
                [ut.Entity, game.PlayerInput, ut.HitBox2D.HitBoxOverlapResults, ut.Core2D.Sprite2DSequencePlayer],
                (entity, input, overlap, sequencePlayer) => {
                    this.world.removeComponent(entity, game.PlayerInput);

                    sequencePlayer.paused = true;
                    gameOver = true;
                });

                if (gameOver) {
                    game.GameService.gameOver(this.world);
                }
        }
    }
}