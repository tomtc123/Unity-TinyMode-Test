namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    @ut.requiredComponents(game.PlayerInput, game.Velocity)
    export class PlayerInputSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            if (game.GameService.getGameState(this.world) != game.GameState.Play) {
                return;
            }
            if (!ut.Runtime.Input.getMouseButtonDown(0)) {
                return;
            }

            //TODO: play audio

            this.world.forEach([ut.Entity, game.PlayerInput, game.Velocity],
                (entity, input, velocity) => {
                    velocity.velocity = new ut.Math.Vector2(0, input.force);
                })
        }
    }
}