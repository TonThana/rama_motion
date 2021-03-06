import anime from 'animejs'
import getRandomInt from '../utils/getRandomInt'
import getRandomFloat from '../utils/getRandomFloat'

let SCREEN_WIDTH, SCREEN_HEIGHT

const init = (screenSize) => {
    SCREEN_WIDTH = screenSize.width
    SCREEN_HEIGHT = screenSize.height
    const centralCircle = document.getElementById("central-fix")
    centralCircle.style.fill = 'black'
    centralCircle.style.cx = SCREEN_WIDTH / 2
    centralCircle.style.cy = SCREEN_HEIGHT / 2
    const timeline = anime.timeline()
    timeline.add({
        targets: "#central-fix",
        opacity: [0, 1],
        r: [0, SCREEN_WIDTH / 200],
        duration: 500,
        easing: "linear"
    })

    genStaticCircleSvg()

    const movingCircles = document.querySelectorAll(".moving")
    movingCircles.forEach(el => {
        anime({
            targets: el,
            duration: () => getRandomFloat(200, 3000),
            loop: true,
            autoplay: false,
            easing: "linear",
            rotate: [0, 360]
        })
    })

}

const genCircleConfig = () => {
    let r = getRandomInt(2, 10)
    let rotationRadius = getRandomInt(2, 100)
    let swingTotalLength = (2 * r) + rotationRadius

    let minCenterX = swingTotalLength
    let maxCenterX = SCREEN_WIDTH - swingTotalLength
    let minCenterY = swingTotalLength
    let maxCenterY = SCREEN_HEIGHT - swingTotalLength

    // x and y Center of Rotation
    let xOrigin = getRandomFloat(minCenterX, maxCenterX)
    let yOrigin = getRandomFloat(minCenterY, maxCenterY)
    let cx = xOrigin + rotationRadius
    let cy = yOrigin + 0
    return { cx, cy, r, xOrigin, yOrigin }

}

// const SIZES = [0, 1, 2]
const NUMBER_OF_CIRCLES = 200 // 100 <circle></circle>
// sizes: 0 - small, 1 - middle, 2 - large
const genStaticCircleSvg = () => {
    const parentSvg = document.getElementById("circle-parent")
    for (let i = 0; i < NUMBER_OF_CIRCLES; i += 1) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        let config = genCircleConfig()
        circle.setAttributeNS(null, 'cx', config.cx);
        circle.setAttributeNS(null, 'cy', config.cy);
        circle.setAttributeNS(null, 'r', config.r);
        circle.setAttributeNS(null, "class", "moving")
        circle.setAttributeNS(null, "id", i)
        circle.setAttributeNS(null, 'style', `fill: none; stroke: blue; stroke-width: 1px`);
        circle.style.transformOrigin = `${config.xOrigin}px ${config.yOrigin}px`
        parentSvg.appendChild(circle)
    }
}







export default init