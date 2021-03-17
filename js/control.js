import { game_init, game_exit } from './game/gameBegin'
import RegisLandingArt from './regisArt'
import { regis } from './regis'
import { ruleEntry } from './rule'
import { resultEntry } from './result'

const regisLandingArt = new RegisLandingArt()

// regis -> rules
// rules -> regis

class Control {
    constructor() {
        console.log("CONTROL")
        this.regisPage = document.getElementById("regis")
        this.gamePage = document.getElementById("game")
        this.rulePage = document.getElementById("rule")
        this.resultPage = document.getElementById('result')
        this.pages = {
            "regis": this.regisPage,
            "game": this.gamePage,
            "rule": this.rulePage,
            "result": this.resultPage
        }
        this.pagesEntryFn = {
            "regis": [regis, regisLandingArt.animate],
            "game": [game_init],
            "rule": [ruleEntry],
            "result": [resultEntry]
        },
            this.pagesExitFn = {
                "game": [game_exit],
                "regis": [regisLandingArt.stopAnimate],
                "rule": [() => console.log('rule exit')],
                "result": [() => console.log('result exit')]
            }
    }




    show(page, data = [null]) {
        Object.keys(this.pages).forEach(p => {
            // console.log(p)
            if (p !== page) {
                // exit
                // previously shown (not hidden) page
                if (!this.pages[p].classList.contains("hidden")) {
                    this.pages[p].classList.add('hidden')
                    this.pagesExitFn[p].forEach(f => f.apply(this))
                }
            } else {
                this.pages[p].classList.remove('hidden')
                this.pagesEntryFn[p].forEach(f => f.apply(this, data))
            }
        })

    }
}

export default new Control()