import ObjetGraphique from "./ObjetGraphique.js";

export default class Obstacle extends ObjetGraphique
{
    constructor(x, y, couleur, ctx, width, height)
    {
        super(x, y, couleur, ctx, width, height);
    }
    draw()
    {
        this.ctx.save();
        this.ctx.fillStyle = this.couleur;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
    }

    drawCercle()
    {
        this.ctx.save();
        Dessin.drawCircleImmediat(this.ctx, this.x, this.y, this.width/2, this.couleur);
        this.ctx.restore();
    }

}