import { Control } from './control'


// In this case we can't access the SVG element directly as it's hidden inside the <object> element. So first, we have to get the object and then access its contentDocument. Once we have the SVG document, we can continue as before.
export const resultEntry = (result) => {
    console.log(result[0])
    // check if result is bw or colored
    if (result[0].colorMode === "kw") {

        const resultObj = document.getElementById("result-svg-object")
        document.getElementById("blackwhite").classList.remove("off")
        resultObj.addEventListener('load', () => {
            const svgDoc = resultObj.contentDocument
            renderResult(svgDoc, result)

        })

    } else {
        // separate into by and rg
        const blueyellow = result.filter(function (resItem) {
            return resItem.colorMode === "by"
        });
        const redgreen = result.filter(function (resItem) {
            return resItem.colorMode === "rg"
        });
        // append another table
        const resultObjBy = document.getElementById("result-svg-object-by")
        document.getElementById("blueyellow").classList.remove("off")
        resultObjBy.addEventListener('load', () => {
            const svgDoc = resultObjBy.contentDocument
            renderResult(svgDoc, blueyellow)

        })

        document.getElementById("redgreen").classList.remove("off")
        const resultObjRg = document.getElementById("result-svg-object-rg")
        resultObjRg.addEventListener('load', () => {

            const svgDoc = resultObjRg.contentDocument
            renderResult(svgDoc, redgreen)

        })


    }




}

const renderResult = (svgDoc, result) => {
    let correctReactionTimeR = 2
    let ectopicReactionTimeR = 4
    const svgGroup = svgDoc.getElementById("layer1")
    result.forEach(resItem => {
        const id = `${resItem.col}-${resItem.row}-${(resItem.size).toLowerCase()}`
        const correspondingSvg = svgDoc.getElementById(id)
        const cx = correspondingSvg.getAttributeNS(null, 'cx')
        const cy = correspondingSvg.getAttributeNS(null, 'cy')
        const r = correspondingSvg.getAttributeNS(null, 'r')
        // tab ( fill white ) or not ( fill black )

        if (resItem.hasOwnProperty("correctReaction") && resItem.correctReaction !== 101) {
            correspondingSvg.style.fill = "#fff"
            // correct reaction time graph

            const correctReactionTime = document.createElementNS("http://www.w3.org/2000/svg", 'circle')

            correctReactionTime.setAttributeNS(null, 'cx', cx)
            correctReactionTime.setAttributeNS(null, 'cy', cy)
            correctReactionTime.setAttributeNS(null, 'r', Number(r) + correctReactionTimeR)
            correctReactionTime.style.fill = "none"
            correctReactionTime.style.strokeWidth = 1.5
            correctReactionTime.style.stroke = "#8abaae"


            svgGroup.appendChild(correctReactionTime)

            // console.log(correctReactionTime, resItem["correctReaction"])

            // reaction time
            const pathLength = correctReactionTime.getTotalLength()
            correctReactionTime.setAttributeNS(null, 'stroke-dasharray', pathLength)
            const x = pathLength * (100 - resItem["correctReaction"]) / 100

            correctReactionTime.setAttributeNS(null, 'stroke-dashoffset', x * -1)
            correctReactionTime.style.transformOrigin = `${cx}px ${cy}px`
            correctReactionTime.style.transform = "rotate(-90deg)"

        } else {
            // missed
            correspondingSvg.style.fill = "#000"
        }

        if (resItem.hasOwnProperty("ectopicReaction") && resItem.ectopicReaction !== 101) {

            const ectopicReactionTime = document.createElementNS("http://www.w3.org/2000/svg", 'circle')

            ectopicReactionTime.setAttributeNS(null, 'cx', cx)
            ectopicReactionTime.setAttributeNS(null, 'cy', cy)
            ectopicReactionTime.setAttributeNS(null, 'r', Number(r) + ectopicReactionTimeR)
            ectopicReactionTime.style.fill = "none"
            ectopicReactionTime.style.strokeWidth = 1.5
            ectopicReactionTime.style.stroke = "#fa8128"

            svgGroup.appendChild(ectopicReactionTime)
            const pathLength = ectopicReactionTime.getTotalLength()

            ectopicReactionTime.setAttributeNS(null, 'stroke-dasharray', pathLength)
            const x = pathLength * (100 - resItem["ectopicReaction"]) / 100

            ectopicReactionTime.setAttributeNS(null, 'stroke-dashoffset', x * -1)
            ectopicReactionTime.style.transformOrigin = `${cx}px ${cy}px`
            ectopicReactionTime.style.transform = "rotate(-90deg)"
            // console.log(ectopicReactionTime, resItem.ectopicReaction)
        }
    })
}