// **********************************************************************************
// ********************************* Classe Pen *************************************
// **********************************************************************************
class Pen {

    constructor() {
        //initialisation d'une couleur et d'une size
        this.color = 'black';
        this.size = 1;
    }
    
    // Méthode de préparation de l'ardoise à l'exécution d'un dessin avec le crayon
    configure(slateCanvasContext) {
        // Mise à jour des propriétés de dessin de l'ardoise. on applique la taille et la couleur au context
        slateCanvasContext.strokeStyle = this.color;
        slateCanvasContext.lineWidth = this.size;
    }
    
    // Méthode de configuration de la couleur du crayon (valeur HTML hexadécimale ou nom de couleur CSS prédéfini)
    setColor(color) {
        this.color = color;
    }
    
    // Méthode de configuration de la couleur du crayon avec les trois composantes RGB
    setColorAsRgb(red, green, blue) {
        // Stockage de la couleur au format RGB (comme la fonction CSS)
        this.color = 'rgb(' + red + ',' + green + ',' + blue + ')'; 
    }
    
    // Méthode de configuration de l'épaisseur du crayon.
    setSize(size) {
        this.size = size;
    }
}