import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'

fetchAndRenderComments()

/*
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
*/
// Сохраняем введённые данные в переменные
let savedName = ''
let savedComment = ''

const nameInput = document.querySelector('.add-form-name') //Создаем переменную и ищем элемент с классом .add-form-name
const commentInput = document.querySelector('.add-form-text') //Создаем переменную и ищем элемент с классом .add-form-text
const submitButton = document.querySelector('.add-form-button') //Создаем переменную и ищем элемент с классом .add-form-button
const formContainer = document.querySelector('.add-form')

// Отслеживаем ввод
nameInput.addEventListener('input', () => (savedName = nameInput.value))
commentInput.addEventListener(
    'input',
    () => (savedComment = commentInput.value),
)

// Восстанавливаем значения после рендера
const restoreFormValues = () => {
    nameInput.value = savedName
    commentInput.value = savedComment
}
restoreFormValues()

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
        // date: new Date().toLocaleString(),
        date: new Date().toISOString(),
        text: comment,
        likes: 0,
        isLiked: false,
    }

    /*  очищение убираем, если очищать поля сразу, а запрос упадёт (400, 500, или пропадёт интернет), пользователь потеряет весь введённый текст.
    //метод HTTP, который отправляет данные на сервер.
    // Очищаем поля ПЕРЕД скрытием формы
    nameInput.value = ''
    commentInput.value = ''
    */

    // Сохраняем значения перед скрытием формы
    savedName = name
    savedComment = comment

    // Скрываем форму и блокируем кнопку
    formContainer.style.display = 'none'
    submitButton.disabled = true

    fetchAndRenderComments
        .postComment(newComment)
        .then(() => {
            savedName = ''
            savedComment = ''
            nameInput.value = ''
            commentInput.value = ''
        })
        .catch(() => {
            // В случае ошибки форма не очищается
            restoreFormValues()
        })
        .finally(() => {
            // Показываем форму и разблокируем кнопку
            formContainer.style.display = ''
            submitButton.disabled = false
        })
})
