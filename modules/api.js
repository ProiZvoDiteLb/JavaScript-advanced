const host = 'https://wedev-api.sky.pro/api/v2/ProiZvoDiteLb/comments'
const authToken =
    'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'

let token = ''

export const updateToken = (newToken) => {
    token = newToken
}

export function getComments() {
    return fetch(host, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json()
    })
}

export function postComment({ text }) {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            text,
        }),
    }).then((response) => {
        return response.json()
    })
}

export function login({ login, password }) {
    return fetch(`${authToken}/login`, {
        method: 'POST',

        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json()
    })
}

export function registration({ login, name, password }) {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({ login, password, name }),
    }).then((response) => {
        return response.json().then((data) => {
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка регистрации')
            }
            return data
        })
    })
}
//d yjdm
