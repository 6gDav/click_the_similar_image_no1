document.addEventListener("DOMContentLoaded", ()=> {
    const start_buttonEl: HTMLButtonElement = document.getElementById('start_button')! as HTMLButtonElement;

    const svgImagesList: string[] = ['airplane', 'alarmFill', 'backpack', 'ballon', 'binoculars', 'earth', 'house', 'sun'];
    const buttonElementsList: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'threeteen', 'fourteen', 'fiveteen', 'sixteen'];

    if (start_buttonEl) 
    {
        start_buttonEl.addEventListener('click', () => {
            console.log('Clicked');
            const gemLogic: GemLogic = new GemLogic(buttonElementsList, svgImagesList);
            gemLogic.addImageToBtn();
        });
    }
});

// ---
class GemLogic 
{
    private buttonElementsList: string[];
    private svgImagesList: string[];

    constructor(btnElL: string[], svgImgL: string[]) 
    {
        this.buttonElementsList = btnElL;
        this.svgImagesList = svgImgL;
    }

    public addImageToBtn()
    {
        //
        for(let i = 0; i < 16; i++)
        {
            //svg imge
            const chosenSvg: string = this.svgImagesList[Math.floor(Math.random() * this.buttonElementsList.length)]; //chose a roandom svg image
            
            const indexSvgL: number = this.svgImagesList.indexOf(chosenSvg); //finde the chosen svg image index
            this.svgImagesList.splice(indexSvgL, 1); //remove the chosen indexed elemt from the basic list
            
            //add image to buttom
            
            for (let j = 0; j < 2; j++) //2 range for loop to add the same image to diferent buttoms
            {
                const imageEl: HTMLImageElement = document.createElement('img')! as HTMLImageElement; //create image elemt
                imageEl.src = `../svgs/${chosenSvg}.svg`; //add chosen svg image to the img elemt
                //btn elemt
                const chosenButton: string = this.buttonElementsList[Math.floor(Math.random() * this.buttonElementsList.length)]; //find the chosen button
                const chosenButtonEl: HTMLButtonElement = document.getElementById(chosenButton)! as HTMLButtonElement; //get the chosen buttom elemt 

                const indexBtnL: number = this.buttonElementsList.indexOf(chosenButton); //fint the chosen button index
                this.buttonElementsList.splice(indexBtnL, 1); //remove that chosen elemetn from the list

                if (chosenButtonEl)
                {
                    chosenButtonEl.insertBefore(imageEl, chosenButtonEl.firstChild); // add the created image to buttom
                }
            }
        }
    }
}
