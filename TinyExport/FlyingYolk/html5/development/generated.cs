using UTiny;
using UTiny.Core2D;
using UTiny.Math;
using UTiny.Shared;
using ut;
using UTiny.HTML;
using UTiny.Rendering;
using ut.EditorExtensions;
using UTiny.HitBox2D;
using UTiny.Tweens;

/*
 * !!! TEMP UNITL PROPER SCENE FORMAT !!!
 */
namespace entities.game
{
    namespace Bootstrap
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace GameOver
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace GameScene
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace Pipes
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace Score
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace Tutorial
    {
        public struct Component : IComponentData
        {
        }
    }
}

namespace game
{
    public struct AutoDestroy : IComponentData
    {
        public float threshold;
    }
    public struct GameConfig : IComponentData
    {
        public game.GameState state;
        public float scrollSpeed;
        public int gravity;
        public int currentScore;
        public int highScore;
        public float currentScrollSpeed;
    }
    public struct GameConfigTextValue : IComponentData
    {
        public string key;
    }
    public struct Gravity : IComponentData
    {
        public Vector2 gravity;
    }
    public struct Ground : IComponentData
    {
    }
    public struct NumberTextRenderer : IComponentData
    {
        public int value;
        public float spacing;
        public game.TextAlignment alignment;
        public DynamicArray<Entity> renderers;
        public DynamicArray<Entity> characters;
    }
    public struct PlayerInput : IComponentData
    {
        public float force;
    }
    public struct RepeatingBackground : IComponentData
    {
        public float threshold;
        public float distance;
    }
    public struct Reskinnable : IComponentData
    {
        public game.SkinType theme;
    }
    public struct ScorePoint : IComponentData
    {
        public int value;
    }
    public struct Scroller : IComponentData
    {
        public int value;
    }
    public struct SkinConfig : IComponentData
    {
        public game.SkinType theme;
        public bool force;
    }
    public struct Spacing : IComponentData
    {
        public Entity top;
        public Entity bottom;
        public float spacing;
    }
    public struct Spawner : IComponentData
    {
        public float time;
        public float delay;
        public bool paused;
        public float distance;
        public float minHeight;
        public float maxHeight;
    }
    public struct Velocity : IComponentData
    {
        public Vector2 velocity;
    }
    public enum GameState
    {
        Initialize = 0
        , Menu = 1
        , Tutorial = 2
        , Play = 3
        , GameOver = 4
    }
    public enum SkinType
    {
        Day = 0
        , Night = 1
    }
    public enum TextAlignment
    {
        Center = 0
        , Right = 1
    }
}

namespace ut.Core2D
{
    namespace layers
    {
        public struct Default : IComponentData
        {
        }
        public struct TransparentFX : IComponentData
        {
        }
        public struct IgnoreRaycast : IComponentData
        {
        }
        public struct Water : IComponentData
        {
        }
        public struct UI : IComponentData
        {
        }
    }
}

namespace ut.Math
{
}

namespace ut
{
}

namespace ut.Shared
{
}

namespace ut.Core2D
{
}

namespace ut
{
}

namespace ut.HTML
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.HTML
{
}

namespace ut.Core2D
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.Core2D
{
}

namespace ut.EditorExtensions
{
    public struct AssetReferenceAnimationClip : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceAudioClip : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceSprite : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceSpriteAtlas : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTMP_FontAsset : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTexture2D : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTile : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct CameraCullingMask : IComponentData
    {
        public int mask;
    }
    public struct EntityLayer : IComponentData
    {
        public int layer;
    }
}

namespace ut.HitBox2D
{
}

namespace ut.Tweens
{
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.UserCodeEnd))]
    [UpdateAfter(typeof(UTiny.Shared.UserCodeStart))]
    public class GameManagerSystemJS : IComponentSystem
    {
    }
}
