
import { init, exit } from './game/gameBegin'

const controlBtn = document.getElementById("testControlBtn")
const regisPage = document.getElementById("regis")
const gamePage = document.getElementById("game")

let state = true
controlBtn.addEventListener('click', () => {
    if (state) {
        // show game page
        regisPage.classList.add('hidden')
        gamePage.classList.remove('hidden')
        // restart game
        init()
    } else {
        // clear game
        exit()
        // show regis page 
        gamePage.classList.add('hidden')
        regisPage.classList.remove('hidden')
        // reset form
    }
    state = !state
})