import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'

// Функция загрузки комментариев
const loadComments = () => {
    fetch('https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments')
        .then((response) => response.json())
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
}
// Загрузка комментариев при старте
loadComments()

const nameInput = document.querySelector('.add-form-name') //Создаем переменную и ищем элемент с классом .add-form-name
const commentInput = document.querySelector('.add-form-text') //Создаем переменную и ищем элемент с классом .add-form-text
const submitButton = document.querySelector('.add-form-button') //Создаем переменную и ищем элемент с классом .add-form-button

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
        .then(() => {
            // После успешного POST — заново грузим комментарии
            loadComments()
            // updateComments(data.comments)
            // renderComments()
        })

    // Очищаем поля ввода
    nameInput.value = ''
    commentInput.value = ''

    // Рендерим комментарии заново
    renderComments()
})
