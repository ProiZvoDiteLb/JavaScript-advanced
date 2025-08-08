import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'

fetch('https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments') // подключаем API
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateComments(data.comments)
        renderComments()
    })

const nameInput = document.querySelector('.add-form-name') //Создаем переменную и ищем элемент с классом .add-form-name
const commentInput = document.querySelector('.add-form-text') //Создаем переменную и ищем элемент с классом .add-form-text
const submitButton = document.querySelector('.add-form-button') //Создаем переменную и ищем элемент с классом .add-form-button
// const commentsList = document.getElementById('comments-list') //Создаем переменную и ищем элемент с id comments-list

// Обработчик события для кнопки "Написать"
submitButton.addEventListener('click', () => {
    const name = nameInput.value
        .trim()
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;') //используем replaceAll() для замены символов < и > на их HTML-сущности &lt; и &gt;
    const comment = commentInput.value
        .trim()
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;') //используем replaceAll() для замены символов < и > на их HTML-сущности &lt; и &gt;

    // Проверка на наличие имени и комментария
    if (name === '' || comment === '') {
        alert('Пожалуйста, заполните все поля.')
        return
    }

    // Создаем новый комментарий
    const newComment = {
        name: name,
        date: new Date().toLocaleString(),
        text: comment,
        likes: 0,
        isLiked: false,
    }

    //метод HTTP, который отправляет данные на сервер.
    fetch('https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })

    /*  // Добавляем новый комментарий в массив
        comments.push(newComment)
        */

    // Очищаем поля ввода
    nameInput.value = ''
    commentInput.value = ''

    // Рендерим комментарии заново
    renderComments()
})

// Инициализация рендеринга комментариев
// renderComments()
