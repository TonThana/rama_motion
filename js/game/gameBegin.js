import anime from 'animejs'
import { MovingCircle } from './movingCircle'

let SCREEN_WIDTH, SCREEN_HEIGHT
let circles = []
export const init = () => {
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

    window.addEventListener('keydown', onKeyPress
    )
}

export const exit = () => {
    circles.forEach(el => el.destroy())
    circles = []
    window.removeEventListener('keydown', onKeyPress)
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

let counter = 0
const onKeyPress = (ev) => {
    ev.preventDefault()
    if (counter < circles.length) {
        if (counter > 0) {
            circles[counter - 1].stopAnimate()
        }
        circles[counter].animate()
        counter += 1
    }
}