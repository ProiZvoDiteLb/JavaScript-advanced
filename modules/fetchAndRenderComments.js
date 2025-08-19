import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

const host = 'https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments'

export const fetchAndRenderComments = () => {
    const commentsList = document.getElementById('comments-list')
    commentsList.innerHTML = `<li>Пожалуйста, подождите, загружаю комментарии...</li>`

    return fetch('https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments')
        .then((response) => response.json())
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
}

// Метод для отправки комментария и повторной загрузки списка
fetchAndRenderComments.postComment = (newComment) => {
    const commentsList = document.getElementById('comments-list')
    commentsList.innerHTML = `<li>Комментарий добавляется...</li>`

    return fetch('https://wedev-api.sky.pro/api/v1/ProiZvoDiteLb/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    }).then(() => fetchAndRenderComments())
}
