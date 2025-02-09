import Dessin from "./Dessin.js";
import Sons from "./Sons.js";

export default class Player {
    x = 0;
    y = 0;
    vitesse = 0;
    ctx = null;
    hp = 3;
    rayon = 175;
    vy = 0; // Vitesse verticale
    gravity = 0.5; // Force de gravité
    jumpStrength = -100; // Force du saut
    onGround = false; // Indique si le monstre touche le sol

    constructor( x, y, vitesse, ctx) {
        this.x = x;
        this.y = y;
        this.vitesse = vitesse;
        this.ctx = ctx;
        this.vy = 0; // Vitesse verticale
        this.gravity = 0.5; // Force de gravité
        this.jumpStrength = -20; // Force du saut
        this.onGround = false; // Indique si le monstre touche le sol
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    setVitesse(vitesse) {
        this.vitesse = vitesse;
    }

    jump() {
        // console.log(this.onGround);
        if (this.onGround) {
            Sons.playJump();
            this.vy = this.jumpStrength; // Appliquer la force de saut
            this.onGround = false; // Désactiver l'état du sol
        }
    }

    collisionRectangle(obj) {
        let monstreBas = this.y + this.rayon;
        let monstreHaut = this.y - this.rayon;
        let monstreGauche = this.x - this.rayon;
        let monstreDroite = this.x + this.rayon;
    
        let objBas = obj.y + obj.height;
        let objHaut = obj.y;
        let objGauche = obj.x;
        let objDroite = obj.x + obj.width;
    
        let collisionX = monstreDroite > objGauche && monstreGauche < objDroite;
        let collisionY = monstreBas > objHaut && monstreHaut < objBas;
    
        if (collisionX && collisionY) {
            let overlapRight = monstreDroite - objGauche;
            let overlapLeft = objDroite - monstreGauche;
            let overlapBottom = monstreBas - objHaut;
            let overlapTop = objBas - monstreHaut;
    
            // Déterminer la plus petite collision pour éviter l'effet de téléportation
            let minOverlap = Math.min(overlapRight, overlapLeft, overlapBottom, overlapTop);
    
            if (minOverlap === overlapBottom && this.vy > 0) {
                this.y = objHaut - this.rayon; 
                this.vy = 0;
                this.onGround = true;
            } else if (minOverlap === overlapTop && this.vy < 0) {
                this.y = objBas + this.rayon;
                this.vy = 0;
            } else if (minOverlap === overlapRight) {
                this.x = objGauche - this.rayon;
            } else if (minOverlap === overlapLeft) {
                this.x = objDroite + this.rayon;
            }
            return true;
        }
        return false;
    }

    
    drawMonstre() {
        // Ici on dessine un monstre
        this.ctx.save();

        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        this.ctx.translate(this.x, this.y);
        //this.ctx.rotate(0.3);
        //this.ctx.scale(0.5, 0.5);

        // tete du monstre
        // this.ctx.fillStyle = "pink";
        // this.ctx.fillRect(0, 0, 100, 100);
        Dessin.drawCircleImmediat(this.ctx, 45, 45, 75, "brown");

        // yeux
        Dessin.drawCircleImmediat(this.ctx, 20, 20, 10, "red");
        Dessin.drawCircleImmediat(this.ctx, 60, 20, 10, "red");

        // Les bras
        this.drawBrasGauche();
        this.drawBrasDroit();


        // jambes
        this.drawJambeGauche();
        this.drawJambeDroite();

        //chapeau
        this.drawChapeau();

        // restore
        this.ctx.restore();
    }

    drawBrasGauche() {
        this.ctx.save();

        this.ctx.translate(-100, -20);
        this.ctx.rotate(0.7);

        // on dessine le bras gauche
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(50, 0, 50, 10);

        // on dessine l'avant bras gauche
       this.drawAvantBrasGauche();

        this.ctx.restore();
    }

    drawAvantBrasGauche() {
        this.ctx.save();

        this.ctx.translate(0, 0);
        // this.ctx.rotate(0.3);

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, 50, 10);

        this.ctx.restore();
    }

    drawBrasDroit() {
        this.ctx.save();

        this.ctx.translate(110, 50);
        this.ctx.rotate(-0.7);

        // on dessine le bras droit
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(0, 0, 50, 10);

        // on dessine l'avant bras droit
        this.drawAvantBrasDroit();

        this.ctx.restore();
    }

    drawAvantBrasDroit() {
        this.ctx.save();

        this.ctx.translate(50, 0);
        // this.ctx.rotate(1.3);

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, 50, 10);

        this.ctx.restore();
    }

    drawJambeGauche(){
        this.ctx.save();

        this.ctx.translate(20, 115);
        this.ctx.rotate(0.7);

        // on dessine le bras droit
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(0, 0, 10, 55);

        this.drawAvantJambeGauche();

        this.ctx.restore();        
    }

    drawAvantJambeGauche(){
        this.ctx.save();

        this.ctx.translate(0, 50);
        this.ctx.rotate(-0.7);

        // on dessine le bras droit
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 10, 55);


        this.ctx.restore();        
    }

    drawJambeDroite(){
        this.ctx.save();

        this.ctx.translate(70, 115);
        this.ctx.rotate(-0.7);

        // on dessine le bras droit
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(0, 0, 10, 55);

        this.drawAvantJambeDroite();

        this.ctx.restore();        
    }

    drawAvantJambeDroite(){
        this.ctx.save();

        this.ctx.translate(5, 45);
        this.ctx.rotate(0.7);

        // on dessine le bras droit
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 10, 55);


        this.ctx.restore();    
    }

    drawChapeau(){
        this.ctx.save();

        this.ctx.translate(-7, -30);

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 100, 10);

        this.drawHautChapeau();

        this.ctx.restore();
    }

    drawHautChapeau()
    {
        this.ctx.save();

        this.ctx.translate(25, -80);

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 50, 90);

        this.ctx.restore();
    }
}