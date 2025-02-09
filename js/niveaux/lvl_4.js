import Level from "../Level.js";
import ObjetGraphique from "../ObjetGraphique.js";
import Obstacle from "../Obstacle.js";
import Sortie from "../Sortie.js";
import Sons from "../Sons.js";

export default class lvl_4 extends Level {
    numero = 4;
    constructor(ctx) {
        let decor = [
            // Sol
            new ObjetGraphique(0, 1000, "peru", ctx, 1000, 2000),
            new ObjetGraphique(2900, 1000, "peru", ctx, 1200, 4000),
            //plateformes
            new ObjetGraphique(1000, 700, "peru", ctx, 500, 10),
            new ObjetGraphique(100, 500, "peru", ctx, 500, 10),
            new ObjetGraphique(-400, 300, "peru", ctx, 200, 10),
            new ObjetGraphique(1200, -50, "peru", ctx, 500, 50),
            
            new ObjetGraphique(2000, 50, "peru", ctx, 500, 10),
        ];

        let obstacles = [
            new Obstacle(-2000, 1500, "red", ctx, 10000, 2000),
            new Obstacle(1200, 0, "red", ctx, 500, 10000),
            new Obstacle(3200, -500, "red", ctx, 50, 1000),
        ]

        let sortie = new Sortie(4000, 900, "green", ctx, 100, 100);

        let bonus = [
            new ObjetGraphique(-300, 270, "yellow", ctx, 50, 50)
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
        Sons.playBonus();
        this.spawnX = this.bonus[0].x;
        this.spawnY = this.bonus[0].y;
        this.bonus = [];
        this.decor.push(new ObjetGraphique(0, 200, "peru", game.ctx, 1000, 10));
    }
}