// Задание 3

let formEl = document.forms.first
let form = document.querySelector('.form')
// Функция на скрытие предыдущих сообщений
function deleteMessage() {
    form.querySelectorAll('.message').forEach( (el) => {
        if (el) {
            el.classList.add('no-active')
        }
    })
}
//Функция, которая передает данные с сервера, либо месседж об ошибке
function sendOutput (num) {
    if (+num > 10) {
        let message = `<span class="message"> Вы отправили слишком большое число</span>`
        form.innerHTML += message
    } else if (+num < 1) {
        let message = `<span class="message"> Вы отправили слишком маленькое число</span>`
        form.innerHTML += message
    }
    else if (isNaN(num)) {
        let message = `<span class="message"> Вы отправили не число</span>`
        form.innerHTML += message
    }
    else requestXHR ("https://picsum.photos/v2/list?limit=", 'get', num, true)
}
// Создаем функцию, которая распарсит json с сервера в объект и передаст их на фронт
function outputCards (array) {
    const object = {
        array: JSON.parse(array)
    }
    const gridOutput = document.querySelector('.output')
    object.array.forEach((el, num)=> {
        let x = `<div class="card n${num} message"> <img class="image" src="${el.download_url}"> <span class="author n${num}">${el.author}</span> </div>`
        gridOutput.innerHTML += x
    })
}
//Создаем функцию запроса на сервер
function requestXHR (url, method, number, async) {
    const xhr = new XMLHttpRequest()
    xhr.open (method, (url + number), async)
    xhr.onload = function () {
        if (xhr.status == 200) {
            outputCards(xhr.response)
        } else console.log(xhr.status)

    }
    xhr.onerror = function () {
        console.log('ошибка запроса')
    }
    xhr.send()
}
// Передаем нужные функции на ивент сабмит
form.addEventListener('submit', (event) => {
    event.preventDefault()
    deleteMessage()
    let numberInput = formEl.num.value
    sendOutput (numberInput)
})