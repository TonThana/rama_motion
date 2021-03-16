import anime from 'animejs'
import { Control } from './control'
import { getScreenSize } from './game/gameBegin'

export const ruleEntry = (data) => {


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


    if (eye === "right") {
        document.getElementById("close-left").style.right = `0`
    } else if (eye === "both") {
        document.getElementById("close-none").style.left = `0`
    } else {
        document.getElementById("close-right").style.left = `0`
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


    // const parentSvg = document.getElementById("demon-circle-parent")
    // parentSvg.style.width = oneBoxWidth * NUMBER_OF_COLS
    // parentSvg.style.height = oneBoxWidth * NUMBER_OF_ROWS
    // //
    // centralCircle.style.fill = 'black'
    // centralCircle.style.cx = oneBoxWidth * NUMBER_OF_COLS / 2
    // centralCircle.style.cy = oneBoxWidth * NUMBER_OF_ROWS / 2
    // anime({
    //     targets: centralCircle,
    //     opacity: [0, 1],
    //     r: [0, 5],
    //     duration: 500,
    //     easing: "linear"
    // })

    let distanceFromScreenPx = (oneBoxWidth * NUMBER_OF_COLS / 2) / Math.tan(24 * Math.PI / 180)

    let distanceFromScreenCM = pxTomm(distanceFromScreenPx)

    let distanceInstruction = `สายตาจ้องจุดดำตรงกลาง ปลายจมูกห่างจากจอ ${distanceFromScreenCM.toFixed(2)} ซม.`
    console.log(distanceInstruction)

    const control = new Control()
    // add btn event
    document.getElementById("rule-button-regis").addEventListener('click', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        control.show('regis', [null])
    })
    document.getElementById("rule-button-game").addEventListener('click', ev => {
        ev.preventDefault()
        ev.stopPropagation()
        control.show('game', [data])
    })
}


const pxTomm = (px) => {
    const heightOfElInPx = document.getElementById("my_mm").clientHeight

    return (Math.floor(px / (heightOfElInPx / 100))) / 10
}