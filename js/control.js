import { game_init, game_exit } from './game/gameBegin'
import RegisLandingArt from './regisArt'
import { regis } from './regis'
import { ruleEntry } from './rule'



let state = true


const regisLandingArt = new RegisLandingArt()

// regis -> rules
// rules -> regis



// rules -> game -> regis
// export function letsGoToTheTests(data) {
//     console.log(data)
//     if (state) {
//         // show game page
//         regisPage.classList.add('hidden')
//         // stop animation
//         gamePage.classList.remove('hidden')
//         // restart game
//         game_init(data)
//     } else {
//         // clear game
//         game_exit()
//         // show regis page - animate regis page
//         gamePage.classList.add('hidden')
//         regisPage.classList.remove('hidden')
//         // reset form
//     }
//     state = !state
// }




export class Control {
    constructor() {
        this.regisPage = document.getElementById("regis")
        this.gamePage = document.getElementById("game")
        this.rulePage = document.getElementById("rule")
        this.pages = {
            "regis": this.regisPage,
            "game": this.gamePage,
            "rule": this.rulePage
        }
        this.pagesEntryFn = {
            "regis": [regis, regisLandingArt.animate],
            "game": [game_init],
            "rule": [ruleEntry]
        },
            this.pagesExitFn = {
                "game": [game_exit],
                "regis": [regisLandingArt.stopAnimate],
                "rule": [() => console.log('rule exit')]
            }
    }




    show(page, data = null) {
        Object.keys(this.pages).forEach(p => {
            // console.log(p)
            if (p !== page) {
                // exit
                // previously shown (not hidden) page
                if (!this.pages[p].classList.contains("hidden")) {
                    this.pages[p].classList.add('hidden')
                    this.pagesExitFn[p].forEach(f => f.call(this))
                }
            } else {
                this.pages[p].classList.remove('hidden')
                this.pagesEntryFn[p].forEach(f => f.call(this, data))
            }
        })

    }
}

window.onload = function () {
    // initial
    const control = new Control()
    control.show("regis")
    // regis()
}

