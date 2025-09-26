import { registration, updateToken, updateName } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { renderComments } from './renderComments.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    container.innerHTML = `
    <div class="add-form">
      <h3 style="margin-bottom: 10px;">Регистрация</h3>
      <input 
        type="text" 
        class="add-form-name name-input" 
        placeholder="Введите имя"
      >
      <input 
        type="text" 
        class="add-form-name login-input" 
        placeholder="Введите логин"
        style="margin-top: 10px;"
      >
      <input 
        type="password" 
        class="add-form-name password-input" 
        placeholder="Введите пароль"
        style="margin-top: 10px;"
      >
      <div class="add-form-row">
        <button class="add-form-button register-button">Зарегистрироваться</button>
      </div>
      <p style="margin-top: 10px; font-size: 14px;">
        Уже есть аккаунт? <span class="link-login" style="cursor: pointer; color: white;">Войдите</span>
      </p>
    </div>
  `

    const regButton = document.querySelector('.register-button')
    const nameInputEl = document.querySelector('.name-input')
    const loginInputEl = document.querySelector('.login-input')
    const passwordInputEl = document.querySelector('.password-input')
    const loginLink = document.querySelector('.link-login')

    regButton.addEventListener('click', () => {
        const nameVal = nameInputEl.value.trim()
        const loginVal = loginInputEl.value.trim()
        const passVal = passwordInputEl.value.trim()

        if (!nameVal || !loginVal || !passVal) {
            alert('Пожалуйста, заполните все поля')
            return
        }

        // Важно: порядок аргументов (name, login, password)
        registration(nameVal, loginVal, passVal)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.message || 'Ошибка регистрации')
                    })
                }
                return response.json()
            })
            .then((data) => {
                updateToken(data.user.token)
                updateName(data.user.name)
                fetchAndRenderComments()
                renderComments()
            })
            .catch((err) => {
                alert(err.message || 'Не удалось зарегистрироваться')
            })
    })

    loginLink.addEventListener('click', () => {
        renderLogin()
    })
}
