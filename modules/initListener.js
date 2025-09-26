import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

// const nameInput = document.querySelector('.add-form-name')
// const commentInput = document.querySelector('.add-form-text')

export const initLikeButtons = () => {
    const likeButtons = document.querySelectorAll('.like-button')

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation() // Останавливаем распространение события
            const index = event.target.dataset.index // Получаем индекс комментария
            // Изменяем состояние лайка
            comments[index].isLiked = !comments[index].isLiked
            // Обновляем количество лайков
            comments[index].likes += comments[index].isLiked ? 1 : -1
            // Рендерим комментарии заново
            renderComments()
        })
    })
}

export const initCommentClick = () => {
    const commentItems = document.querySelectorAll('.comment')
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')

    commentItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = item.dataset.index
            const comment = comments[index]
            if (!comment) return
            if (nameInput)
                nameInput.value = comment.author
                    ? comment.author.name
                    : comment.name || ''
            if (commentInput) commentInput.value = (comment.text || '') + ' '
        })
    })
}
