// **********************************************************************************
// ********************************* Classe ColorPalette ****************************
// **********************************************************************************

class ColorPalette {

    constructor() {
        // Récupération du <canvas>
        this.canvas = document.getElementById('color-palette');
        // Récupération du contexte du canvas
        this.context = this.canvas.getContext('2d');
        //initialisation d'une couleur rgb (objet)
        this.pickedColor = {red: 0, green: 0, blue: 0};
        
        // Installation des gestionnaires d'évènements de la palette de couleurs.
        this.canvas.addEventListener('click', this.onClick.bind(this));
        // Dessine la palette de couleurs possibles.(appel fonction)
        this.build();
    }
    
    // Méthode de construction graphique de la palette de couleurs
    build() {
        //création du dégradé horizontal en canvas createLinearGradient
        let gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
        // Dégradé rouge -> vert -> bleu horizontal.
        gradient.addColorStop(0, 'rgb(255,   0,   0)');
        gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
        gradient.addColorStop(0.32, 'rgb(0,     0, 255)');
        gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
        gradient.addColorStop(0.66, 'rgb(0,   255,   0)');
        gradient.addColorStop(0.83, 'rgb(255, 255,   0)');
        gradient.addColorStop(1, 'rgb(255,   0,   0)');
        
        
        //on applique le remplissage couleur
        this.context.fillStyle = gradient;
        //on trace le rectangle
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //création du dégradé vertical en canvas createLinearGradient
        gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        // Dégradé blanc opaque -> transparent -> noir opaque vertical.
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
        gradient.addColorStop(1, 'rgba(0,     0,   0, 1)');
        //on applique le remplissage couleur
        this.context.fillStyle = gradient;
        //on trace le rectangle
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Méthode de récupération de la couleur sur laquelle l'utilisateur a cliqué
    getPickedColor() {
        //on retourne la couleur sélectionnée
        return this.pickedColor;
    }
    
    // Gestionnaire d'évènement de clic sur un pixel de couleur de la palette
    onClick(event) {
        // Récupération des coordonnées de la souris au moment du clic. getBoundingClientRect et event.clientX et Y
        const offset = this.canvas.getBoundingClientRect();
        const x = event.clientX - offset.left
        const y = event.clientY - offset.top
        /*
         * Création d'un tableau contenant les valeurs RGBA du pixel sur
         * lequel l'utilisateur a cliqué. avec getImageData
         */
         const  palette = this.context.getImageData(x, y, 1, 1);
         // Enregistrement des valeurs RGB.
        this.pickedColor.red = palette.data[0];
        this.pickedColor.green = palette.data[1];
        this.pickedColor.blue = palette.data[2];

        /*
         * Déclenchement de l'évènement de l'application,
         * annonçant que l'utilisateur a sélectionné une nouvelle couleur. (événement personnalisé)
         */
        
        let myEvent = new CustomEvent("magical-slate:pick-color", {
          detail: {
            //ici on peut lui passer des datas
          }
        });
        document.dispatchEvent(myEvent);
        /*let myEvent = document.createEvent('Event');
        myEvent.initEvent('magical-slate:pick-color', true, true);
        document.dispatchEvent(myEvent)*/
        
        //en jQuery
        //$.event.trigger('magical-slate:pick-color');
    }
    
}