const controlBtn = document.getElementById("testControlBtn")
const regisPage = document.getElementById("regis")
const gamePage = document.getElementById("game")

let state = true
controlBtn.addEventListener('click', () => {
    console.log(state)
    if (state) {
        regisPage.classList.add('hidden')
        gamePage.classList.remove('hidden')
    } else {
        gamePage.classList.add('hidden')
        regisPage.classList.remove('hidden')
    }
    state = !state
})