
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
            this.clear(world);
            ut.EntityGroup.instantiate(world, this.kGameSceneName);

            let config = world.getConfigData(game.GameConfig);
            config.currentScore = 0;
            config.currentScrollSpeed = config.scrollSpeed;
            config.state = game.GameState.Play;
            world.setConfigData(config);
            console.log("game start");
        };

        static startTutorial(world: ut.World) {
            this.newGame(world);
            this.setSpawnerPaused(world, true);

            let player = this.getPlayer(world);

            world.usingComponentData(player, [game.Gravity], (gravity) => {
                gravity.gravity = new ut.Math.Vector2();
            })
            let transform = world.getComponentData(player, ut.Core2D.TransformLocalPosition);

            ut.Tweens.TweenService.addTween(world,
                player,
                ut.Core2D.TransformLocalPosition.position.y,
                transform.position.y, transform.position.y + .1,
                0.4,
                0,
                ut.Core2D.LoopMode.PingPong,
                ut.Tweens.TweenFunc.InOutQuad,
                false);
            let skinConfig = world.getConfigData(game.SkinConfig);
            skinConfig.theme = game.SkinType.Day;
            skinConfig.force = true;
            world.setConfigData(skinConfig);

            let gameConfig = world.getConfigData(game.GameConfig);
            gameConfig.state = game.GameState.Tutorial;
            world.setConfigData(gameConfig);

            ut.EntityGroup.instantiate(world, this.kTutorialSceneName);

            let eReady = world.getEntityByName("Image_GetReady");
            ut.Tweens.TweenService.addTween(world,
                eReady,
                ut.Core2D.Sprite2DRenderer.color.a,
                0, 1,
                2.0,
                0.0,
                ut.Core2D.LoopMode.PingPong,
                ut.Tweens.TweenFunc.OutQuad,
                false);

            ut.Tweens.TweenService.addTween(world,
                world.getEntityByName("Image_Controls"),
                ut.Core2D.Sprite2DRenderer.color.a,
                0, 1,
                2,
                0,
                ut.Core2D.LoopMode.PingPong,
                ut.Tweens.TweenFunc.OutQuad,
                false);
        };

        static endTutorial(world: ut.World) {

        };

        static setSpawnerPaused(world: ut.World, paused: boolean) {

        };
       
    }
}
