import anime from 'animejs'


const init = (screenSize) => {
    console.log(screenSize)
    const centralCircle = document.getElementById("central-fix")
    centralCircle.style.fill = 'black'
    centralCircle.style.cx = screenSize.width / 2
    centralCircle.style.cy = screenSize.height / 2
    const timeline = anime.timeline()
    timeline.add({
        targets: "#central-fix",
        opacity: [0, 1],
        r: [0, screenSize.width / 200],
        duration: 500,
        easing: "linear"
    })



    // test rotating pos
    const movingCircle = document.getElementById("moving")
    movingCircle.style.fill = 'red'
    let circleRadius = 10 // can be random
    let rotationRadius = 100 // can be random
    let swingTotalLength = (2 * circleRadius) + rotationRadius

    let minCenterX = swingTotalLength
    let maxCenterX = screenSize.width - swingTotalLength
    let minCenterY = swingTotalLength
    let maxCenterY = screenSize.height - swingTotalLength

    movingCircle.style.cx = minCenterX + Math.cos(Math.PI / 4) * rotationRadius
    movingCircle.style.cy = minCenterY + Math.sin(Math.PI / 4) * rotationRadius
    movingCircle.style.r = circleRadius
    movingCircle.style.transformOrigin = `${minCenterX}px ${minCenterY}px`

    anime({
        targets: movingCircle,
        duration: 3000,
        loop: true,
        rotate: [0, 360],
        easing: "linear"
    })



    // test - to be removed (for vis only)
    const rotationCenter = document.getElementById("rotation-center")
    rotationCenter.style.fill = 'green'
    rotationCenter.style.cx = minCenterX
    rotationCenter.style.cy = minCenterY
    rotationCenter.style.r = 2
    // 

}


export default init