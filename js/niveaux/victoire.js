import Level from "../Level.js";
import ObjetGraphique from "../ObjetGraphique.js";
import Obstacle from "../Obstacle.js";
import Sortie from "../Sortie.js";
import Sons from "../Sons.js";

export default class lvl_5 extends Level {
    numero = 6;
    ctx;
    constructor(ctx) {
        let decor = [
            new ObjetGraphique(-100000, 1000, "peru", ctx, 200000, 20),
            // new ObjetGraphique(-2000, -1000, "peru", ctx, 2000, 4000),
            // new ObjetGraphique(2500, -1000, "peru", ctx, 2000, 4000)
        ];


        let sortie = new Sortie(10000, 10000, "green", ctx, 0, 0);

        
        super(decor, [], sortie, [], 1250, 500);
        
        this.ctx = ctx;
    }

    draw() {
        // Dessiner le décor et les éléments du niveau
        for (let i = 0; i < this.decor.length; i++) {
            this.decor[i].draw();
        }

         // Dessiner "VICTOIRE" sous le sol
        this.ctx.font = "bold 100px Arial"; // Police en gras, 100px
        this.ctx.fillStyle = "gold"; // Couleur dorée pour un effet visible
        this.ctx.textAlign = "center"; // Centrer le texte
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 10;
        this.ctx.fillText("VICTOIRE", 1250, 1150); // Position sous le sol (y = 1150)

    }
    traiterBonus(game)
    {

    }
}