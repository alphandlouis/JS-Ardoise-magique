// **********************************************************************************
// ********************************* Classe Program *********************************
// **********************************************************************************

class Program {

    constructor() {
        //on instancie colorPalette, le pen et Slate. On passe pen dans l'argument de l'objet slate (relais)
        this.colorPalette = new ColorPalette();
        this.pen = new Pen();
        this.canvas = new Slate(this.pen);
    }
    
    // Gestionnaire d'évènement de clic sur l'outil de pipette.
    onClickColorPicker() {
        document.querySelector("#color-palette").classList.remove("hide")
    }
    
    // Gestionnaire d'évènement de clic pour sélectionner une couleur de crayon prédéfinie.
    onClickPenColor(penColor) {
        // Modification de la couleur du crayon.
        this.pen.setColor(penColor);
    }
    
    // Gestionnaire d'évènement de clic pour changer la taille du crayon.
    onClickPenSize(penSize) {
        // Modification de l'épaisseur du crayon.
        this.pen.setSize(penSize);
    }
    
    // Gestionnaire d'évènement de changement de la couleur du crayon.
    onPickColor() {

        // Récupération de la couleur sur laquelle l'utilisateur a cliqué.
        const color = this.colorPalette.getPickedColor();
        // Changement de la couleur du crayon.
        this.pen.setColorAsRgb(color.red, color.green, color.blue);
        //on cache la palette de couleur
        document.querySelector("#color-palette").classList.add("hide")
    }
    
    // Méthode appelée au démarrage de l'application.
    start() {

        // Installation des gestionnaires d'évènements des outils. callback fonction clear dans slate et onClickColorPicker
        document.querySelector("#tool-clear-canvas").addEventListener("click", this.canvas.clear.bind(this.canvas))
        document.querySelector("#tool-color-picker").addEventListener("click", this.onClickColorPicker.bind(this))

        
        // Installation des gestionnaires d'évènements de configuration du crayon. boucle 
        let stylo = document.querySelectorAll(".pen-color")
        for(let i = 0; i < stylo.length; i++){
            stylo[i].addEventListener("click", (e)=>{
                let mycolor = e.currentTarget
                this.onClickPenColor(mycolor.dataset.color)
            })
        }
        
        
        //installation du gestionnaire d'événement qui changer la taille du crayon
        let mySize = document.querySelectorAll(".pen-size")
        for(let j = 0; j < mySize.length; j++){
            mySize[j].addEventListener("click", (e)=>{
                let mysize = e.currentTarget
                this.onClickPenSize(mysize.dataset.size)
            })
        }
        
        // Création d'un écouteur d'évènement sur l'event perso de la class ColorPalette qui va déclencher onPickColor
        document.addEventListener("magical-slate:pick-color", this.onPickColor.bind(this))
        
    }
}    