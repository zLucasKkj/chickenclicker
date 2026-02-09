function pickRandomArrayValue(array: Array<any>): any {
    return array[Math.floor(Math.random() * array.length)];
}

interface Game {
    unlockables: {
        [unlockableID: string]: {
            price: number
        }
    }
    unlocks: ("autoclicker")[]
    balance: number
    cps: number
}

var Game: Game = {
    unlockables: {
        "unlockableAutoclicker": {
            price: 150
        }
    },
    unlocks: [],
    balance: 0,
    cps: 0
}

function getUnlockable(unlockableID: string) {
    const element = document.querySelector(`#${unlockableID}`)
    if (!element) return alert(`${unlockableID} wasn't found in the HTML or in the Game object...`)
    
    const unlockable = Game.unlockables[element.id]
        
    if (Game.balance < unlockable.price) return new Audio((document.querySelector("#errorSound")! as HTMLAudioElement).src).play()
    Game.balance -= unlockable.price

    new Audio((document.querySelector("#boughtSound")! as HTMLAudioElement).src).play()

    Game.unlocks.push(unlockableID);
    Game.cps = 5; //set coins per second gain by now

    element.remove()
}

window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

window.onload = (e) => {
    const chickSounds = document.querySelectorAll('.ChickSound')!
    const errorSound = document.querySelector("#errorSound") as HTMLAudioElement
    const boughtSound = document.querySelector("#boughtSound") as HTMLAudioElement

    const chick = document.querySelector('#chick') as HTMLInputElement

    const cpsElement = document.querySelector("#cps")!
    const chirpsElement = document.querySelector("#chirps")!

    const unlockableAutoclickerElement = document.querySelector("#unlockableAutoclicker img")

    window.addEventListener('click', (e) => {
        //document.documentElement.requestFullscreen()
        console.log(e);
        
        if (e.target === chick) {
            Game.balance++
            chirpsElement.innerHTML = Game.balance.toFixed(2)

            chick.animate({ transform: 'TranslateY(-5px)' }, { duration: 50 });
            new Audio(pickRandomArrayValue(chickSounds as any).src).play()
        }

        if (e.target === unlockableAutoclickerElement) {
            getUnlockable("unlockableAutoclicker")
        }
    })

    function loop() {
        if (Game.unlocks.includes("autoclicker")) {
            Game.balance += Game.cps

            chick.animate({ transform: 'TranslateY(-5px)' }, { duration: 50 });
            new Audio(pickRandomArrayValue(chickSounds as any).src).play()
        }

        cpsElement.innerHTML = Game.cps.toString()
        chirpsElement.innerHTML = Game.balance.toFixed(2)

        //recursion for looping itself
        setTimeout(() => {
            loop()
        }, 1000)
    } loop()

}