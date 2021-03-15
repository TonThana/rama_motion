import { game_init, game_exit } from './game/gameBegin'
import RegisLandingArt from './regisArt'
import { regis } from './regis'
import { ruleEntry } from './rule'
import { resultEntry } from './result'
import { result } from './example_result/example_result'
import { result_colored } from './example_result/example_result_colored'

const regisLandingArt = new RegisLandingArt()

// regis -> rules
// rules -> regis

export class Control {
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

window.onload = function () {
    // initial
    const control = new Control()
    control.show("regis")
    // regis()
    // temp bypass to result
    // let testdata = {
    //     name: "test ton",
    //     testType: "colored",
    //     eye: "both",
    //     hn: "4567891"
    // }
    // control.show("result", [result_colored, testdata])
}

