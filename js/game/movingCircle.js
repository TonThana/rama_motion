import anime from 'animejs'

import getRandomInt from '../utils/getRandomInt'
import getRandomFloat from '../utils/getRandomFloat'
import getRandomItem from '../utils/getRandomItem'


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
        // randomisation is current independent from one another

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
        let iAngle = 2 * Math.PI * Math.random()
        let cx = xOrigin + rotationRadius * Math.cos(iAngle)
        let cy = yOrigin + rotationRadius * Math.sin(iAngle)
        return { cx, cy, r, xOrigin, yOrigin }
    }

    getConfig() {
        return this.config
    }

    destroy() {
        // remove dom
        this.circle.remove()
        console.log("destroy!")
    }

    onKeyDown = (ev) => {
        ev.preventDefault()
        if (ev.code !== "Space") return;
        // store stat
        console.log(this.animId.progress)

        // seek the end to trigger complete -> resolve
        this.animId.seek(this.animId.duration)
        this.stopAnimate()
    }

    animate() {
        let direction = getRandomItem([1, -1])
        window.addEventListener("keydown", this.onKeyDown)
        return new Promise(resolve => {
            this.animId = anime({
                targets: this.circle,
                duration: () => getRandomInt(200, 6000),
                easing: "linear",
                rotate: [0, 720 * direction],
                autoplay: false,
                loop: false,
                begin: () => {
                    console.log("BEGIN")
                    this.show()
                },
                // currently trigger twice
                complete: () => {
                    console.log("COMPLETE")
                    this.stopAnimate()
                    resolve()
                },

            })

            this.animId.play()
        })

    }

    stopAnimate() {

        window.removeEventListener("keydown", this.onKeyDown)
        // this.animId.pause()
        this.unshow()
    }

    show() {
        this.circle.classList.add("show")
    }

    unshow() {
        this.circle.classList.remove("show")
    }

}

