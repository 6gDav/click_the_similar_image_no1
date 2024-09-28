document.addEventListener("DOMContentLoaded", () => {
    const start_buttonEl: HTMLButtonElement = document.getElementById('start_button')! as HTMLButtonElement;
    const allButtonElUnFiltered: HTMLButtonElement[] = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
    const allButtonEl: HTMLButtonElement[] = Array.from(allButtonElUnFiltered).filter(button => button.textContent?.trim() !== "Start");

    const svgImagesList: string[] = ['airplane', 'alarmFill', 'backpack', 'ballon', 'binoculars', 'earth', 'house', 'sun'];
    const buttonElementsList: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'threeteen', 'fourteen', 'fiveteen', 'sixteen'];

    const guessEl: HTMLParagraphElement = document.getElementById('guess')! as HTMLParagraphElement;
    const missEl: HTMLParagraphElement = document.getElementById('miss')! as HTMLParagraphElement;
    const timeEl: HTMLParagraphElement = document.getElementById('time')! as HTMLParagraphElement;

    let finalCount: number = 0;
    let gemLogic: GemLogic;

    start_buttonEl.addEventListener('click', () => {
        setTimeout(() => {doTimer(timeEl)}, 8_000);
        start_buttonEl.disabled = true;
        console.log('Clicked Stat');

        gemLogic = new GemLogic(buttonElementsList, svgImagesList, guessEl, missEl);
        gemLogic.addImageToBtn();

        allButtonEl.forEach(buttom => {
            buttom.disabled = true;
            gemLogic.forceTheMemorize(buttom);
            buttom.addEventListener('click', () => {
                finalCount++;
                GemLogic.clickedButtom.push(buttom);
                gemLogic.getButtomImage(buttom, allButtonEl);
                gemLogic.makeTheButtomStyelOriginal(buttom);
                if(finalCount === 16)
                {
                    start_buttonEl.disabled = false;  
                    start_buttonEl.textContent = 'Restart';
                    stopTimer();
                    start_buttonEl.addEventListener('click', () => {
                        location.reload();
                    });
                }
                else
                {
                    console.log(finalCount + ' finalCount');
                }
            });
        });
    });
});

let intervalId: number | null = null;

function doTimer(timeEl: HTMLParagraphElement) 
{
    let count = 30; 

    intervalId = window.setInterval(() => {
        timeEl.textContent = 'Timer: ' + count + ' sec';

        if (count <= 0) 
        {
            clearInterval(intervalId!); 
            timeEl.textContent = 'Time\'s up!'; 
        } 
        else 
        {
            count--; 
        }
    }, 1000); 
}
function stopTimer() 
{
    if (intervalId) 
    {
        clearInterval(intervalId); 
        intervalId = null;
    }
}

// ---
class GemLogic 
{
    missCounter: number = 0;
    guestCounter: number = 0;
    private buttonElementsList: string[];
    private svgImagesList: string[];
    private inGameImageList: string[] = [];
    private guessEl: HTMLParagraphElement;
    private missEl: HTMLParagraphElement; 
    static clickedButtom: HTMLButtonElement[] = [];

    constructor(btnElL: string[], svgImgL: string[], guessEl: HTMLParagraphElement, missEl: HTMLParagraphElement) 
    {
        this.buttonElementsList = btnElL;
        this.svgImagesList = svgImgL;
        this.guessEl = guessEl;
        this.missEl = missEl;
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
            console.log(this.inGameImageList.length);
            this.compareTwoElemtOfList(this.inGameImageList);
        }
        else
        {
            console.log('No image found');
        }
    }

    private compareTwoElemtOfList(inGameImageList: string[])
    {
        let setTimeOutAnonimConsoleClear: () => void = function() {
            setTimeout(() => {
                console.clear();
            }, 2000);
        };

        if(inGameImageList.length == 2)
        {
            if(inGameImageList[0] === inGameImageList[1])
            {
                console.log('Tahats rihgt')
                this.inGameImageList.length = 0;

                GemLogic.clickedButtom.forEach(buttom => {this.removeButtomFromGameArea(buttom)});
                
                this.guestCounter++;
                if(this.guessEl)
                {
                    this.guessEl.textContent = 'Count of correct guesses: ' + this.guestCounter.toString();
                }
                setTimeOutAnonimConsoleClear();
            }
            else
            {
                this.inGameImageList.length = 0;
                console.log('No match');
                GemLogic.clickedButtom.forEach(buttom => {this.removeButtomFromGameArea(buttom)});
                this.missCounter++;
                if(this.missEl)
                {
                    this.missEl.textContent = 'Count of mistakes: ' + this.missCounter.toString();
                }
                setTimeOutAnonimConsoleClear();
            }
        }
    }

    public removeButtomFromGameArea(buttom: HTMLButtonElement)
    {
        const image = buttom.querySelector('img');
        if(image)
        {
            image.style.visibility = 'hidden';
        }
        buttom.disabled = true;
        setTimeout(() => {buttom.style.backgroundColor = 'rgb(000, 000, 000)'}, 500);
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
            buttom.disabled = false;
        }, 8000)
    }

    public makeTheButtomStyelOriginal(buttom: HTMLButtonElement)
    {
        const image = buttom.querySelector('img');
        buttom.disabled = true;
        buttom.style.backgroundColor = 'rgb(76, 175, 80)';
        buttom.style.backdropFilter = 'blur(5px)';
        if(image)
        {
            image.style.display = 'block';
        }
    }
}
