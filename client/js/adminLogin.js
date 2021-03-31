import axios from 'axios'
import Control from './control'

export function adminLogin() {

    let adminForm = document.getElementById('login-form')
    adminForm.removeEventListener('submit', login)
    adminForm.addEventListener('submit', login)



    function login(ev) {
        ev.preventDefault()
        const password = ev.target.adminPassword.value
        let errorMsgDiv = document.getElementById("loginErrorMsg")

        axios.post("/api/adminAuthorise", { password }).then(res => {
            if (res.data.ok) {
                errorMsgDiv.innerText = "accepted, redirecting"
                errorMsgDiv.style.color = '#a0e989'
                errorMsgDiv.classList.remove("hidden")
                // go on

                Control.show('admin')

            } else {

                errorMsgDiv.innerText = "wrong password"
                errorMsgDiv.style.color = '#e3242b'
                errorMsgDiv.classList.remove("hidden")
            }
        }).catch(err => {
            console.log(err)
            errorMsgDiv.innerText = "server error"
        })
    }

}
