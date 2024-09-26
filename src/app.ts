document.addEventListener("DOMContentLoaded", ()=> {
    const start_buttonEl: HTMLButtonElement = document.getElementById('start_button')! as HTMLButtonElement;
    const allButtonElUnFiltered: HTMLButtonElement[] = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
    const allButtonEl: HTMLButtonElement[] = Array.from(allButtonElUnFiltered).filter(button => button.textContent?.trim() !== "Start");

    const svgImagesList: string[] = ['airplane', 'alarmFill', 'backpack', 'ballon', 'binoculars', 'earth', 'house', 'sun'];
    const buttonElementsList: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'threeteen', 'fourteen', 'fiveteen', 'sixteen'];


    let gemLogic: GemLogic;
    if (start_buttonEl) 
    {
        start_buttonEl.addEventListener('click', () => {
            console.log('Clicked');

            gemLogic = new GemLogic(buttonElementsList, svgImagesList);
            gemLogic.addImageToBtn();

            allButtonEl.forEach(btn => {
                gemLogic.forceTheMemorize(btn);
            });
        });
    }


    if(allButtonEl)
    {
        allButtonEl.forEach(buttom => {
            buttom.addEventListener('click', () => {
                gemLogic.getButtomImage(buttom, allButtonEl);
                gemLogic.removeButtomFromGameArea(buttom);
            });
        });
    }
});

// ---
class GemLogic 
{
    private buttonElementsList: string[];
    private svgImagesList: string[];
    private inGameImageList: string[] = [];

    constructor(btnElL: string[], svgImgL: string[]) 
    {
        this.buttonElementsList = btnElL;
        this.svgImagesList = svgImgL;
    }

    public addImageToBtn()
    {
        for(let i = 0; i < 8; i++)
        {
            //svg imge
            const chosenSvg: string = this.svgImagesList[Math.floor(Math.random() * this.svgImagesList.length)]; //chose a roandom svg image
            
            //add image to buttom
            for (let j = 0; j < 2; j++) //2 range for loop to add the same image to diferent buttoms
            {
                const imageEl: HTMLImageElement = document.createElement('img')! as HTMLImageElement; //create image elemt
                imageEl.src = `../svgs/${chosenSvg}.svg`; //add chosen svg image to the img elemt
                imageEl.alt = chosenSvg;
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

            const indexSvgL: number = this.svgImagesList.indexOf(chosenSvg); //finde the chosen svg image index
            this.svgImagesList.splice(indexSvgL, 1); //remove the chosen indexed elemt from the basic list
        }
    }

    public getButtomImage(buttom: HTMLButtonElement, allButtonEl: HTMLButtonElement[])
    {
        const image: HTMLImageElement = buttom.querySelector('img')! as  HTMLImageElement;

        if(image && image.src)
        {
            const imgSRc = image.src;
            this.inGameImageList.push(imgSRc.toString());
            this.inGameImageList.forEach(i => console.log('content of the list: ' + i));
            console.log(this.inGameImageList.length);
            this.compareTwoElemtOfList(this.inGameImageList, buttom, allButtonEl);
        }
        else
        {
            console.log('No image found');
        }
    }

    private compareTwoElemtOfList(inGameImageList: string[], buttom: HTMLButtonElement, allButtonEl: HTMLButtonElement[])
    {

        let setTimeOutAnonim: () => void = function() {
            setTimeout(() => {
                console.clear();
            }, 2000);
        };

        if(inGameImageList.length >= 2)
        {
            if(inGameImageList[0] === inGameImageList[1])
            {
                console.log('Tahats rihgt')
                this.inGameImageList = [];

                setTimeOutAnonim();
            }
            else
            {
                console.log('No match');
                setTimeOutAnonim();
            }
        }
    }

    public removeButtomFromGameArea(buttom: HTMLButtonElement)
    {
        const image = buttom.querySelector('img');
        if(image)
        {
            image.remove();
        }
        buttom.disabled = true;
        buttom.style.backgroundColor = 'rgb(000, 000, 000)';
    }

    public forceTheMemorize(buttom: HTMLButtonElement)
    {
        setTimeout(() => {
            buttom.style.background = 'rgb(256, 256, 256)'; 
            const imgeElL: HTMLImageElement = buttom.querySelector('img') as HTMLImageElement;
            if(imgeElL)
            {
                imgeElL.style.display = 'none';
            }
        }, 8000)
        
    }
}
