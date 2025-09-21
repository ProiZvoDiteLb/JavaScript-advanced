import { renderComments } from './modules/renderComments.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
import { postComment } from './modules/api.js'
import { updateComments } from './modules/comments.js'

export { initFormListeners }

// Сначала создаём пустую разметку
renderComments()

// Потом загружаем комментарии
fetchAndRenderComments()

// Сохраняем введённый текст, чтобы не потерялся при рендере
let savedComment = ''
const commentInput = document.querySelector('.add-form-text')
const submitButton = document.querySelector('.add-form-button')

// Отслеживаем ввод
if (commentInput) {
    commentInput.addEventListener(
        'input',
        () => (savedComment = commentInput.value),
    )
}

// Восстановление значения после рендера
const restoreFormValues = () => {
    if (commentInput) commentInput.value = savedComment
}
restoreFormValues()

// Обработчик кнопки "Написать"
if (submitButton) {
    submitButton.addEventListener('click', () => {
        const text = commentInput.value
            .trim()
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')

        const nameInput = document.querySelector('.add-form-name')
        const authorName = nameInput ? nameInput.value.trim() : ''

        if (!text || !authorName) {
            alert('Пожалуйста, заполните имя и комментарий.')
            return
        }

        // сохраняем значение перед отправкой
        savedComment = text

        // блокируем кнопку
        submitButton.disabled = true
        submitButton.textContent = 'Отправка...'

        postComment(text, authorName)
            .then((newComments) => {
                updateComments(newComments)
                renderComments()
                restoreFormValues()
                initFormListeners() // снова навешиваем обработчики
            })
            .catch((err) => {
                restoreFormValues()
                alert(err.message || 'Ошибка при отправке комментария')
            })
            .finally(() => {
                submitButton.disabled = false
                submitButton.textContent = 'Написать'
                commentInput.value = ''
                savedComment = ''
            })
    })
}

// Функция для повторной привязки обработчиков после рендера
const initFormListeners = () => {
    const submitBtn = document.querySelector('.add-form-button')
    const textInput = document.querySelector('.add-form-text')
    if (!submitBtn || !textInput) return
    submitBtn.addEventListener('click', () => submitBtn.click())
}
