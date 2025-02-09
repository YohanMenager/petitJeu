import Player from "./Player.js";
import Dessin from "./Dessin.js";
import lvl_1 from "./niveaux/lvl_1.js";
import lvl_2 from "./niveaux/lvl_2.js";
import lvl_3 from "./niveaux/lvl_3.js";
import lvl_4 from "./niveaux/lvl_4.js";
import lvl_5 from "./niveaux/lvl_5.js";
import victoire from "./niveaux/victoire.js";
import Sons from "./Sons.js";

export default class Game {

    currentLevel;
    inputStates = {
        left: false,
        up: false,
        right: false,
        down: false,
        space: false
      };
      monstre = null;
      cameraX = 0;
      cameraY = 0;
      niveaux = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 2000; // Définir une largeur plus grande pour le niveau
        this.canvas.height = 2000; // Définir une hauteur plus grande pour le niveau
    }

   async init(canvas) {
        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();

        this.niveaux.push(new lvl_1(this.ctx));
        this.niveaux.push(new lvl_2(this.ctx));
        this.niveaux.push(new lvl_3(this.ctx));
        this.niveaux.push(new lvl_4(this.ctx));
        this.niveaux.push(new lvl_5(this.ctx));
        this.niveaux.push(new victoire(this.ctx));

        window.addEventListener("resize", () => this.resizeCanvas()); // Ajuste en cas de redimensionnement
        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // dessine le monstre (le joueur)
        this.currentLevel = this.niveaux[0]; 
        this.monstre = new Player(this.currentLevel.spawnX, this.currentLevel.spawnY, 7, this.ctx);

        Sons.playStart();

        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 37) {
                this.inputStates.left = true;
            } else if (event.keyCode === 38) {
                this.inputStates.up = true;
            } else if (event.keyCode === 39) {
                this.inputStates.right = true;
            } else if (event.keyCode === 40) {
                this.inputStates.down = true;
            } else if (event.keyCode === 32) {
                this.inputStates.space = true;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            if (event.keyCode === 37) {
                this.inputStates.left = false;
            } else if (event.keyCode === 38) {
                this.inputStates.up = false;
            } else if (event.keyCode === 39) {
                this.inputStates.right = false;
            } else if (event.keyCode === 40) {
                this.inputStates.down = false;
            } else if (event.keyCode === 32) {
                this.inputStates.space = false;
            }
        });



        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Déplace tout le canvas en fonction de la caméra
        this.ctx.save();
        this.ctx.scale(this.scale, this.scale); // Applique l’échelle
        this.ctx.translate(-this.cameraX, -this.cameraY);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.monstre.drawMonstre();
        // Dessine une grille
        // this.drawGrid(20, 20, "black", 1);

        this.currentLevel.draw();

        this.ctx.restore();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    update() {
        let previousX = this.monstre.x;
        let previousY = this.monstre.y;

        // console.log(this.monstre.vy);

        if (!this.monstre.onGround) {
            this.monstre.vy += this.monstre.gravity; // Appliquer la gravité
        }

        if (this.inputStates.left) {
            this.monstre.x -= this.monstre.vitesse;
        }
        if (this.inputStates.right) {
            this.monstre.x += this.monstre.vitesse;
        }
        // Vérifier les collisions horizontales
        for (let obj of this.currentLevel.decor) {
            if (this.monstre.collisionRectangle(obj)) {
                // Annuler uniquement le déplacement horizontal
                this.monstre.x = previousX;
            }
        }


        this.monstre.y += this.monstre.vy; // Appliquer la vitesse verticale
        this.monstre.onGround = false; // Réinitialiser l'état du sol


    // Vérifier les collisions verticales
    for (let obj of this.currentLevel.decor) {
        if (this.monstre.collisionRectangle(obj)) {
            if (this.monstre.vy > 0) {  // Si on tombe
                this.monstre.y = obj.y - this.monstre.rayon;
                this.monstre.onGround = true;
            } else if (this.monstre.vy < 0) {  // Si on saute
                this.monstre.y = obj.y + obj.height + this.monstre.rayon;
            }
            this.monstre.vy = 0; 
        }
    }



        // Vérifier les collisions avec les obstacles
        for (let obstacle of this.currentLevel.obstacles) {
            if (this.monstre.collisionRectangle(obstacle)) {
                Sons.playLose();
                this.reinitialiserPosition();
                // return;
            }
        }

        // Vérifier les collisions avec les bonus
        for (let bonus of this.currentLevel.bonus) {
            if (this.collisionCercle(this.monstre, bonus)) {
                
                // console.log(this.currentLevel.numero);
                this.currentLevel.traiterBonus(this);
            }
        }

        // Vérifier les collisions avec la sortie
            if (this.collisionCercle(this.monstre, this.currentLevel.sortie)) {
                Sons.playWin();
                console.log("niveau terminé");
                this.niveauSuivant();
            }


        if (this.inputStates.space) {
            // console.log("saut");
            this.monstre.jump();
        }


        // Met à jour la position de la caméra pour centrer sur le monstre
        this.cameraX = this.monstre.x - this.canvas.width / (2 * this.scale);
        this.cameraY = this.monstre.y - this.canvas.height / (2 * this.scale);
    }





    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Définir un facteur de mise à l'échelle basé sur la largeur initiale
        this.scale = Math.min(this.canvas.width / 1920, this.canvas.height / 1080);
    }

    collisionCercle(monstre, objet) {
        let dx = monstre.x - objet.x;
        let dy = monstre.y - objet.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return (distance < monstre.rayon + objet.width / 2) 
    }
    collisionCercleRectangle(monstre, objet) {
        let dx = Math.abs(monstre.x - objet.x - objet.width / 2);
        let dy = Math.abs(monstre.y - objet.y - objet.height / 2);

        if (dx > (objet.width / 2 + monstre.rayon)) {
            return false;
        }
        if (dy > (objet.height / 2 + monstre.rayon)) {
            return false;
        }

        if (dx <= (objet.width / 2)) {
            return true;
        }
        if (dy <= (objet.height / 2)) {
            return true;
        }

        let distance = Math.sqrt(dx - objet.width / 2 + dy - objet.height / 2);
        return (distance <= monstre.rayon);
    }


    reinitialiserPosition() {
        this.monstre.setPos(this.currentLevel.spawnX, this.currentLevel.spawnY);
    }
    
    niveauSuivant() {
        this.currentLevel = this.niveaux[this.currentLevel.numero];
        this.reinitialiserPosition();
        if(this.currentLevel.numero == 6)
        {
            console.log("victoire");
            Sons.playMusic();
        }
    }

}