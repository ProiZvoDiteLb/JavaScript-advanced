const host = 'https://wedev-api.sky.pro/api/v2/ProiZvoDiteLb'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''
export let name = ''
export const getName = () => name

export const updateToken = (newToken) => {
    token = newToken
}

export const updateName = (newName) => {
    name = newName
}

// Получение комментариев
export const fetchComments = () => {
    return fetch(host + '/comments', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
        .then((res) => res.json())
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }))
        })
}

// Отправка комментария
export const postComment = (text) => {
    if (!token) {
        return Promise.reject(
            new Error('Вы должны войти, чтобы оставить комментарий'),
        )
    }

    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400)
                throw new Error('Комментарий слишком короткий')
            if (response.status === 500) throw new Error('Ошибка сервера')
            throw new Error('Ошибка при добавлении комментария')
        }
        return fetchComments()
    })
}

// Вход (убрали Content-Type)
export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
}

// Регистрация (убрали Content-Type)
export const registration = (login, name, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ login, password, name }),
    })
}
