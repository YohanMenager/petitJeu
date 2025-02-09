import Dessin from "./Dessin.js";

export default class ObjetGraphique {
    x;
    y;
    couleur;
    ctx;
    width;
    height;

    constructor(x, y, couleur, ctx, width, height) {
        this.x = x;
        this.y = y;
        this.couleur = couleur;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }
    draw() {
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