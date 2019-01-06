namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    @ut.requiredComponents(game.NumberTextRenderer)
    export class NumberTextRenderingSystem extends ut.ComponentSystem {
        
        OnUpdate(): void {
            this.world.forEach([game.NumberTextRenderer],
                (numberrenderer) => {
                    let value = numberrenderer.value;
                    let spacing = numberrenderer.spacing;
                    let alignment = numberrenderer.alignment;
                    let renderers = numberrenderer.renderers;
                    let characters = numberrenderer.characters;
                    
                    let digits = value.toString();
                    
                    let count = digits.length;
                    let width = count * spacing;
                    for (let i = 0; i < renderers.length; ++i) {
                        let renderer = renderers[i];
                        let spriteRenderer = this.world.getComponentData(renderer, ut.Core2D.Sprite2DRenderer);
                        let color = spriteRenderer.color;
                        if (i < count) {
                            color.a = 1;
                            spriteRenderer.sprite = characters[digits[count-i-1]];
                            let position;
                            if (alignment == game.TextAlignment.Center) {
                                position = new Vector3(spacing * (count - i - 1) - (width - spacing) * 0.5, 0, 0);
                            } else {
                              position = new Vector3(spacing * -i, 0, 0);
                            }
                            this.world.setComponentData(renderer, new ut.Core2D.TransformLocalPosition(position));
                        } else {
                            color.a = 0;
                        }
                        spriteRenderer.color = color;
                        this.world.setComponentData(renderer, spriteRenderer);
                    }
                })
        }
    }
}