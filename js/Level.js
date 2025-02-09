export default class Level {
    decor = [];
    obstacles = [];
    sortie;
    bonus = [];
    spawnX;
    spawnY;
    constructor(decor, obstacles, sortie, bonus, spawnX, spawnY) {
        // Initialiser les éléments du niveau

        this.decor = decor;
        this.obstacles = obstacles;
        this.sortie = sortie;
        this.bonus = bonus;
        this.spawnX = spawnX;
        this.spawnY = spawnY;
    }

    draw(ctx) {
        // Dessiner le décor et les éléments du niveau
    }

    traiterBonus(game) {
        // Appliquer les bonus du niveau
    }
}