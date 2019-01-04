var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var game;
(function (game) {
    var GameManagerSystem = /** @class */ (function (_super) {
        __extends(GameManagerSystem, _super);
        function GameManagerSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameManagerSystem.prototype.OnUpdate = function () {
            var config = this.world.getConfigData(game.GameConfig);
            switch (config.state) {
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
        };
        GameManagerSystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd)
        ], GameManagerSystem);
        return GameManagerSystem;
    }(ut.ComponentSystem));
    game.GameManagerSystem = GameManagerSystem;
})(game || (game = {}));
var game;
(function (game) {
    /** New System */
    var GameService = /** @class */ (function () {
        function GameService() {
        }
        GameService.getPlayer = function (world) {
            return world.getEntityByName(this.kPlayerEntityName);
        };
        GameService.clear = function (world) {
            ut.Tweens.TweenService.removeAllTweensInWorld(world);
            ut.EntityGroup.destroyAll(world, this.kGameSceneName);
            ut.EntityGroup.destroyAll(world, this.kScoreSceneName);
            ut.EntityGroup.destroyAll(world, this.kGameOverSceneName);
            ut.EntityGroup.destroyAll(world, this.kPipesSceneName);
        };
        ;
        GameService.initialize = function (world) {
            this.startTutorial(world);
        };
        ;
        GameService.newGame = function (world) {
            this.clear(world);
            ut.EntityGroup.instantiate(world, this.kGameSceneName);
            var config = world.getConfigData(game.GameConfig);
            config.currentScore = 0;
            config.currentScrollSpeed = config.scrollSpeed;
            config.state = game.GameState.Play;
            world.setConfigData(config);
            console.log("game start");
        };
        ;
        GameService.startTutorial = function (world) {
            this.newGame(world);
            this.setSpawnerPaused(world, true);
            var player = this.getPlayer(world);
            world.usingComponentData(player, [game.Gravity], function (gravity) {
                gravity.gravity = new ut.Math.Vector2();
            });
            var transform = world.getComponentData(player, ut.Core2D.TransformLocalPosition);
            ut.Tweens.TweenService.addTween(world, player, ut.Core2D.TransformLocalPosition.position.y, transform.position.y, transform.position.y + .1, 0.4, 0, ut.Core2D.LoopMode.PingPong, ut.Tweens.TweenFunc.InOutQuad, false);
            var skinConfig = world.getConfigData(game.SkinConfig);
            skinConfig.theme = game.SkinType.Day;
            skinConfig.force = true;
            world.setConfigData(skinConfig);
            var gameConfig = world.getConfigData(game.GameConfig);
            gameConfig.state = game.GameState.Tutorial;
            world.setConfigData(gameConfig);
            ut.EntityGroup.instantiate(world, this.kTutorialSceneName);
            var eReady = world.getEntityByName("Image_GetReady");
            ut.Tweens.TweenService.addTween(world, eReady, ut.Core2D.Sprite2DRenderer.color.a, 0, 1, 2.0, 0.0, ut.Core2D.LoopMode.PingPong, ut.Tweens.TweenFunc.OutQuad, false);
            ut.Tweens.TweenService.addTween(world, world.getEntityByName("Image_Controls"), ut.Core2D.Sprite2DRenderer.color.a, 0, 1, 2, 0, ut.Core2D.LoopMode.PingPong, ut.Tweens.TweenFunc.OutQuad, false);
        };
        ;
        GameService.endTutorial = function (world) {
        };
        ;
        GameService.setSpawnerPaused = function (world, paused) {
        };
        ;
        GameService.kPlayerEntityName = 'Player';
        GameService.kSpawnerEntityName = 'Spawner';
        GameService.kTutorialSceneName = 'game.Tutorial';
        GameService.kGameSceneName = 'game.GameScene';
        GameService.kPipesSceneName = "game.Pipes";
        GameService.kScoreSceneName = 'game.Score';
        GameService.kGameOverSceneName = 'game.GameOver';
        return GameService;
    }());
    game.GameService = GameService;
})(game || (game = {}));
var ut;
(function (ut) {
    var EntityGroup = /** @class */ (function () {
        function EntityGroup() {
        }
        /**
         * @method
         * @desc Creates a new instance of the given entity group by name and returns all entities
         * @param {ut.World} world - The world to add to
         * @param {string} name - The fully qualified name of the entity group
         * @returns Flat list of all created entities
         */
        EntityGroup.instantiate = function (world, name) {
            var data = this.getEntityGroupData(name);
            if (data == undefined)
                throw "ut.EntityGroup.instantiate: No 'EntityGroup' was found with the name '" + name + "'";
            return data.load(world);
        };
        ;
        /**
         * @method
         * @desc Destroys all entities that were instantated with the given group name
         * @param {ut.World} world - The world to destroy from
         * @param {string} name - The fully qualified name of the entity group
         */
        EntityGroup.destroyAll = function (world, name) {
            var type = this.getEntityGroupData(name).Component;
            world.forEach([ut.Entity, type], function (entity, instance) {
                // @TODO This should REALLY not be necessary
                // We are protecting against duplicate calls to `destroyAllEntityGroups` within an iteration
                if (world.exists(entity)) {
                    world.destroyEntity(entity);
                }
            });
        };
        /**
         * @method
         * @desc Returns an entity group object by name
         * @param {string} name - Fully qualified group name
         */
        EntityGroup.getEntityGroupData = function (name) {
            var parts = name.split('.');
            if (parts.length < 2)
                throw "ut.Streaming.StreamingService.getEntityGroupData: name entry is invalid";
            var shiftedParts = parts.shift();
            var initialData = entities[shiftedParts];
            if (initialData == undefined)
                throw "ut.Streaming.StreamingService.getEntityGroupData: name entry is invalid";
            return parts.reduce(function (v, p) {
                return v[p];
            }, initialData);
        };
        return EntityGroup;
    }());
    ut.EntityGroup = EntityGroup;
})(ut || (ut = {}));
var ut;
(function (ut) {
    var EntityLookupCache = /** @class */ (function () {
        function EntityLookupCache() {
        }
        EntityLookupCache.getByName = function (world, name) {
            var entity;
            if (name in this._cache) {
                entity = this._cache[name];
                if (world.exists(entity))
                    return entity;
            }
            entity = world.getEntityByName(name);
            this._cache[name] = entity;
            return entity;
        };
        EntityLookupCache._cache = {};
        return EntityLookupCache;
    }());
    ut.EntityLookupCache = EntityLookupCache;
})(ut || (ut = {}));
//# sourceMappingURL=tsc-emit.js.map