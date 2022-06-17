//Задание 4

const form = document.querySelector('form')
const pictureContainer = document.querySelector('.picture-container')
const requestURL =  'https://picsum.photos/'

function innerPicture (url) {
    pictureContainer.innerHTML = `<img class="picture" src="${url}">`
}

function innerResultErr () {
    pictureContainer.innerHTML = `<span class="err">Одно из чисел вне диапазона от 100 до 300</span>`
}

function fetchRequest (url, numbers) {
    console.log(url + numbers)
    fetch (url + numbers)
        .then(response => response.url)
        .then(data => {
            innerPicture(data)
        })
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let number = 0
    let array = []
    form.querySelectorAll('.input').forEach(element => {
        if (element.value >= 100 && element.value <= 300) {
            number += 1
        }
        array.push(element.value)
    })
    if (number === 2) {
        fetchRequest(requestURL, array.join('/'))
    } else innerResultErr()
})
