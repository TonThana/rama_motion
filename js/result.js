import { Control } from './control'


// In this case we can't access the SVG element directly as it's hidden inside the <object> element. So first, we have to get the object and then access its contentDocument. Once we have the SVG document, we can continue as before.
export const resultEntry = (result) => {
    const resultObj = document.getElementById("result-svg-object")

    resultObj.addEventListener('load', () => {
        const svgDoc = resultObj.contentDocument
        renderResult(svgDoc, result)
    })
    // result.forEach(resItem => {
    //     const id = `${resItem.col}-${resItem.row}-${(resItem.size).toLowerCase()}`
    //     const correspondingSvg = resultObj.getElementById(id)
    //     console.log(correspondingSvg)
    // })
}

const renderResult = (svgDoc, result) => {
    let correctReactionTimeR = 2
    const svgGroup = svgDoc.getElementById("layer1")
    result.forEach(resItem => {
        const id = `${resItem.col}-${resItem.row}-${(resItem.size).toLowerCase()}`
        const correspondingSvg = svgDoc.getElementById(id)
        // tab ( fill white ) or not ( fill black )

        if (resItem.hasOwnProperty("correctReaction") && resItem.correctReaction !== 101) {
            correspondingSvg.style.fill = "#fff"
            // correct reaction time graph

            const correctReactionTime = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
            const cx = correspondingSvg.getAttributeNS(null, 'cx')
            const cy = correspondingSvg.getAttributeNS(null, 'cy')
            const r = correspondingSvg.getAttributeNS(null, 'r')
            correctReactionTime.setAttributeNS(null, 'cx', cx)
            correctReactionTime.setAttributeNS(null, 'cy', cy)
            correctReactionTime.setAttributeNS(null, 'r', Number(r) + correctReactionTimeR)
            correctReactionTime.style.fill = "none"
            correctReactionTime.style.strokeWidth = 2
            correctReactionTime.style.stroke = "#8abaae"


            svgGroup.appendChild(correctReactionTime)

            const pathLength = correctReactionTime.getTotalLength()
            correctReactionTime.setAttributeNS(null, 'stroke-dasharray', pathLength)
            correctReactionTime.setAttributeNS(null, 'stroke-dashoffset', "-10")
            correctReactionTime.style.transformOrigin = `${cx}px ${cy}px`
            correctReactionTime.style.transform = "rotate(-90deg)"

        } else {
            correspondingSvg.style.fill = "#000"
        }
    })
}