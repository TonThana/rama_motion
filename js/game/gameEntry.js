
import gameBegin from './gameBegin'


const main = () => {
    // get screen size
    // how many of the screen's actual pixels should be used to draw a single CSS pixel.
    // const { devicePixelRatio } = window
    // console.log("window.screen.width", window.screen.width)
    // console.log("window.devicePixelRatio", devicePixelRatio)
    // console.log("window.screen.availWidth", window.screen.availWidth)
    // console.log("window.innerWidth", window.innerWidth)
    // console.log("document.body.clientWidth", document.body.clientWidth)
    const screenSize = getScreenSize()

    // components
    // 1) central black dot (fix pos)
    // 2) rotating colored dot 
    gameBegin(screenSize)
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

export default main