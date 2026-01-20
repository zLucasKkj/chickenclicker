function pickRandomArrayValue(array: Array<any>): any {
    return array[Math.floor(Math.random() * array.length)];
}

interface Game {
    unlocks: ("autoclicker")[]
    balance: number
    cps: number
}

var game: Game = {
    unlocks: ["autoclicker"],
    balance: 0,
    cps: 0.25
}

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

window.onload = (e) => {
    const chickSounds = document.querySelectorAll('.ChickSound')!
    const chick = document.querySelector('#chick')!

    const cpsElement = document.querySelector("#cps")!
    const chirpsElement = document.querySelector("#chirps")!

    function chirp(increment) {
        cpsElement.innerHTML = `C$${game.cps} p/s`
        game.balance = game.balance + increment
        chirpsElement.innerHTML = game.balance.toFixed(2)
        new Audio(pickRandomArrayValue(chickSounds as any).src).play()
        chick.animate({ transform: 'TranslateY(-5px)' }, { duration: 50 });
    }

    window.addEventListener('click', (element) => {
        if (element.target === chick) {
            chirp(1)      
        }
    })

    function step() {
        if (game.unlocks.includes("autoclicker")) chirp(game.cps)
        setTimeout(() => {
            step()
        }, 1000)
    }
    step()
}