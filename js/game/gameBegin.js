import anime from 'animejs'


const init = (screenSize) => {
    console.log(screenSize)
    const centralCircle = document.getElementById("central-fix")
    centralCircle.style.fill = 'black'
    centralCircle.style.cx = screenSize.width / 2,
        centralCircle.style.cy = screenSize.height / 2,
        anime({
            targets: "#central-fix",
            opacity: [0, 1],
            r: [0, 5],
            duration: 500,
            easing: "linear"
        })

}


export default init