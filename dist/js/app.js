"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const start_buttonEl = document.getElementById('start_button');
    const allButtonElUnFiltered = Array.from(document.querySelectorAll('button'));
    const allButtonEl = Array.from(allButtonElUnFiltered).filter(button => { var _a; return ((_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== "Start"; });
    const svgImagesList = ['airplane', 'alarmFill', 'backpack', 'ballon', 'binoculars', 'earth', 'house', 'sun'];
    const buttonElementsList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'threeteen', 'fourteen', 'fiveteen', 'sixteen'];
    const guessEl = document.getElementById('guess');
    const missEl = document.getElementById('miss');
    const timeEl = document.getElementById('time');
    let finalCount = 0;
    let gemLogic;
    start_buttonEl.addEventListener('click', () => {
        timeEl.textContent = 'Wait';
        setTimeout(() => { doTimer(timeEl); }, 8000);
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
                if (finalCount === 16) {
                    start_buttonEl.disabled = false;
                    start_buttonEl.textContent = 'Restart';
                    stopTimer();
                    start_buttonEl.addEventListener('click', () => {
                        location.reload();
                    });
                }
                else {
                    console.log(finalCount + ' finalCount');
                }
            });
        });
    });
});
let intervalId = null;
function doTimer(timeEl) {
    let count = 30;
    intervalId = window.setInterval(() => {
        timeEl.textContent = 'Timer: ' + count + ' sec';
        if (count <= 0) {
            clearInterval(intervalId);
            timeEl.textContent = 'Time\'s up!';
        }
        else {
            count--;
        }
    }, 1000);
}
function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
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
GemLogic.clickedButtom = [];
