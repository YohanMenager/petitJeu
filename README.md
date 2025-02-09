# petit Jeu fait en javascript
Ceci est un projet rapide fait pour mes cours en licence 3 MIASHS parcours MIAGE.
C'est un prototype de jeu de plateforme où on joue un petit monstre avec un chapeau.

## Jouer au jeu  
Vous pouvez essayer le jeu ici : [Lien vers le jeu](https://yohanmenager.github.io/petitJeu/)

## fonctionnement

### contrôles
- touches fléchées pour se déplacer horizontalement
- barre espace pour sauter

### éléments du jeu
- il y a des obstacles en rouge, si on les touche on revient au début du niveau.
- la sortie du niveau est en vert, quand on la touche on va au niveau suivant

## organisation
Le fichier script.js initialise le programme, et la classe Game représente le moteur du jeu.
La plupart des gestion de collisions sont dans la classe Game, ainsi que diverses fonctions utilitaires.
J'utilise une classe pour chaque niveau, qui héritent de la classe Level.
Pour tous les éléments visibles (à l'exception du monstre), j'utilise la classe ObjetGraphique ou une classe qui en hérite.

J'utilise aussi les classes utilitaires Sons et Dessin.

## infos en plus
Les sons proviennent de [Pixabay](https://pixabay.com/fr/)
Le petit monstre s'appelle Kévin.