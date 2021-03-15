import { Control } from './control'
import { mean, standardDeviation } from 'simple-statistics'

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
        // blue-yellow
        const resultObjBy = document.getElementById("result-svg-object-by")
        document.getElementById("blueyellow").classList.remove("off")
        resultObjBy.addEventListener('load', () => {
            const svgDoc = resultObjBy.contentDocument
            renderResult(svgDoc, blueyellow)

        })
        const numericalBy = document.getElementById("blueyellow-numerical")
        let numericalResult = numericalSummary(blueyellow)

        numericalBy.innerHTML = numericalResult



        // red-green
        document.getElementById("redgreen").classList.remove("off")
        const resultObjRg = document.getElementById("result-svg-object-rg")
        resultObjRg.addEventListener('load', () => {

            const svgDoc = resultObjRg.contentDocument
            renderResult(svgDoc, redgreen)

        })
        const numericalRg = document.getElementById("redgreen-numerical")
        numericalResult = numericalSummary(redgreen)

        numericalRg.innerHTML = numericalResult

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

        }
    })
}


const numericalSummary = (result) => {
    const total = result.length


    let pureCorrect = result.filter((res) => {
        return res.correctReaction !== 101 && res.ectopicReaction === 101
    })
    let pureCorrectTime = []
    pureCorrect.forEach(p => pureCorrectTime.push(p.correctReaction))

    let pureCorrectSmall = pureCorrect.filter((res) => {
        return res.size === 'small'
    })
    let pureCorrectMedium = pureCorrect.filter((res) => {
        return res.size === 'medium'
    })
    let pureCorrectLarge = pureCorrect.filter((res) => {
        return res.size === 'large'
    })
    let pureCorrectSmallTime = []
    pureCorrectSmall.forEach(p => pureCorrectSmallTime.push(p.correctReaction))

    let pureCorrectMediumTime = []
    pureCorrectMedium.forEach(p => pureCorrectMediumTime.push(p.correctReaction))

    let pureCorrectLargeTime = []
    pureCorrectLarge.forEach(p => pureCorrectLargeTime.push(p.correctReaction))

    const numericalResult = {
        total: total,
        pureCorrectCount: pureCorrectTime.length,
        pureCorrectMean: mean(pureCorrectTime),
        pureCorrectSd: standardDeviation(pureCorrectTime),
        // small
        pureCorrectSmallCount: pureCorrectSmallTime.length,
        pureCorrectSmallMean: mean(pureCorrectSmallTime),
        pureCorrectSmallSd: standardDeviation(pureCorrectSmallTime),
        // medium
        pureCorrectMediumCount: pureCorrectMediumTime.length,
        pureCorrectMediumMean: mean(pureCorrectMediumTime),
        pureCorrectMediumSd: standardDeviation(pureCorrectMediumTime),
        // large
        pureCorrectLargeCount: pureCorrectLargeTime.length,
        pureCorrectLargeMean: mean(pureCorrectLargeTime),
        pureCorrectLargeSd: standardDeviation(pureCorrectLargeTime)
    }
    return `<div class='numerical'>
        <div>correct count: ${numericalResult.pureCorrectCount}/${numericalResult.total}</div>
        <div>correct mean: ${numericalResult.pureCorrectMean.toFixed(2)}&#xb1;${(numericalResult.pureCorrectSd).toFixed(2)}%</div>
        <div>small correct count: ${numericalResult.pureCorrectSmallCount}/96</div>
        <div>small correct mean: ${numericalResult.pureCorrectSmallMean.toFixed(2)}&#xb1;${(numericalResult.pureCorrectSmallSd).toFixed(2)}%</div>
        <div>medium correct count: ${numericalResult.pureCorrectMediumCount}/24</div>
        <div>medium correct mean: ${numericalResult.pureCorrectMediumMean.toFixed(2)}&#xb1;${(numericalResult.pureCorrectMediumSd).toFixed(2)}%</div>
        <div>large correct count: ${numericalResult.pureCorrectLargeCount}/6</div>
        <div>large correct mean: ${numericalResult.pureCorrectLargeMean.toFixed(2)}&#xb1;${(numericalResult.pureCorrectLargeSd).toFixed(2)}%</div>
        </div>`
}