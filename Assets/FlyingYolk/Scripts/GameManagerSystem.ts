namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    export class GameManagerSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            switch(game.GameService.getGameState(this.world)) {
                case game.GameState.Initialize:
                {
                    game.GameService.initialize(this.world);
                }
                break;

                case game.GameState.Menu:
                {

                }
                break;
                
                case game.GameState.Tutorial:
                {
                    if (ut.Runtime.Input.getMouseButtonDown(0)) {
                        game.GameService.endTutorial(this.world);
                    }
                }
                break;
                case game.GameState.Play:
                {

                }
                break;
                case game.GameState.GameOver: 
                {
                    if (ut.Runtime.Input.getMouseButtonDown(0)) {
                        game.GameService.startTutorial(this.world);
                    }
                }
                break;
            }
        }
    }
}