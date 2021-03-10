import { init, exit } from './game/gameBegin'
import RegisLandingArt from './regisArt'
const regisPage = document.getElementById("regis")
const gamePage = document.getElementById("game")


let state = true

// const controlBtn = document.getElementById("testControlBtn")
// controlBtn.addEventListener('click', () => {
//     if (state) {
//         // show game page
//         regisPage.classList.add('hidden')
//         gamePage.classList.remove('hidden')
//         // restart game
//         init()
//     } else {
//         // clear game
//         exit()
//         // show regis page 
//         gamePage.classList.add('hidden')
//         regisPage.classList.remove('hidden')
//         // reset form
//     }
//     state = !state
// })

const regisLandingArt = new RegisLandingArt()

export function letsGoToTheTests(data) {
    console.log(data)
    if (state) {
        // show game page
        regisPage.classList.add('hidden')
        // stop animation


        gamePage.classList.remove('hidden')
        // restart game
        init(data)
    } else {
        // clear game
        exit()
        // show regis page - animate regis page
        gamePage.classList.add('hidden')
        regisPage.classList.remove('hidden')
        // reset form
    }
    state = !state
}

