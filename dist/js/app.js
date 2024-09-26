"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const start_buttonEl = document.getElementById('start_button');
    const allButtonElUnFiltered = Array.from(document.querySelectorAll('button'));
    const allButtonEl = Array.from(allButtonElUnFiltered).filter(button => { var _a; return ((_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== "Start"; });
    const svgImagesList = ['airplane', 'alarmFill', 'backpack', 'ballon', 'binoculars', 'earth', 'house', 'sun'];
    const buttonElementsList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'threeteen', 'fourteen', 'fiveteen', 'sixteen'];
    let gemLogic;
    if (start_buttonEl) {
        start_buttonEl.addEventListener('click', () => {
            console.log('Clicked');
            gemLogic = new GemLogic(buttonElementsList, svgImagesList);
            gemLogic.addImageToBtn();
            allButtonEl.forEach(btn => {
                gemLogic.forceTheMemorize(btn);
            });
        });
    }
    if (allButtonEl) {
        allButtonEl.forEach(buttom => {
            buttom.addEventListener('click', () => {
                gemLogic.getButtomImage(buttom, allButtonEl);
                gemLogic.removeButtomFromGameArea(buttom);
            });
        });
    }
});
class GemLogic {
    constructor(btnElL, svgImgL) {
        this.inGameImageList = [];
        this.buttonElementsList = btnElL;
        this.svgImagesList = svgImgL;
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
            this.inGameImageList.forEach(i => console.log('content of the list: ' + i));
            console.log(this.inGameImageList.length);
            this.compareTwoElemtOfList(this.inGameImageList, buttom, allButtonEl);
        }
        else {
            console.log('No image found');
        }
    }
    compareTwoElemtOfList(inGameImageList, buttom, allButtonEl) {
        let setTimeOutAnonim = function () {
            setTimeout(() => {
                console.clear();
            }, 2000);
        };
        if (inGameImageList.length >= 2) {
            if (inGameImageList[0] === inGameImageList[1]) {
                console.log('Tahats rihgt');
                this.inGameImageList = [];
                setTimeOutAnonim();
            }
            else {
                console.log('No match');
                setTimeOutAnonim();
            }
        }
    }
    removeButtomFromGameArea(buttom) {
        const image = buttom.querySelector('img');
        if (image) {
            image.remove();
        }
        buttom.disabled = true;
        buttom.style.backgroundColor = 'rgb(000, 000, 000)';
    }
    forceTheMemorize(buttom) {
        setTimeout(() => {
            buttom.style.background = 'rgb(256, 256, 256)';
            const imgeElL = buttom.querySelector('img');
            if (imgeElL) {
                imgeElL.style.display = 'none';
            }
        }, 8000);
    }
}
