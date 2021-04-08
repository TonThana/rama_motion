import axios from 'axios'
import Control from '../control'

export const adminLogin = () => {

    let adminForm = document.getElementById('login-form')
    adminForm.removeEventListener('submit', login)
    adminForm.addEventListener('submit', login)




}


function login(ev) {
    ev.preventDefault()
    const password = ev.target.adminPassword.value
    let errorMsgDiv = document.getElementById("loginErrorMsg")
    console.log("call login")
    axios.post("/api/adminAuthorise", { password }).then(res => {
        if (res.data.ok) {
            errorMsgDiv.innerText = ""
            errorMsgDiv.style.color = ''
            errorMsgDiv.classList.add("hidden")
            // go on
            if (res.data.hasOwnProperty("data")) {
                Control.show('admin', [res.data.data])
            } else {
                Control.show('admin', ["no data found"])
            }


        } else {

            errorMsgDiv.innerText = "wrong password"
            errorMsgDiv.style.color = '#e3242b'
            errorMsgDiv.classList.remove("hidden")
        }
    }).catch(err => {
        // console.log(err)
        errorMsgDiv.innerText = "server error"
    })
}