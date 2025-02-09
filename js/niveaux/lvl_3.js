import Level from "../Level.js";
import ObjetGraphique from "../ObjetGraphique.js";
import Obstacle from "../Obstacle.js";
import Sortie from "../Sortie.js";

export default class lvl_3 extends Level {
    numero = 3;
    constructor(ctx) {
        let decor = [
            // Sol
            new ObjetGraphique(0, 1000, "peru", ctx, 1000, 2000),
            new ObjetGraphique(2900, 1000, "peru", ctx, 1200, 4000),
            //plateformes
            new ObjetGraphique(1000, 700, "peru", ctx, 500, 10),
            new ObjetGraphique(1900, 500, "peru", ctx, 500, 10)
        ];

        let obstacles = [
            new Obstacle(-2000, 1500, "red", ctx, 10000, 2000),
            // new Obstacle(1000, 1500, "red", ctx, 1000, 2000)
        ]

        let sortie = new Sortie(4000, 900, "green", ctx, 100, 100);
        
        super(decor, obstacles, sortie, [], 250, 500);
    }

    draw() {
        // Dessiner le décor et les éléments du niveau
        for (let i = 0; i < this.decor.length; i++) {
            this.decor[i].draw();
        }
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
        }
        this.sortie.drawCercle();
    }
}