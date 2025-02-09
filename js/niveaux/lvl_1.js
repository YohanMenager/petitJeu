import Level from "../Level.js";
import ObjetGraphique from "../ObjetGraphique.js";
import Obstacle from "../Obstacle.js";
import Sortie from "../Sortie.js";

export default class lvl_1 extends Level {
    numero = 1;
    constructor(ctx) {
        let decor = [
            // Sol
            new ObjetGraphique(0, 1000, "peru", ctx, 2500, 2000)
        ];

        let obstacles = [
            new Obstacle(-2000, 1500, "red", ctx, 10000, 2000),
        ]

        let sortie = new Sortie(2400, 900, "green", ctx, 100, 100);
        
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