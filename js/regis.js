import Control from './control'


const data = {}
export const regis = () => {
    const formEl = document.querySelector(".regis-form")
    formEl.removeEventListener('submit', formSubmit)
    formEl.addEventListener('submit', formSubmit)
}



function mystrip(str) {
    return str.replace(/[^0-9a-z]/gi, '')
}

function reportError(target, errorText) {
    target.style.color = '#ff6347'
    target.innerHTML = errorText
}

function okProceed(target) {
    target.style.color = '#03c04a'
    target.innerHTML = "OK!"
    // console.log("PROCEED")
    Control.show("rule", [data])
    return
}

function tempBypass() {
    data.name = "test ton"
    data.testType = "colored"
    data.eye = "both"
    data.hn = "4567891"
    Control.show("rule", [data])
}

const formSubmit = (ev) => {
    ev.preventDefault()
    // tempBypass()
    // return;
    let errorText = "hey!"
    const formErrorEl = document.getElementById("form-error")

    formErrorEl.classList.remove('error-hidden')


    data.name = ev.target.name.value
    data.hn = ev.target.hn.value
    data.testType = document.getElementById("test").value
    data.eye = document.getElementById("eye").value

    if (data.testType === '' || data.eye === '') {
        errorText = "โปรดเลือกประเภทการทดสอบให้ครบ"
        reportError(formErrorEl, errorText)
        return;
    }

    if (!data.name && !data.hn) {
        //console.log('C1')
        errorText = "โปรดใส่ตัวตนอย่างน้อย 1 ช่อง"
        reportError(formErrorEl, errorText)
        return;
    }

    const validateArr = []
    if (data.name) validateArr.push(validateName(data.name))
    if (data.hn) validateArr.push(validateHN(data.hn))
    // console.log(validateArr)
    let success = true
    validateArr.forEach(b => {
        if (!b) {
            success = false
        }
    })
    if (success) {
        okProceed(formErrorEl)
    }
}

const validateName = (name) => {
    let errorText = "hey!"
    let successState = false
    let splitted = name.split(" ")
    const formErrorEl = document.getElementById("form-error")
    formErrorEl.classList.remove('error-hidden')
    if (splitted.length != 2) {
        errorText = "ใส่ทั้งชื่อและนามสกุล"
        reportError(formErrorEl, errorText)
        return successState
    } else {
        if (mystrip(splitted[0]).length == 0 || mystrip(splitted[1]).length == 0) {
            errorText = "ใส่ทั้งชื่อและนามสกุล"
            reportError(formErrorEl, error)
            return successState
        } else {
            let mergeName = mystrip(splitted[0]) + " " + mystrip(splitted[1])
            if ((/\d/.test(mergeName))) {
                errorText = "ชื่อไม่ควรมีตัวเลข"
                reportError(formErrorEl, error)
                return successState
            } else {
                return successState = true
            }
        }
    }
}

const validateHN = (hn) => {
    let successState = false
    let stripped = mystrip(hn)
    let errorText
    const formErrorEl = document.getElementById("form-error")
    formErrorEl.classList.remove('error-hidden')
    if (isNaN(stripped - parseInt(stripped))) {
        errorText = "เลขรพ.ควรมีแค่ตัวเลข"
        reportError(formErrorEl, errorText)
        return successState
    } else if (stripped.length != 7) {
        errorText = "เลขรพ.มี 7 หลัก"
        reportError(formErrorEl, errorText)
        return successState
    } else {

        return successState = true
    }
}

regis()