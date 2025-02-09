export default class Dessin
{
    static drawCircleImmediat(ctx, x, y, r, color) {
        // BONNE PRATIQUE : on sauvegarde le contexte
        // des qu'une fonction ou un bout de code le modifie
        // couleur, épaisseur du trait, systeme de coordonnées etc.
        ctx.save();

        // AUTRE BONNE PRATIQUE : on dessine toujours
        // en 0, 0 !!!! et on utilise les transformations
        // géométriques pour placer le dessin, le tourner, le rescaler
        // etc.
        ctx.fillStyle = color;
        ctx.beginPath();

        // on translate le systeme de coordonnées pour placer le cercle
        // en x, y
        ctx.translate(x, y);     
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // on restore le contexte à la fin
        ctx.restore();
    }    

    static drawGrid(nbLignes, nbColonnes, couleur, largeurLignes, ctx) {
        // dessine une grille de lignes verticales et horizontales
        // de couleur couleur
        ctx.save();

        ctx.strokeStyle = couleur;
        ctx.lineWidth = largeurLignes;

        let largeurColonnes = this.canvas.width / nbColonnes;
        let hauteurLignes = this.canvas.height / nbLignes;

        ctx.beginPath();

        // on dessine les lignes verticales
        for (let i = 1; i < nbColonnes; i++) {
            ctx.moveTo(i * largeurColonnes, 0);
            ctx.lineTo(i * largeurColonnes, this.canvas.height);
        }

        // on dessine les lignes horizontales
        for (let i = 1; i < nbLignes; i++) {
            ctx.moveTo(0, i * hauteurLignes);
            ctx.lineTo(this.canvas.width, i * hauteurLignes);
        }

        // gpu call pour dessiner d'un coup toutes les lignes
        ctx.stroke();

        ctx.restore();
    }
}

