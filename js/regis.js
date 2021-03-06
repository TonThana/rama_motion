const regis = () => {
    const formEl = document.querySelector(".regis-form")
    formEl.addEventListener('submit', formSubmit)
}


function mystrip(str) {
    return str.replace(/[^0-9a-z]/gi, '')
} 

const formSubmit = (ev) => {
    let errorText = "hey!"
    const formErrorEl = document.getElementById("form-error")
    ev.preventDefault()
    formErrorEl.classList.remove('error-hidden')
    console.log('hey')
    if (!ev.target.name.value && !ev.target.hn.value) {
        console.log('C1')
        errorText = "โปรดเติมอย่างน้อย 1 ช่อง"
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = errorText
        return;

    } else if (ev.target.name.value && !ev.target.hn.value) {
        console.log('C2')
        validateName(ev.target.name.value)
        return;

    } else if (!ev.target.name.value && ev.target.hn.value) {
        console.log('C3')
        validateHN(ev.target.hn.value)
        return;

    } else {
        console.log('C4')
        if (validateName(ev.target.name.value) && validateHN(ev.target.hn.value)) {
            console.log("case1")
            validateName(ev.target.name.value)
            return;
        } else if (!validateName(ev.target.name.value) && validateHN(ev.target.hn.value)) {
            console.log("case2")
            validateName(ev.target.name.value)
            return;
        } else if (validateName(ev.target.name.value) && !validateHN(ev.target.hn.value)) {
            console.log("case3")
            validateHN(ev.target.hn.value)
            return;
        } else {
            console.log("case4")
            formErrorEl.style.color = '#ff6347'
            formErrorEl.innerHTML = "Name and HN are incorrect"
            return;
        }
        
    }

}


const validateName = (name) => {
    let successState = false
    let splitted = name.split(" ")
    const formErrorEl = document.getElementById("form-error")
    formErrorEl.classList.remove('error-hidden')
    if (splitted.length != 2) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "Please enter both of your name and surname"
        return successState
    } else {
        if (mystrip(splitted[0]).length == 0 || mystrip(splitted[1]).length == 0) {
            formErrorEl.style.color = '#ff6347'
            formErrorEl.innerHTML = "Please enter both of your name and surname"
            return successState
        } else {
            let mergeName = mystrip(splitted[0]) + " " + mystrip(splitted[1])
            if ((/\d/.test(mergeName))) {
                formErrorEl.style.color = '#ff6347'
                formErrorEl.innerHTML = "Name must not contain numbers"
                return successState
            } else {
                formErrorEl.style.color = '#03c04a'
                formErrorEl.innerHTML = "OK!"
                return successState = true
            }
        
        }

    }
     
}


const validateHN = (hn) => {
    let successState = false
    let stripped = mystrip(hn)
    const formErrorEl = document.getElementById("form-error")
    formErrorEl.classList.remove('error-hidden')
    if (isNaN(stripped-parseInt(stripped))) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "เลขรพ.ควรมีแค่ตัวเลข"
        return successState
    } else if (stripped.length != 7) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "เลขรพ.มี 7 หลัก"
        return successState
    } else {
        formErrorEl.innerHTML = "OK!"
        formErrorEl.style.color = '#03c04a'
        return successState = true
    }
}


regis()