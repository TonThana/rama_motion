import anime from 'animejs'

import getRandomInt from '../utils/getRandomInt'
import getRandomFloat from '../utils/getRandomFloat'


export class MovingCircle {
    // represent 1 moving circle
    constructor(parentSvg, index, SCREEN_WIDTH, SCREEN_HEIGHT) {
        this.screen_width = SCREEN_WIDTH
        this.screen_height = SCREEN_HEIGHT
        this.circleIndex = index
        this.parentSvg = parentSvg
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        this.config = this.generateCircleConfig()
        this.circle.setAttributeNS(null, 'cx', this.config.cx);
        this.circle.setAttributeNS(null, 'cy', this.config.cy);
        this.circle.setAttributeNS(null, 'r', this.config.r);
        this.circle.setAttributeNS(null, "class", "moving")
        this.circle.setAttributeNS(null, "id", this.circleIndex)
        this.circle.setAttributeNS(null, 'style', `fill: none; stroke: blue; stroke-width: 1px`);
        this.circle.style.transformOrigin = `${this.config.xOrigin}px ${this.config.yOrigin}px`
        parentSvg.appendChild(this.circle)
    }

    generateCircleConfig = () => {
        let r = getRandomInt(2, 10)
        let rotationRadius = getRandomInt(2, 100)
        let swingTotalLength = (2 * r) + rotationRadius

        let minCenterX = swingTotalLength
        let maxCenterX = this.screen_width - swingTotalLength
        let minCenterY = swingTotalLength
        let maxCenterY = this.screen_height - swingTotalLength

        // x and y Center of Rotation
        let xOrigin = getRandomFloat(minCenterX, maxCenterX)
        let yOrigin = getRandomFloat(minCenterY, maxCenterY)
        let cx = xOrigin + rotationRadius
        let cy = yOrigin + 0
        return { cx, cy, r, xOrigin, yOrigin }
    }

    getConfig() {
        return this.config
    }

    destroy() {
        // remove dom
        this.circle.remove()
    }

    animate() {
        this.animId = anime({
            targets: this.circle,
            duration: () => getRandomInt(300, 3000),
            easing: "linear",
            rotate: [0, 360],
            autoplay: false,
            loop: true
        })
        this.animId.play()
    }

    stopAnimate() {
        this.animId.pause()
    }

    // some type of counter
}

