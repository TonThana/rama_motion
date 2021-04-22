import anime from 'animejs'

import getRandomItem from '../utils/getRandomItem'
import shuffle from '../utils/shuffle'
import { SMALL, MEDIUM } from './gameBegin'

export const ANIM_DURATION = 500

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

        // temp center
        // this.centercircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        // this.centercircle.setAttributeNS(null, 'cx', this.config.xOrigin);
        // this.centercircle.setAttributeNS(null, 'cy', this.config.yOrigin);
        // this.centercircle.setAttributeNS(null, 'fill', 'black');
        // this.centercircle.setAttributeNS(null, 'r', "10");
        // this.centercircle.style.transformOrigin = `${this.config.xOrigin}px ${this.config.yOrigin}px`
        // parentSvg.appendChild(this.centercircle)
    }

    collectData = () => {
        return {
            correctReaction: this.correctReaction || 101,
            ectopicReaction: this.ectopicReaction || 101,
            colorMode: this.colormode,
            size: this.size,
            col: this.col,
            row: this.row,
        }
    }

    setColor = () => {
        // console.log(this.colormode)
        if (this.colormode === "kw") {
            this.circle.setAttributeNS(null, 'style', `fill: black; stroke: #000; stroke-width: 2px`);
            this.colorComb = ["none", "none"]
        } else {
            // set later - need animate
            this.circle.setAttributeNS(null, 'style', ` stroke-width: 2px`);
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
        // console.log("destroy!")
    }

    onKeyDown = (ev) => {
        ev.preventDefault()
        if (ev.code !== "Space") return;
        // store stat
        // console.log(this.animId.progress, "correct")
        // save the time
        this.correctReaction = Number(this.animId.progress)
        // seek the end to trigger complete -> resolve
        this.animId.seek(this.animId.duration)
        this.stopAnimate()
    }

    onKeyDownEctopic = (ev) => {
        ev.preventDefault()
        if (ev.code !== "Space") return;
        // console.log(this.animIdEctopic.progress, "ectopic")
        this.ectopicReaction = Number(this.animIdEctopic.progress)
        // save the time
    }

    animate = () => {
        let direction = getRandomItem([1, -1])

        // console.log(this.colorComb)
        window.addEventListener("keydown", this.onKeyDown)
        return new Promise(resolve => {
            let color = shuffle([this.colorComb[0], this.colorComb[1]])

            let stroke = ["none", "none"]
            if (color[0] !== "none") {
                stroke[0] = this.pSBC(-0.5, color[0])
                stroke[1] = this.pSBC(-0.5, color[1])
            }
            // console.log(color, stroke)
            this.circle.setAttributeNS(null, 'fill', color[0])
            this.circle.setAttributeNS(null, 'stroke', stroke[0])
            this.animId = anime({
                targets: this.circle,
                duration: () => ANIM_DURATION,
                easing: "linear",
                rotate: [0, 720 * direction],
                autoplay: false,
                fill: {
                    value: color[1],
                    easing: "easeInOutExpo"
                },
                stroke: {
                    value: stroke[1],
                    easing: "easeInOutExpo"
                },
                loop: false,
                begin: () => {
                    // console.log("BEGIN")
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
                    // console.log("wait begin")
                },
                // currently trigger twice
                complete: () => {
                    // console.log("wait complete")
                    window.removeEventListener("keydown", this.onKeyDownEctopic)
                    resolve()
                },
            })

            this.animIdEctopic.play()
        })
    }


    pSBC = (p, c0, c1, l) => {
        let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
        if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
        if (!this.pSBCr) this.pSBCr = (d) => {
            let n = d.length, x = {};
            if (n > 9) {
                [r, g, b, a] = d = d.split(","), n = d.length;
                if (n < 3 || n > 4) return null;
                x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
            } else {
                if (n == 8 || n == 6 || n < 4) return null;
                if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                d = i(d.slice(1), 16);
                if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
                else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
            } return x
        };
        h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
        if (!f || !t) return null;
        if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
        else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
        a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
        if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
        else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
    }

}


