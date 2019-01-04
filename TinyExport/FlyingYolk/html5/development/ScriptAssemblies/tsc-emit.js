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
    var AutoDestroySystem = /** @class */ (function (_super) {
        __extends(AutoDestroySystem, _super);
        function AutoDestroySystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AutoDestroySystem.prototype.OnUpdate = function () {
            var _this = this;
            this.world.forEach([ut.Entity, ut.Core2D.TransformLocalPosition, game.AutoDestroy], function (entity, transform, autodestroy) {
                var p = transform.position;
                if (p.x < autodestroy.threshold) {
                    ut.Core2D.TransformService.destroyTree(_this.world, entity, true);
                }
            });
        };
        return AutoDestroySystem;
    }(ut.ComponentSystem));
    game.AutoDestroySystem = AutoDestroySystem;
})(game || (game = {}));
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
    var GameOverSystem = /** @class */ (function (_super) {
        __extends(GameOverSystem, _super);
        function GameOverSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameOverSystem.prototype.OnUpdate = function () {
            var _this = this;
            var gameOver = false;
            this.world.forEach([ut.Entity, game.PlayerInput, ut.HitBox2D.HitBoxOverlapResults, ut.Core2D.Sprite2DSequencePlayer], function (entity, input, overlap, sequencePlayer) {
                _this.world.removeComponent(entity, game.PlayerInput);
                sequencePlayer.paused = true;
                gameOver = true;
            });
            if (gameOver) {
                game.GameService.gameOver(this.world);
            }
        };
        return GameOverSystem;
    }(ut.ComponentSystem));
    game.GameOverSystem = GameOverSystem;
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
        GameService.getGameConfig = function (world) {
            return world.getConfigData(game.GameConfig);
        };
        GameService.getGameState = function (world) {
            return this.getGameConfig(world).state;
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
            skinConfig.forced = true;
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
            ut.EntityGroup.destroyAll(world, this.kTutorialSceneName);
            this.setSpawnerPaused(world, false);
            var player = this.getPlayer(world);
            var gameConfig = world.getConfigData(game.GameConfig);
            world.usingComponentData(player, [game.Gravity], function (gravity) {
                gravity.gravity = new ut.Math.Vector2(0, gameConfig.gravity);
                console.log("gameConfig.gravity=" + gameConfig.gravity);
            });
            ut.Tweens.TweenService.removeAllTweensInWorld(world);
            gameConfig.state = game.GameState.Play;
            world.setConfigData(gameConfig);
            ut.EntityGroup.instantiate(world, this.kScoreSceneName);
        };
        ;
        GameService.gameOver = function (world) {
            ut.EntityGroup.destroyAll(world, this.kScoreSceneName);
            this.setSpawnerPaused(world, true);
            var gameConfig = this.getGameConfig(world);
            gameConfig.currentScrollSpeed = 0;
            if (gameConfig.currentScore > gameConfig.highScore) {
                gameConfig.highScore = gameConfig.currentScore;
            }
            gameConfig.state = game.GameState.GameOver;
            world.setConfigData(gameConfig);
            ut.EntityGroup.instantiate(world, this.kGameOverSceneName);
            var eGameOver = world.getEntityByName("Image_GameOver");
            var transform = world.getComponentData(eGameOver, ut.Core2D.TransformLocalPosition);
            var end = transform.position;
            var start = new Vector3(end.x, end.y + 1.0, end.z);
            ut.Tweens.TweenService.addTween(world, eGameOver, ut.Core2D.TransformLocalPosition.position, start, end, 1.35, 0, ut.Core2D.LoopMode.Once, ut.Tweens.TweenFunc.OutBounce, true);
            ut.Tweens.TweenService.addTween(world, eGameOver, ut.Core2D.Sprite2DRenderer.color.a, 0, 1, 0.45, 0, ut.Core2D.LoopMode.Once, ut.Tweens.TweenFunc.OutBounce, true);
            var eBoard = world.getEntityByName("Image_ScoreBoard");
            transform = world.getComponentData(eBoard, ut.Core2D.TransformLocalPosition);
            end = transform.position;
            start = new Vector3(end.x, end.y - 1.0, end.z);
            ut.Tweens.TweenService.addTween(world, eBoard, ut.Core2D.TransformLocalPosition.position, start, end, 0.35, 0, ut.Core2D.LoopMode.Once, ut.Tweens.TweenFunc.OutQuad, true);
        };
        ;
        GameService.setSpawnerPaused = function (world, paused) {
            var entity = world.getEntityByName(this.kSpawnerEntityName);
            var spawner = world.getComponentData(entity, game.Spawner);
            spawner.paused = paused;
            world.setComponentData(entity, spawner);
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
var game;
(function (game) {
    var GravitySystem = /** @class */ (function (_super) {
        __extends(GravitySystem, _super);
        function GravitySystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GravitySystem.prototype.OnUpdate = function () {
            var dt = this.scheduler.deltaTime();
            this.world.forEach([game.Gravity, game.Velocity], function (gravity, velocity) {
                var v = velocity.velocity;
                var g = gravity.gravity;
                v.x += g.x * dt;
                v.y += g.y * dt;
                velocity.velocity = v;
            });
        };
        GravitySystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd),
            ut.requiredComponents(game.Gravity, game.Velocity)
        ], GravitySystem);
        return GravitySystem;
    }(ut.ComponentSystem));
    game.GravitySystem = GravitySystem;
})(game || (game = {}));
var game;
(function (game) {
    var PlayerInputSystem = /** @class */ (function (_super) {
        __extends(PlayerInputSystem, _super);
        function PlayerInputSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayerInputSystem.prototype.OnUpdate = function () {
            if (game.GameService.getGameState(this.world) != game.GameState.Play) {
                return;
            }
            if (!ut.Runtime.Input.getMouseButtonDown(0)) {
                return;
            }
            //TODO: play audio
            this.world.forEach([ut.Entity, game.PlayerInput, game.Velocity], function (entity, input, velocity) {
                velocity.velocity = new ut.Math.Vector2(0, input.force);
            });
        };
        PlayerInputSystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd),
            ut.requiredComponents(game.PlayerInput, game.Velocity)
        ], PlayerInputSystem);
        return PlayerInputSystem;
    }(ut.ComponentSystem));
    game.PlayerInputSystem = PlayerInputSystem;
})(game || (game = {}));
var game;
(function (game) {
    var ScrollerSystem = /** @class */ (function (_super) {
        __extends(ScrollerSystem, _super);
        function ScrollerSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScrollerSystem.prototype.OnUpdate = function () {
            var gameConfig = game.GameService.getGameConfig(this.world);
            this.world.forEach([ut.Core2D.TransformLocalPosition, game.Scroller], function (transform, scroller) {
                var p = transform.position;
                p.x -= gameConfig.currentScrollSpeed;
                transform.position = p;
            });
        };
        ScrollerSystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd),
            ut.requiredComponents(ut.Core2D.TransformLocalPosition, game.Scroller)
        ], ScrollerSystem);
        return ScrollerSystem;
    }(ut.ComponentSystem));
    game.ScrollerSystem = ScrollerSystem;
})(game || (game = {}));
/// <reference path="ScrollerSystem.ts" />
var game;
(function (game) {
    var RepeatingBackgroundSystem = /** @class */ (function (_super) {
        __extends(RepeatingBackgroundSystem, _super);
        function RepeatingBackgroundSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RepeatingBackgroundSystem.prototype.OnUpdate = function () {
            this.world.forEach([ut.Core2D.TransformLocalPosition, game.RepeatingBackground], function (transform, background) {
                var p = transform.position;
                if (p.x < background.threshold) {
                    p.x += background.distance;
                }
                transform.position = p;
            });
        };
        RepeatingBackgroundSystem = __decorate([
            ut.executeAfter(game.ScrollerSystem),
            ut.requiredComponents(ut.Core2D.TransformLocalPosition, game.RepeatingBackground)
        ], RepeatingBackgroundSystem);
        return RepeatingBackgroundSystem;
    }(ut.ComponentSystem));
    game.RepeatingBackgroundSystem = RepeatingBackgroundSystem;
})(game || (game = {}));
var game;
(function (game) {
    var PipeSpacingSystem = /** @class */ (function (_super) {
        __extends(PipeSpacingSystem, _super);
        function PipeSpacingSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PipeSpacingSystem.prototype.OnUpdate = function () {
            var _this = this;
            this.world.forEach([game.Spacing], function (spacing) {
                // system responsible for setting the spacing between the pipes
                // this can be manipulated when spawing the pipe, or by another system in real time to create moving pipes
                var topPosition = _this.world.getComponentData(spacing.top, ut.Core2D.TransformLocalPosition);
                var botPosition = _this.world.getComponentData(spacing.bottom, ut.Core2D.TransformLocalPosition);
                topPosition.position = new Vector3(0, spacing.spacing * 0.5, 0);
                botPosition.position = new Vector3(0, -spacing.spacing * 0.5, 0);
                _this.world.setComponentData(spacing.top, topPosition);
                _this.world.setComponentData(spacing.bottom, botPosition);
            });
        };
        PipeSpacingSystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd),
            ut.requiredComponents(game.Spacing),
            ut.optionalComponents(ut.Core2D.TransformLocalPosition)
        ], PipeSpacingSystem);
        return PipeSpacingSystem;
    }(ut.ComponentSystem));
    game.PipeSpacingSystem = PipeSpacingSystem;
})(game || (game = {}));
/// <reference path="RepeatingBackgroundSystem.ts" />
var game;
(function (game) {
    var SpawnerSystem = /** @class */ (function (_super) {
        __extends(SpawnerSystem, _super);
        function SpawnerSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpawnerSystem.prototype.OnUpdate = function () {
            var _this = this;
            var pipesToSpawn = [];
            this.world.forEach([game.Spawner], function (spawner) {
                if (spawner.paused) {
                    return;
                }
                var time = spawner.time;
                var delay = spawner.delay;
                time += _this.scheduler.deltaTime();
                if (time > delay) {
                    time -= delay;
                    //@ts-ignore
                    pipesToSpawn.push(game.Spawner._fromPtr(spawner._ptr));
                }
                spawner.time = time;
            });
            for (var i = 0; i < pipesToSpawn.length; ++i) {
                var spawner = pipesToSpawn[i];
                var instance = ut.EntityGroup.instantiate(this.world, 'game.Pipes')[0];
                var pipe = ut.Core2D.TransformService.getChild(this.world, instance, 0);
                var transform = new ut.Core2D.TransformLocalPosition(new Vector3(spawner.distance, (Math.random() * spawner.maxHeight) + spawner.minHeight, 0));
                if (this.world.hasComponent(pipe, ut.Core2D.TransformLocalPosition))
                    this.world.setComponentData(pipe, transform);
                else
                    this.world.addComponentData(pipe, transform);
            }
        };
        SpawnerSystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd),
            ut.executeAfter(game.RepeatingBackgroundSystem),
            ut.requiredComponents(game.Spawner)
        ], SpawnerSystem);
        return SpawnerSystem;
    }(ut.ComponentSystem));
    game.SpawnerSystem = SpawnerSystem;
})(game || (game = {}));
var game;
(function (game) {
    var VelocitySystem = /** @class */ (function (_super) {
        __extends(VelocitySystem, _super);
        function VelocitySystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VelocitySystem.prototype.OnUpdate = function () {
            this.world.forEach([ut.Core2D.TransformLocalPosition, game.Velocity], function (transform, velocity) {
                var p = transform.position;
                var v = velocity.velocity;
                p.x += v.x;
                p.y += v.y;
                transform.position = p;
            });
        };
        VelocitySystem = __decorate([
            ut.executeAfter(ut.Shared.UserCodeStart),
            ut.executeBefore(ut.Shared.UserCodeEnd),
            ut.requiredComponents(game.PlayerInput, game.Velocity)
        ], VelocitySystem);
        return VelocitySystem;
    }(ut.ComponentSystem));
    game.VelocitySystem = VelocitySystem;
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