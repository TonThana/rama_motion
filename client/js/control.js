import { game_init, game_exit } from './game/gameBegin'
import RegisLandingArt from './regis/regisArt'
import { regis } from './regis/regis'
import { ruleEntry } from './rule/rule'
import { resultEntry } from './result/result'
import { adminEntry } from "./admin/adminEntry";

const regisLandingArt = new RegisLandingArt()

class Control {
    constructor() {
        this.regisPage = document.getElementById("regis")
        this.gamePage = document.getElementById("game")
        this.rulePage = document.getElementById("rule")
        this.resultPage = document.getElementById('result')
        this.adminPage = document.getElementById("admin")

        this.pages = {
            "regis": this.regisPage,
            "game": this.gamePage,
            "rule": this.rulePage,
            "result": this.resultPage,
            "admin": this.adminPage
        }
        this.pagesEntryFn = {
            "regis": [regis, regisLandingArt.animate],
            "game": [game_init],
            "rule": [ruleEntry],
            "result": [resultEntry],
            "admin": [adminEntry],
        },
            this.pagesExitFn = {
                "game": [game_exit],
                "regis": [regisLandingArt.stopAnimate],
                "rule": [() => { }],
                "result": [() => { }],
                "admin": [() => { }]
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

                this.pagesEntryFn[p].forEach(f => f.apply(this, data))
                this.pages[p].classList.remove('hidden')
            }
        })

    }
}

export default new Control()