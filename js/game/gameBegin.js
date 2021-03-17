import anime from 'animejs'
import 'regenerator-runtime/runtime'
import getRandomInt from '../utils/getRandomInt'
import { MovingCircle } from './movingCircle'
import shuffle from '../utils/shuffle'
import Control from '../control'

// some variables
let SCREEN_WIDTH, SCREEN_HEIGHT
let circles = []
export const SMALL = "small"
export const MEDIUM = "medium"
export const LARGE = "large"
// show rules modal
let info = null

export const game_init = (data) => {
    info = data
    const mode = data.testType
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
    const NUMBER_OF_COLS = 12
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
    if (mode === 'blackwhite') {
        // // // small
        for (let col = 0; col < NUMBER_OF_COLS; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth, SMALL, "kw"))
            }
        }
        // // // medium
        for (let col = 0; col < NUMBER_OF_COLS / 2; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS / 2; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 2, MEDIUM, "kw"))
            }
        }
        // // // large 1 for each quadrant - special case needed 
        for (let col = 0; col < NUMBER_OF_COLS / 4; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS / 4; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 4, LARGE, "kw"))
            }
        }
    } else if (mode === 'colored') {
        // 2nd test
        // small 1
        for (let col = 0; col < NUMBER_OF_COLS; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth, SMALL, "rg"))
            }
        }
        // medium 1
        for (let col = 0; col < NUMBER_OF_COLS / 2; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS / 2; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 2, MEDIUM, "rg"))
            }
        }
        // large 1 for each quadrant - special case needed 
        for (let col = 0; col < NUMBER_OF_COLS / 4; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS / 4; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 4, LARGE, "rg"))
            }
        }
        // small 2
        for (let col = 0; col < NUMBER_OF_COLS; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth, SMALL, "by"))
            }
        }
        // medium 2
        for (let col = 0; col < NUMBER_OF_COLS / 2; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS / 2; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 2, MEDIUM, "by"))
            }
        }
        // large 2 
        for (let col = 0; col < NUMBER_OF_COLS / 4; col += 1) {
            for (let row = 0; row < NUMBER_OF_ROWS / 4; row += 1) {
                circles.push(new MovingCircle(parentSvg, col, row, oneBoxWidth * 4, LARGE, "by"))
            }
        }
    }



    // console.log(
    //     'wait 3 seconds'
    // )
    setTimeout(() => {
        startMotion()
        // external key event - detect erroneous pressing
        // window.addEventListener('keydown', onKeyPress)
    }, 3000)

    // position center of animation plane
    const centralCircle = document.getElementById("central-fix")
    centralCircle.style.fill = 'black'
    // console.log(oneBoxWidth * NUMBER_OF_COLS / 2)
    centralCircle.setAttributeNS(null, 'cx', oneBoxWidth * NUMBER_OF_COLS / 2)
    centralCircle.setAttributeNS(null, 'cy', oneBoxWidth * NUMBER_OF_ROWS / 2)

    console.log(centralCircle)

    anime({
        targets: "#central-fix",
        opacity: [0, 1],
        r: [0, 5],
        duration: 500,
        easing: "linear"
    })

}

export const game_exit = () => {
    circles.forEach(el => el.destroy())
    circles = []
}


// preparation
export const getScreenSize = () => {
    const screensize = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
    }
    // not allowed if under certain dim
    return screensize
}


// const delayTimer = ms => new Promise(resolve => setTimeout(resolve, ms))

async function startMotion() {
    const shuffled = shuffle(circles)
    for (let i = 0; i < shuffled.length; i += 1) {
        // if (i === 0) console.log("START!")
        // lengthen duration actual
        let waitTime = getRandomInt(500, 2000)
        await shuffled[i].animate()
        // console.log("waitTime: ", waitTime)
        // 0 -> waitTime
        await shuffled[i].postAnimate(waitTime)
    }
    // console.log("collecting data")
    let endData = []
    for (let i = 0; i < shuffled.length; i += 1) {
        let endResult = shuffled[i].collectData()
        endResult['index'] = i
        endData.push(endResult)
    }
    // console.log(endData)
    // TODO: -> result page
    Control.show('result', [endData, info])
}


