import anime from 'animejs'
import { getScreenSize } from './game/gameBegin'
import getRandomFloat from './utils/getRandomFloat'

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
            x: getRandomFloat(0, this.screensize.width),
            y: getRandomFloat(0, this.screensize.height),
        }
    }

    animate = () => {
        this.coords = []
        const MOVEMENT_COORDS_COUNT = 30
        const tl = anime.timeline({ loop: false, targets: this.circle })
        for (let i = 0; i < MOVEMENT_COORDS_COUNT; i += 1) {
            this.coords[i] = this.generateMovementCoordinates()
            tl.add({
                cx: this.coords[i].x,
                cy: this.coords[i].y,
                duration: 3000,
                easing: "easeOutSine",
                fill: ["#ff0000", "#000fff", "#ffff00", "#00ff00"]
            })
        }
        tl.complete = () => this.animate()

    }

}