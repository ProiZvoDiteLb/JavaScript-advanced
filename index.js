import { renderComments } from './modules/renderComments.js'
import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
import { postComment } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { getName, token } from './modules/api.js'

export { initFormListeners }

// Сначала создаём пустую разметку
renderComments()

// Потом загружаем комментарии
fetchAndRenderComments()

// Сохраняем введённый текст, чтобы не потерялся при рендере
let savedComment = ''
/*
const commentInput = document.querySelector('.add-form-text')

// Отслеживаем ввод
if (commentInput) {
    commentInput.addEventListener(
        'input',
        () => (savedComment = commentInput.value),
    )
}


// Восстановление значения после рендера
const restoreFormValues = () => {
    const commentInputCurrent = document.querySelector('.add-form-text')
    if (commentInputCurrent) commentInputCurrent.value = savedComment
}
*/

// Восстановление значения после рендера
const restoreFormValues = () => {
    const commentInputCurrent = document.querySelector('.add-form-text')
    if (commentInputCurrent) commentInputCurrent.value = savedComment
}

// Основная функция отправки комментария
const handleSubmit = () => {
    const submitButton = document.querySelector('.add-form-button')
    const textarea = document.querySelector('.add-form-text')
    if (!textarea) return
    const text = textarea.value
        .trim()
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')

    if (!text) {
        alert('Пожалуйста, заполните комментарий.')
        return
    }

    // сохраняем значение перед отправкой
    savedComment = text

    // блокируем кнопку
    if (submitButton) {
        submitButton.disabled = true
        submitButton.textContent = 'Отправка...'
    }

    const authorName = getName()
    if (!authorName || !token) {
        alert('Вы должны войти, чтобы отправить комментарий')
        if (submitButton) {
            submitButton.disabled = false
            submitButton.textContent = 'Написать'
        }
        return
    }

    postComment(text) // теперь не передаём authorName
        .then((newComments) => {
            updateComments(newComments)
            renderComments()
            restoreFormValues()
        })
        .catch((err) => {
            restoreFormValues()
            alert(err.message || 'Ошибка при отправке комментария')
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false
                submitButton.textContent = 'Написать'
            }
            const currentInput = document.querySelector('.add-form-text')
            if (currentInput) currentInput.value = ''
            savedComment = ''
        })
}

// Навешивание обработчиков на актуальные элементы формы
const initFormListeners = () => {
    const submitButton = document.querySelector('.add-form-button')
    const textInput = document.querySelector('.add-form-text')
    if (!submitButton || !textInput) return

    // перезаписываем старые обработчики (чтобы не дублировались)
    submitButton.onclick = handleSubmit
    textInput.oninput = () => (savedComment = textInput.value)

    // Восстанавливаем значение, если было сохранено
    if (savedComment) textInput.value = savedComment
}

// Событие, которое высылает renderComments() после отрисовки,
// чтобы мы могли навесить обработчики на вновь созданные элементы
document.addEventListener('commentsRendered', initFormListeners)

// Изначальная привязка обработчика (если форма уже на странице)
initFormListeners()
