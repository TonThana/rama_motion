import anime from 'animejs'
import Control from './control'
import { getScreenSize } from './game/gameBegin'
let data
export const ruleEntry = (regisdata) => {
    data = regisdata
    console.log("rule entry")
    // unlock art
    const eye = data.eye
    console.log(eye)
    const whichart = {
        "left": "close-right",
        "right": "close-left",
        "both": "close-none",
    }
    console.log(whichart)

    Object.keys(whichart).forEach(art => {

        if (eye === art) {
            console.log(document.getElementById(whichart[art]))
            document.getElementById(whichart[art]).classList.remove("off")

        } else {
            document.getElementById(whichart[art]).classList.add("off")
        }
    })

    const instruction = document.getElementById("rule-instruction")
    const eyeinstruction = document.getElementById("rule-eye")


    if (eye === "right") {
        document.getElementById("close-left").style.right = `0`
        instruction.style.gridArea = "a"
        eyeinstruction.innerHTML = "เอามือปิดตา<span style='color: #06c258; font-weight: bold;'>ซ้าย</span>"
    } else if (eye === "both") {
        document.getElementById("close-none").style.left = `0`
        instruction.style.gridArea = "b"

    } else {
        document.getElementById("close-right").style.left = `0`
        instruction.style.gridArea = "b"
        eyeinstruction.innerHTML = "เอามือปิดตา<span style='color: #a1045a; font-weight: bold;'>ขวา</span>"
    }

    // repeat logic as gameBegin 
    const screenSize = getScreenSize()
    let SCREEN_WIDTH = screenSize.width
    let SCREEN_HEIGHT = screenSize.height
    // position circles
    let longerDim;
    let shorterDim;
    if (SCREEN_HEIGHT < SCREEN_WIDTH) {
        longerDim = SCREEN_WIDTH
        shorterDim = SCREEN_HEIGHT
    } else {
        longerDim = SCREEN_HEIGHT
        shorterDim = SCREEN_WIDTH
    }

    // // must 6 shorter dim (row)
    const NUMBER_OF_ROWS = 8
    const NUMBER_OF_COLS = 12
    const oneBoxOnShorterDim = shorterDim / NUMBER_OF_ROWS
    const oneBoxOnLongerDim = longerDim / NUMBER_OF_COLS
    // let width be smaller value of the two
    const oneBoxWidth = oneBoxOnShorterDim < oneBoxOnLongerDim ? oneBoxOnShorterDim : oneBoxOnLongerDim


    let distanceFromScreenPx = (oneBoxWidth * NUMBER_OF_COLS / 2) / Math.tan(24 * Math.PI / 180)

    let distanceFromScreenCM = pxTomm(distanceFromScreenPx)

    document.getElementById("rule-distance").innerText = distanceFromScreenCM.toFixed(2)


    // add btn event
    const btnRegis = document.getElementById('rule-button-regis');
    btnRegis.removeEventListener('click', gotoRegis)
    btnRegis.addEventListener('click', gotoRegis)

    const btnGame = document.getElementById('rule-button-game');
    btnGame.removeEventListener('click', gotoGame)
    btnGame.addEventListener('click', gotoGame)
}

function gotoRegis(ev) {
    console.log("go regis from rule")
    ev.preventDefault()
    ev.stopPropagation()
    Control.show('regis', [null])
}

function gotoGame(ev) {
    console.log("go game from rule")
    ev.preventDefault()
    ev.stopPropagation()
    Control.show('game', [data])
}


const pxTomm = (px) => {
    const heightOfElInPx = document.getElementById("my_mm").clientHeight

    return (Math.floor(px / (heightOfElInPx / 100))) / 10
}