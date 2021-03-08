import anime from 'animejs'
import 'regenerator-runtime/runtime'
import getRandomInt from '../utils/getRandomInt'
import { MovingCircle } from './movingCircle'

// some variables
let SCREEN_WIDTH, SCREEN_HEIGHT
let circles = []

// show rules modal

function showRuleModal() {
    return new Promise((resolve, reject) => {

        const rules = document.getElementById("rules")

    })
}


export const init = () => {
    showRuleModal()
    const screenSize = getScreenSize()
    SCREEN_WIDTH = screenSize.width
    SCREEN_HEIGHT = screenSize.height
    const centralCircle = document.getElementById("central-fix")
    centralCircle.style.fill = 'black'
    centralCircle.style.cx = SCREEN_WIDTH / 2
    centralCircle.style.cy = SCREEN_HEIGHT / 2

    anime({
        targets: "#central-fix",
        opacity: [0, 1],
        r: [0, SCREEN_WIDTH / 200],
        duration: 500,
        easing: "linear"
    })
    const NUMBER_OF_CIRCLES = 200
    // generate moving circle
    const parentSvg = document.getElementById("circle-parent")

    for (let i = 0; i < NUMBER_OF_CIRCLES; i += 1) {
        circles.push(new MovingCircle(parentSvg, i, SCREEN_WIDTH, SCREEN_HEIGHT))
    }


    console.log(
        'wait 3 seconds'
    )
    setTimeout(() => {
        startMotion()
        // window.addEventListener('keydown', onKeyPress)
    }, 3000)

}

export const exit = () => {
    circles.forEach(el => el.destroy())
    circles = []
    // window.removeEventListener('keydown', onKeyPress)
}


// preparation
const getScreenSize = () => {
    const screensize = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }
    // not allowed if under certain dim
    return screensize
}


const delayTimer = ms => new Promise(resolve => setTimeout(resolve, ms))
async function startMotion() {
    for (let i = 0; i < circles.length; i += 1) {
        if (i === 0) console.log("START!")
        let waitTime = getRandomInt(300, 3000)
        await circles[i].animate()
        console.log("waitTime: ", waitTime)
        await delayTimer(waitTime)
    }
    console.log("DONE")
}
