"use strict";
function pickRandomArrayValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}
var Game = {
    unlocks: [],
    balance: 0,
    cps: 5
};
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
window.onload = (e) => {
    const chickSounds = document.querySelectorAll('.ChickSound');
    const errorSound = document.querySelector("#errorSound");
    const boughtSound = document.querySelector("#boughtSound");
    const chick = document.querySelector('#chick');
    const cpsElement = document.querySelector("#cps");
    const chirpsElement = document.querySelector("#chirps");
    const unlockableAutoclickerElement = document.querySelector("#unlockableAutoclicker img");
    function chirp(increment) {
        if (Game.unlocks.includes('autoclicker'))
            cpsElement.innerHTML = Game.cps.toString();
        Game.balance = Game.balance + increment;
        chirpsElement.innerHTML = Game.balance.toFixed(2);
        new Audio(pickRandomArrayValue(chickSounds).src).play();
        //chick.animate({ transform: 'TranslateY(-5px)' }, { duration: 50 });
    }
    window.addEventListener('mousedown', e => {
        if (e.target === chick) {
            chick.style = "transform: TranslateY(-5px);";
        }
    });
    window.addEventListener('mouseup', e => {
        if (e.target === chick) {
            chick.style = "transform: TranslateY(5px);";
        }
    });
    window.addEventListener('click', (e) => {
        //document.documentElement.requestFullscreen()
        if (e.target === chick) {
            chirp(1);
        }
        if (e.target === unlockableAutoclickerElement) {
            if (Game.balance < 150)
                return new Audio(errorSound.src).play();
            Game.balance -= 150;
            new Audio(boughtSound.src).play();
            Game.unlocks.push("autoclicker");
            document.querySelector("#unlockableAutoclicker").hidden = true;
        }
    });
    function step() {
        if (Game.unlocks.includes("autoclicker"))
            chirp(Game.cps);
        setTimeout(() => {
            step();
        }, 1000);
    }
    step();
};
