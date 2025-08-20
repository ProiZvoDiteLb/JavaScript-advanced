import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

const host = 'https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments'

export const fetchAndRenderComments = () => {
    const commentsList = document.getElementById('comments-list')
    commentsList.innerHTML = `<li>Пожалуйста, подождите, загружаю комментарии...</li>`

    return fetch(host)
        .then((response) => {
            if (response.status === 500) {
                throw new Error('500')
            }
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
        .catch((error) => {
            if (error.message === '500') {
                alert('Не удалось загрузить комментарии, попробуйте позже')
            } else {
                alert('Проблемы с соединением, проверьте интернет')
            }
        })
}

// Метод для отправки комментария и повторной загрузки списка
fetchAndRenderComments.postComment = (newComment) => {
    const commentsList = document.getElementById('comments-list')

    // Сохраняем старое содержимое списка
    const previousHtml = commentsList.innerHTML

    commentsList.innerHTML = `<li>Комментарий добавляется...</li>`

    return fetch(host, {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('400')
            }
            if (response.status === 500) {
                throw new Error('500')
            }
            return response.json()
        })
        .then(() => fetchAndRenderComments())
        .catch((error) => {
            // Восстанавливаем старые комментарии
            commentsList.innerHTML = previousHtml
            if (error.message === '400') {
                alert(
                    'Поля заполнены некорректно,имя и комментарий должны быть не короче 3х символов',
                )
            } else if (error.message === '500') {
                alert('Сервер сломался, попробуйте позже')
            } else {
                alert('Проблемы с соединением, проверьте интернет')
            }
            throw error // проброс, чтобы index.js знал, что был сбой
        })
}
