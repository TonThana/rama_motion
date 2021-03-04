const regis = () => {
    const formEl = document.querySelector(".regis-form")
    formEl.addEventListener('submit', formSubmit)
}


const formSubmit = (ev) => {
    let errorText = "hey!"
    const formErrorEl = document.getElementById("form-error")
    ev.preventDefault()
    formErrorEl.classList.remove('error-hidden')

    if (!ev.target.name.value && !ev.target.hn.value) {
        errorText = "โปรดเติมอย่างน้อย 1 ช่อง"
        formErrorEl.innerHTML = errorText
        formErrorEl.style.color = '#ff6347'
        return;
    }
    if (ev.target.hn.value) {
        validateHN(ev.target.hn.value)
        return;
    }

    if (ev.target.name.value) {
        validateName(ev.target.name.value)
        return;
    }

    if (ev.target.name.value) {
        let stripped = ev.target.name.value.replace(/[\(\)\.\-\ ]/g, '')
        if (!stripped) {
            errorText = "โปรดเติมอย่างน้อย 1 ช่อง"
            formErrorEl.style.color = '#ff6347'
            formErrorEl.innerHTML = errorText
            return;
        }
    }

    formErrorEl.innerHTML = "OK!"
    formErrorEl.style.color = '#03c04a'

}

function mystrip(str) {
    return str.replace(/[^0-9a-z]/gi, '')
} 

const validateName = (name) => {
    let splitted = name.split(" ")
    let mergeName = mystrip(splitted[0]) + " " + mystrip(splitted[1])
    console.log(mergeName)
    console.log(splitted.length)
    console.log(mergeName-parseInt(mergeName))
    const formErrorEl = document.getElementById("form-error")
    if (splitted.length != 2) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "Please enter both of your name and surname"
    } else if (!isNaN(mergeName-parseInt(mergeName))) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "Name must not contain numbers"
    } else {
        formErrorEl.style.color = '#03c04a'
        formErrorEl.innerHTML = "OK!"
    }

}


const validateHN = (hn) => {
    let stripped = mystrip(hn)
    console.log(stripped)
    console.log(parseInt(stripped))
    const formErrorEl = document.getElementById("form-error")
    if (isNaN(stripped-parseInt(stripped))) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "เลขรพ.ควรมีแค่ตัวเลข"
    } else if (stripped.length != 7) {
        formErrorEl.style.color = '#ff6347'
        formErrorEl.innerHTML = "เลขรพ.มี 7 หลัก"
    } else {
        formErrorEl.innerHTML = "OK!"
        formErrorEl.style.color = '#03c04a'
    }
}


regis()