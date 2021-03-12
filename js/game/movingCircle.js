import anime from 'animejs'


import getRandomItem from '../utils/getRandomItem'
import shuffle from '../utils/shuffle'
import { SMALL, MEDIUM, LARGE } from './gameBegin'

export class MovingCircle {
    // represent 1 moving circle
    constructor(parentSvg, col, row, box_width, size, colormode) {
        this.colormode = colormode
        this.size = size
        this.box_width = box_width
        this.circleIndex = `${row}-${col}-${size}`
        this.col = col
        this.row = row
        this.parentSvg = parentSvg
        this.circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        this.config = this.generateCircleConfig()

        this.circle.setAttributeNS(null, 'cx', this.config.cx);
        this.circle.setAttributeNS(null, 'cy', this.config.cy);
        this.circle.setAttributeNS(null, 'r', this.config.r);
        this.circle.setAttributeNS(null, "class", "moving")
        this.circle.setAttributeNS(null, "id", this.circleIndex)
        this.setColor()
        // this.circle.setAttributeNS(null, 'style', `fill: none; stroke: #000; stroke-width: 1px`);
        this.circle.style.transformOrigin = `${this.config.xOrigin}px ${this.config.yOrigin}px`
        parentSvg.appendChild(this.circle)

        // show all temp 
        // this.show()
        // this.animate()
    }
    setColor = () => {
        // console.log(this.colormode)
        if (this.colormode === "kw") {
            this.circle.setAttributeNS(null, 'style', `fill: none; stroke: #000; stroke-width: 1px`);
            this.colorComb = ["none", "none"]
        } else {
            // set later - need animate
            this.circle.setAttributeNS(null, 'style', `stroke: none; stroke-width: 0px`);
            this.colormode === "rg" ? this.colorComb = ["#FF0000", "#00FF00"] : this.colorComb = ["#FFFF00", "#0000FF"]
        }
        // console.log(this.colorComb)
    }

    generateCircleConfig() {
        // fix position based on row col box width
        let r = this.size == SMALL ? 4 : this.size === MEDIUM ? 10 : 25


        let rotationRadius = this.box_width / 2 - (2 * r)
        let xOrigin = this.col * this.box_width + this.box_width / 2
        let yOrigin = this.row * this.box_width + this.box_width / 2

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
        // save the time

        // seek the end to trigger complete -> resolve
        this.animId.seek(this.animId.duration)
        this.stopAnimate()
    }

    onKeyDownEctopic = (ev) => {
        ev.preventDefault()
        if (ev.code !== "Space") return;
        console.log(this.animIdEctopic.progress, "ECTOPIC")
        // save the time
    }

    animate = () => {
        let direction = getRandomItem([1, -1])

        // console.log(this.colorComb)
        window.addEventListener("keydown", this.onKeyDown)
        return new Promise(resolve => {
            this.animId = anime({
                targets: this.circle,
                duration: () => 750,
                easing: "linear",
                rotate: [0, 720 * direction],
                autoplay: false,
                fill: shuffle([this.colorComb[0], this.colorComb[1]]),
                loop: false,
                begin: () => {
                    console.log("BEGIN")
                    this.show()
                },
                // currently trigger twice
                complete: () => {
                    // console.log("COMPLETE")
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

    postAnimate(waitTime) {
        window.addEventListener("keydown", this.onKeyDownEctopic)
        return new Promise(resolve => {
            this.animIdEctopic = anime({
                duration: waitTime,
                autoplay: false,
                loop: false,
                begin: () => {
                    console.log("WAIT BEGIN")
                },
                // currently trigger twice
                complete: () => {
                    console.log("WAIT COMPLETE")
                    window.removeEventListener("keydown", this.onKeyDownEctopic)
                    resolve()
                },
            })

            this.animIdEctopic.play()
        })
    }

}

