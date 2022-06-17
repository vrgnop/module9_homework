// Задание 5

//Вводим нужные переменные
let form = document.querySelector('.form') //Форма
const answer = document.createElement('div') //Див для ответа, если пользователь вводит не те значения
const gridResult = document.createElement('grid') //Грид при успешной отработке гет запроса и вывода результата
const requestURL = `https://picsum.photos/v2/list?` // Урл для запроса
let localStorageHTML =  localStorage.getItem('arrayStorage') != null ? localStorage.getItem('arrayStorage').split(',') : '' // Переменная для хранения локал сторедж

// Заводим обработчик на форм сабмит, куда будем складывать другие функции, которые начнут отрабатывать при клике на форму
form.addEventListener('submit', (event) => {
    event.preventDefault()
    deletePreviousElements ()
    deleteLocaleStorage()
    const arrayInput = form.querySelectorAll('.input')
    checkNumbers(arrayInput)
})

// Проверяем вводимые пользователем значения и передаем переменные - сумму корректных значений, неправильный индекс инпута, параметры для запроса
function checkNumbers (array) {
    let sumCorrectInput = 0
    let inputWrongIndex = []
    let arrayParamsRequest = []
    let paramsRequest = ''
    array.forEach((element, number) => {
        element.classList.remove('err')
        if (element.value <= 10 && element.value > 0) {
            sumCorrectInput += 1
            if (number === 0) {
                arrayParamsRequest.push('page=' + element.value)
            } else arrayParamsRequest.push('limit=' + element.value)
        } else inputWrongIndex.push(number)
    })
    paramsRequest = arrayParamsRequest.join('&')
    innerResult(sumCorrectInput, inputWrongIndex, paramsRequest)
    console.log(paramsRequest)
}


// Выводим результат при всевозможных исходах. При успешном исходе отправляем параметры и урл в функцию создания запроса
function innerResult (number, indexes, params) {
    form.insertBefore(answer, form.querySelector('.submit').nextSibling)
    if (number  === 2) {
        fetchRequest(requestURL, params)
    } else if (number  === 1) {
        form.querySelectorAll('.input')[indexes].classList.add('err')
        answer.innerHTML = `<span class="answer"> ${form.querySelectorAll('.label')[indexes].textContent} вне диапазона от 1 до 10 </span>`
    }  else {
        indexes.forEach((el => form.querySelectorAll('.input')[el].classList.add('err')))
        answer.innerHTML = `<span class="answer">Оба значения вне диапазона</span>`
    }
}
// Создаем фетч запрос с нужными параметрами и передаем в функцию вставить картинки дату
function fetchRequest (url, params) {
    console.log(url + params)
    fetch (url + params)
        .then(response => response.json())
        .then(data => {
            innerPicture(data)
        })
}
// Создаем функцию вставки картинок, добавляем также массив с дивами в локал сторедж, чтобы при обновлении страницы эти картинки не пропали
function innerPicture (arrayObjectInRequest) {
    form.insertBefore(gridResult, answer.nextSibling)
    let arrayStorage = []
    gridResult.classList.add('grid-container')
    arrayObjectInRequest.forEach(element => {
        let x = `<div class="picture-container-5"><img class="picture" src="${element['download_url']}"><span class="author">${element.author}</span> </div>`
        arrayStorage.push(x)
        gridResult.innerHTML += `<div class="picture-container-5"><img class="picture" src="${element['download_url']}"><span class="author">${element.author}</span> </div>`
    })
    let y = arrayStorage.join(',')
    localStorage.setItem('arrayStorage', y)
    localStorageHTML = localStorage.getItem('arrayStorage').split(',')
}
// Добавляем функцию вставки сохраненных данных сторедже
function innerStorage () {
    form.insertBefore(gridResult, answer.nextSibling)
    gridResult.classList.add('grid-container')
    if (localStorageHTML != '') {
        localStorageHTML.forEach(element => {
            gridResult.innerHTML += element
        })
    }
}
// Создаем обработчик на загрузку дома, чтобы сохраненные в локал сторедж картинки появились сразу при обновлении страницы
document.addEventListener('DOMContentLoaded', innerStorage)

// Удаляем предыдущие результаты
function deletePreviousElements () {
    gridResult.querySelectorAll('.picture-container-5').forEach( el => {
        el.classList.add('no-active')
    })
    if (form.querySelector('.answer') != null)
        form.querySelector('.answer').classList.add('no-active')
}

// Удаяем локал сторедж
function deleteLocaleStorage() {
    localStorage.removeItem('arrayStorage')
}