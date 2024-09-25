"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const start_buttonEl = document.getElementById('start_button');
    const svgImagesList = ['airplane', 'alarmFill', 'backpack', 'ballon', 'binoculars', 'earth', 'house', 'sun'];
    const buttonElementsList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'threeteen', 'fourteen', 'fiveteen', 'sixteen'];
    if (start_buttonEl) {
        start_buttonEl.addEventListener('click', () => {
            console.log('Clicked');
            const gemLogic = new GemLogic(buttonElementsList, svgImagesList);
            gemLogic.addImageToBtn();
        });
    }
});
class GemLogic {
    constructor(btnElL, svgImgL) {
        this.buttonElementsList = btnElL;
        this.svgImagesList = svgImgL;
    }
    addImageToBtn() {
        for (let i = 0; i < 16; i++) {
            const chosenSvg = this.svgImagesList[Math.floor(Math.random() * this.buttonElementsList.length)];
            const indexSvgL = this.svgImagesList.indexOf(chosenSvg);
            this.svgImagesList.splice(indexSvgL, 1);
            for (let j = 0; j < 2; j++) {
                const imageEl = document.createElement('img');
                imageEl.src = `../svgs/${chosenSvg}.svg`;
                const chosenButton = this.buttonElementsList[Math.floor(Math.random() * this.buttonElementsList.length)];
                const chosenButtonEl = document.getElementById(chosenButton);
                const indexBtnL = this.buttonElementsList.indexOf(chosenButton);
                this.buttonElementsList.splice(indexBtnL, 1);
                if (chosenButtonEl) {
                    chosenButtonEl.insertBefore(imageEl, chosenButtonEl.firstChild);
                }
            }
        }
    }
}
