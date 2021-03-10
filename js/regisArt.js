import anime from 'animejs'
import { getScreenSize } from './game/gameBegin'
import getRandomFloat from './utils/getRandomFloat'
import shuffle from './utils/shuffle'

export default class RegisLandingArt {
    constructor() {
        this.circle = document.getElementById("regis-art-circle")

        this.circle.setAttributeNS(null, 'cx', '200px');
        this.circle.setAttributeNS(null, 'cy', '200px');
        this.circle.setAttributeNS(null, 'r', '5px');
        this.circle.setAttributeNS(null, 'opacity', '0.5');
        this.screensize = getScreenSize()
        this.coords = []
        this.animate()
    }

    generateMovementCoordinates = () => {
        return {
            x: getRandomFloat(0, this.screensize.width - 20),
            y: getRandomFloat(0, this.screensize.height - 20),
        }
    }

    animate = () => {

        const MOVEMENT_COORDS_COUNT = 30
        const tl = anime.timeline({ loop: false, targets: this.circle })
        for (let i = 0; i < MOVEMENT_COORDS_COUNT; i += 1) {
            let { x, y } = this.generateMovementCoordinates()
            console.log(x, y)
            tl.add({
                cx: x,
                cy: y,
                duration: 3000,
                easing: "easeOutSine",
                fill: shuffle(["#ff0000", "#000fff", "#ffa500 ", "#00ff00"]),
                complete: () => this.circle.style.transformOrigin = `${x - 20}px ${y}px`
            }).add({
                rotate: [0, 360],
                duration: 1000,
                easing: "linear"
            })
        }
        tl.complete = () => this.animate()

    }

}