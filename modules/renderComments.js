import { comments } from './comments.js'
import { initLikeButtons, initCommentClick } from './initListener.js'

const commentsList = document.getElementById('comments-list')

export const renderComments = () => {
    commentsList.innerHTML = comments
        .map((comment, index) => {
            return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.author ? comment.author.name : comment.name}</div>
            <div>${comment.date ? new Date(comment.date).toLocaleString() : ''}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes || 0}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>
      `
        })
        .join('')

    initLikeButtons() // Инициализируем обработчики кликов для кнопок лайков
    initCommentClick() // Инициализация обработчика клика по комментариям
}
