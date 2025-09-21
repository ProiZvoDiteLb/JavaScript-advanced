import { login } from './api.js'
import { updateToken, updateName } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'

//  Отрисовка страницы логина
export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <h1>Страница входа</h1>
    <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type="text" id="login-input" class="input" placeholder="Логин">
            <input type="password" id="password-input" class="input" placeholder="Пароль">
        </div>
        <br>
        <button class="button" id="login-button">Войти</button>
        <button class="button" id="reg-button">Зарегистрироваться</button>
    </div>
    `
    container.innerHTML = loginHtml

    const button = document.getElementById('login-button')
    const loginEl = document.getElementById('login-input')
    const passwordEl = document.getElementById('password-input')

    // очищаем поля после рендера
    loginEl.value = ''
    passwordEl.value = ''

    // Обработчик входа
    button.addEventListener('click', () => {
        login(loginEl.value.trim(), passwordEl.value.trim())
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || 'Ошибка авторизации')
                    })
                }
                return response.json()
            })
            .then((data) => {
                updateToken(data.user.token)
                updateName(data.user.name)
                fetchAndRenderComments()
            })
            .catch((err) => {
                alert(err.message || 'Не удалось войти, проверьте логин/пароль')
            })
    })

    //  Обработчик перехода на страницу регистрации
    const regButton = document.getElementById('reg-button')
    if (regButton) {
        regButton.addEventListener('click', () => {
            import('./renderRegistration.js')
                .then((module) => {
                    module.renderRegistration()
                })
                .catch(() => {
                    alert('Не удалось открыть страницу регистрации')
                })
        })
    }
}

/*

 из ПОСТМАН

{
    "user": {
        "_id": "6421860c32e0301869fb3301",
        "login": "admin",
        "password": "admin",
        "name": "Админ",
        "token": "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k",
        "imageUrl": "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680601502867-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-04-04%2520%25C3%2590%25C2%25B2%252014.04.29.png"
    }
}

*/
