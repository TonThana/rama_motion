import anime from 'animejs'
import 'regenerator-runtime/runtime'
import getRandomInt from '../utils/getRandomInt'
import { MovingCircle } from './movingCircle'
import shuffle from '../utils/shuffle'

// some variables
let SCREEN_WIDTH, SCREEN_HEIGHT
let circles = []
export const SMALL = "small"
export const MEDIUM = "MEDIUM"
export const LARGE = "LARGE"
// show rules modal

function showRuleModal() {
    return new Promise((resolve, reject) => {

        const rules = document.getElementById("rules")

    })
}


export const init = () => {
    // showRuleModal()
    const screenSize = getScreenSize()
    SCREEN_WIDTH = screenSize.width
    SCREEN_HEIGHT = screenSize.height

    // // number of columns = 10
    // const oneBoxWidth = SCREEN_WIDTH / 10
    // console.log(oneBoxWidth)
    // const numberOfRows = Math.floor(SCREEN_HEIGHT / oneBoxWidth)
    // console.log(numberOfRows, " rows", "10 columns")


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

    // must 6 shorter dim (row)
    const NUMBER_OF_ROWS = 8
    const NUMBER_OF_COLS = 16
    const oneBoxOnShorterDim = shorterDim / NUMBER_OF_ROWS
    const oneBoxOnLongerDim = longerDim / NUMBER_OF_COLS
    // let width be smaller value of the two
    const oneBoxWidth = oneBoxOnShorterDim < oneBoxOnLongerDim ? oneBoxOnShorterDim : oneBoxOnLongerDim


    // const NUMBER_OF_SMALL_CIRCLES = NUMBER_OF_COLS * NUMBER_OF_ROWS
    // const NUMBER_OF_MEDIUM_CIRCLES = (NUMBER_OF_COLS / 2) * (NUMBER_OF_ROWS / 2)
    // const NUMBER_OF_BIG_CIRCLES = 4

    // const TOTAL_CIRCLES = NUMBER_OF_BIG_CIRCLES + NUMBER_OF_MEDIUM_CIRCLES + NUMBER_OF_SMALL_CIRCLES


    const parentSvg = document.getElementById("circle-parent")
    parentSvg.style.width = oneBoxWidth * NUMBER_OF_COLS
    parentSvg.style.height = oneBoxWidth * NUMBER_OF_ROWS


    // // small
    for (let col = 0; col < NUMBER_OF_COLS; col += 1) {
        for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
            circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth, SMALL))
        }
    }

    // // medium
    for (let col = 0; col < NUMBER_OF_COLS / 2; col += 1) {
        for (let row = 0; row < NUMBER_OF_ROWS / 2; row += 1) {
            circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 2, MEDIUM))
        }
    }

    // large 1 for each quadrant - special case needed 
    for (let col = 0; col < NUMBER_OF_COLS / 2; col += 1) {
        for (let row = 0; row < NUMBER_OF_ROWS / 2; row += 1) {
            circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 4, LARGE))
        }
    }


    console.log(
        'wait 3 seconds'
    )
    setTimeout(() => {
        startMotion()
        // window.addEventListener('keydown', onKeyPress)
    }, 3000)

    // position center of animation plane
    const centralCircle = document.getElementById("central-fix")
    centralCircle.style.fill = 'black'
    centralCircle.style.cx = oneBoxWidth * NUMBER_OF_COLS / 2
    centralCircle.style.cy = oneBoxWidth * NUMBER_OF_ROWS / 2

    anime({
        targets: "#central-fix",
        opacity: [0, 1],
        r: [0, 5],
        duration: 500,
        easing: "linear"
    })

}

export const exit = () => {
    circles.forEach(el => el.destroy())
    circles = []
}


// preparation
const getScreenSize = () => {
    const screensize = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }
    console.log(screensize)
    // not allowed if under certain dim
    return screensize
}


const delayTimer = ms => new Promise(resolve => setTimeout(resolve, ms))
async function startMotion() {
    const shuffled = shuffle(circles)
    for (let i = 0; i < shuffled.length; i += 1) {
        if (i === 0) console.log("START!")
        let waitTime = getRandomInt(300, 3000)
        await shuffled[i].animate()
        console.log("waitTime: ", waitTime)
        await delayTimer(waitTime)
    }
    console.log("DONE")
}


