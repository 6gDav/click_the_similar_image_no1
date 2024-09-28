"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemLogic = void 0;
class GemLogic {
    constructor(btnElL, svgImgL, guessEl, missEl) {
        this.missCounter = 0;
        this.guestCounter = 0;
        this.inGameImageList = [];
        this.buttonElementsList = btnElL;
        this.svgImagesList = svgImgL;
        this.guessEl = guessEl;
        this.missEl = missEl;
    }
    addImageToBtn() {
        for (let i = 0; i < 8; i++) {
            const chosenSvg = this.svgImagesList[Math.floor(Math.random() * this.svgImagesList.length)];
            for (let j = 0; j < 2; j++) {
                const imageEl = document.createElement('img');
                imageEl.src = `../svgs/${chosenSvg}.svg`;
                imageEl.alt = chosenSvg;
                const chosenButton = this.buttonElementsList[Math.floor(Math.random() * this.buttonElementsList.length)];
                const chosenButtonEl = document.getElementById(chosenButton);
                const indexBtnL = this.buttonElementsList.indexOf(chosenButton);
                this.buttonElementsList.splice(indexBtnL, 1);
                if (chosenButtonEl) {
                    chosenButtonEl.insertBefore(imageEl, chosenButtonEl.firstChild);
                }
            }
            const indexSvgL = this.svgImagesList.indexOf(chosenSvg);
            this.svgImagesList.splice(indexSvgL, 1);
        }
    }
    getButtomImage(buttom, allButtonEl) {
        const image = buttom.querySelector('img');
        if (image && image.src) {
            const imgSRc = image.src;
            this.inGameImageList.push(imgSRc.toString());
            console.log(this.inGameImageList.length);
            this.compareTwoElemtOfList(this.inGameImageList);
        }
        else {
            console.log('No image found');
        }
    }
    compareTwoElemtOfList(inGameImageList) {
        let setTimeOutAnonimConsoleClear = function () {
            setTimeout(() => {
                console.clear();
            }, 2000);
        };
        if (inGameImageList.length == 2) {
            if (inGameImageList[0] === inGameImageList[1]) {
                console.log('Tahats rihgt');
                this.inGameImageList.length = 0;
                GemLogic.clickedButtom.forEach(buttom => { this.removeButtomFromGameArea(buttom); });
                this.guestCounter++;
                if (this.guessEl) {
                    this.guessEl.textContent = 'Count of correct guesses: ' + this.guestCounter.toString();
                }
                setTimeOutAnonimConsoleClear();
            }
            else {
                this.inGameImageList.length = 0;
                console.log('No match');
                GemLogic.clickedButtom.forEach(buttom => { this.removeButtomFromGameArea(buttom); });
                this.missCounter++;
                if (this.missEl) {
                    this.missEl.textContent = 'Count of mistakes: ' + this.missCounter.toString();
                }
                setTimeOutAnonimConsoleClear();
            }
        }
    }
    removeButtomFromGameArea(buttom) {
        const image = buttom.querySelector('img');
        if (image) {
            image.style.visibility = 'hidden';
        }
        buttom.disabled = true;
        setTimeout(() => { buttom.style.backgroundColor = 'rgb(000, 000, 000)'; }, 500);
    }
    forceTheMemorize(buttom) {
        setTimeout(() => {
            buttom.style.background = 'rgb(256, 256, 256)';
            const imgeElL = buttom.querySelector('img');
            if (imgeElL) {
                imgeElL.style.display = 'none';
            }
            buttom.disabled = false;
        }, 8000);
    }
    makeTheButtomStyelOriginal(buttom) {
        const image = buttom.querySelector('img');
        buttom.disabled = true;
        buttom.style.backgroundColor = 'rgb(76, 175, 80)';
        buttom.style.backdropFilter = 'blur(5px)';
        if (image) {
            image.style.display = 'block';
        }
    }
}
exports.GemLogic = GemLogic;
GemLogic.clickedButtom = [];
