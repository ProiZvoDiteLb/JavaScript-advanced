import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'

fetchAndRenderComments()

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
const formContainer = document.querySelector('.add-form')

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
    // Очищаем поля ПЕРЕД скрытием формы
    nameInput.value = ''
    commentInput.value = ''

    // Скрываем форму и блокируем кнопку
    formContainer.style.display = 'none'
    submitButton.disabled = true

    fetchAndRenderComments.postComment(newComment).then(() => {
        // Показываем форму и разблокируем кнопку
        formContainer.style.display = ''
        submitButton.disabled = false
    })
})
