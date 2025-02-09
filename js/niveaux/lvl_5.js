import Level from "../Level.js";
import ObjetGraphique from "../ObjetGraphique.js";
import Obstacle from "../Obstacle.js";
import Sortie from "../Sortie.js";
import Sons from "../Sons.js";

export default class lvl_5 extends Level {
    numero = 5;
    constructor(ctx) {
        let decor = [
            // Sol
            new ObjetGraphique(0, 1000, "peru", ctx, 1000, 2000),
            new ObjetGraphique(1100, 1250, "peru", ctx, 500, 20),
            new ObjetGraphique(2000, 1400, "peru", ctx, 500, 20),
            new ObjetGraphique(2600, 1490, "peru", ctx, 2000, 20),
            new ObjetGraphique(3600, -5000, "peru", ctx, 1000, 20),
            new ObjetGraphique(3400, -6000, "peru", ctx, 2000, 20),
            new ObjetGraphique(4000, 1500, "peru", ctx, 10, 5500)
        ];

        let obstacles = [
            new Obstacle(-2000, 1500, "red", ctx, 10000, 2000),
            new Obstacle(3600, -4500, "red", ctx, 10, 6500),
        ]

        let sortie = new Sortie(3700, 1300, "green", ctx, 100, 100);

        let bonus = [
            new ObjetGraphique(3500, 1300, "yellow", ctx, 50, 50)
        ];
        
        super(decor, obstacles, sortie, bonus, 10, 1000);
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
        for (let i = 0; i < this.bonus.length; i++) {
            this.bonus[i].drawCercle();
        }
    }
    traiterBonus(game)
    {
        Sons.playPowerup();
        game.monstre.vy = -100;
    }
}