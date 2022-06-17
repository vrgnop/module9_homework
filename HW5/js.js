function inputNumbersOutputPictures () {
    //Вводим нужные переменные
    let form = document.querySelector('.form') //Форма
    const answer = document.createElement('div') //Див для ответа, если пользователь вводит не те значения
    const gridResult = document.createElement('grid') //Грид при успешной отработке гет запроса и вывода результата
    const requestURL = `https://picsum.photos/v2/list?page=1&limit=2` // Урл для запроса
    let localStorageHTML =  localStorage.getItem('arrayStorage') != null ? localStorage.getItem('arrayStorage').split(',') : '' // Переменная для хранения локал сторедж
    // Вызываем функцию которая выводит картинки из локал сторедж
    innerStorage()

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
        array.forEach((element, number) => {
            element.classList.remove('err')
            if (element.value <= 10 && element.value > 0) {
                sumCorrectInput += 1
                    arrayParamsRequest.push(element.value)
            } else inputWrongIndex.push(number)
        })
        let urlRequest = getURL(arrayParamsRequest)
        innerResult(sumCorrectInput, inputWrongIndex, urlRequest)
    }


// Выводим результат при всевозможных исходах. При успешном исходе отправляем параметры и урл в функцию создания запроса
    function innerResult (number, indexes, url) {
        form.insertBefore(answer, form.querySelector('.submit').nextSibling)
        if (number  === 2) {
            fetchRequest(url)
        } else if (number  === 1) {
            form.querySelectorAll('.input')[indexes].classList.add('err')
            answer.innerHTML = `<span class="answer"> ${form.querySelectorAll('.label')[indexes].textContent} вне диапазона от 1 до 10 </span>`
        }  else {
            indexes.forEach((el => form.querySelectorAll('.input')[el].classList.add('err')))
            answer.innerHTML = `<span class="answer">Оба значения вне диапазона</span>`
        }
    }
// Создаем фетч запрос с нужными параметрами и передаем в функцию вставить картинки дату
    function fetchRequest (url) {
        console.log(url)
        fetch (url)
            .then(response => response.json())
            .then(data => {
                innerPicture(data)
            })
    }
//Получаем нужную ссылку из инпутов
    function getURL (arrayParams) {
        let url = new URL(requestURL)
        url.searchParams.set('page', arrayParams[0])
        url.searchParams.set('limit', arrayParams[1])
        return url.href
    }
// Создаем функцию вставки картинок, добавляем также массив с дивами в локал сторедж, чтобы при обновлении страницы эти картинки не пропали
    function innerPicture (arrayObjectInRequest) {
        form.insertBefore(gridResult, answer.nextSibling)
        let arrayStorage = []
        gridResult.classList.add('grid-container')
        arrayObjectInRequest.forEach(element => {
            let pictures = `<div class="picture-container-5"><img class="picture" src="${element['download_url']}"><span class="author">${element.author}</span> </div>`
            arrayStorage.push(pictures)
            gridResult.innerHTML += `<div class="picture-container-5"><img class="picture" src="${element['download_url']}"><span class="author">${element.author}</span> </div>`
        })
        let arrStoragePictures = arrayStorage.join(',')
        localStorage.setItem('arrayStorage', arrStoragePictures)
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
}
// Создаем обработчик на загрузку дома для запуска функции
document.addEventListener('DOMContentLoaded', inputNumbersOutputPictures)
