const regis = () => {
    const formEl = document.querySelector(".regis-form")
    formEl.addEventListener('submit', formSubmit)
}

const formSubmit = (ev) => {
    let errorText = "hey!"
    const formErrorEl = document.getElementById("form-error")
    ev.preventDefault()
    formErrorEl.classList.remove('error-hidden')
    // console.log(ev.target.name.value)
    // console.log(ev.target.hn.value)
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


const validateHN = (hn) => {
    let stripped = hn.replace(/[\(\)\.\-\ ]/g, '')
    const formErrorEl = document.getElementById("form-error")
    if (isNaN(parseInt(stripped))) {
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