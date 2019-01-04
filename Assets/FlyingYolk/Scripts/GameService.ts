
namespace game {

    /** New System */
    export class GameService {
        private static kPlayerEntityName: string = 'Player';
        private static kSpawnerEntityName: string = 'Spawner';

        private static kTutorialSceneName: string = 'game.Tutorial';
        private static kGameSceneName: string = 'game.GameScene';
        private static kPipesSceneName: string = "game.Pipes";
        private static kScoreSceneName: string = 'game.Score';
        private static kGameOverSceneName: string = 'game.GameOver';

        static getPlayer(world: ut.World) {
            return world.getEntityByName(this.kPlayerEntityName);
        }

        static clear(world: ut.World) {
            ut.Tweens.TweenService.removeAllTweensInWorld(world);

            ut.EntityGroup.destroyAll(world, this.kGameSceneName);
            ut.EntityGroup.destroyAll(world, this.kScoreSceneName);
            ut.EntityGroup.destroyAll(world, this.kGameOverSceneName);
            ut.EntityGroup.destroyAll(world, this.kPipesSceneName);
        };

        static initialize(world: ut.World) {
            this.startTutorial(world);
        };

        static newGame(world: ut.World) {

        };

        static startTutorial(world: ut.World) {
            this.newGame(world);
            this.setSpawnerPaused(world, true);

            let player = this.getPlayer(world);

            world.usingComponentData(player, [game.Gravity], (gravity) => {
                gravity.gravity = new ut.Math.Vector2();
            })
        };

        static endTutorial(world: ut.World) {

        };

        static setSpawnerPaused(world: ut.World, paused: boolean) {

        };
       
    }
}
