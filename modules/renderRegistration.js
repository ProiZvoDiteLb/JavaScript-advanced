import { registration, updateToken, updateName } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const registrationHtml = `
        <h1>Страница регистрации</h1>
        <div class="form">
            <h3 class="form-title">Форма регистрации</h3>
            <div class="form-row">
                <input type="text" id="name-input" class="input" placeholder="Имя">
                <input type="text" id="login-input" class="input" placeholder="Логин">
                <input type="password" id="password-input" class="input" placeholder="Пароль">
            </div>
            <br>
            <button class="button" id="reg-button">Зарегистрироваться</button>
            <button class="button" id="back-login">Назад к входу</button>
        </div>
    `
    container.innerHTML = registrationHtml

    const nameEl = document.getElementById('name-input')
    const loginEl = document.getElementById('login-input')
    const passwordEl = document.getElementById('password-input')
    const regButton = document.getElementById('reg-button')
    const backButton = document.getElementById('back-login')

    //  очищаем поля после рендера
    nameEl.value = ''
    loginEl.value = ''
    passwordEl.value = ''

    //  Обработчик кнопки "Зарегистрироваться"
    regButton.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || 'Ошибка регистрации')
                    })
                }
                return response.json()
            })
            .then((data) => {
                // сохраняем токен и имя
                updateToken(data.user.token)
                updateName(data.user.name)

                // сразу переходим к комментариям (как будто вошли)
                fetchAndRenderComments()
            })
            .catch((err) => {
                alert(err.message || 'Не удалось зарегистрироваться')
            })
    })

    //  Обработчик кнопки "Назад к входу"
    backButton.addEventListener('click', () => {
        import('./renderLogin.js').then((module) => {
            module.renderLogin()
        })
    })
}
