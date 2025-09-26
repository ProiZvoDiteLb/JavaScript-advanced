import { login, updateToken, updateName } from './api.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { renderComments } from './renderComments.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    container.innerHTML = `
    <div class="add-form">
      <h3 style="margin-bottom: 10px;">Вход</h3>
      <input 
        type="text" 
        class="add-form-name login-input" 
        placeholder="Введите логин"
      >
      <input 
        type="password" 
        class="add-form-name password-input" 
        placeholder="Введите пароль"
        style="margin-top: 10px;"
      >
      <div class="add-form-row">
        <button class="add-form-button login-button">Войти</button>
      </div>
      <p style="margin-top: 10px; font-size: 14px;">
        Нет аккаунта? <span class="link-register" style="cursor: pointer; color: white;">Зарегистрируйтесь</span>
      </p>
    </div>
  `

    document.querySelector('.login-button').addEventListener('click', () => {
        const loginInput = document.querySelector('.login-input').value.trim()
        const passwordInput = document
            .querySelector('.password-input')
            .value.trim()

        if (!loginInput || !passwordInput) {
            alert('Пожалуйста, заполните все поля')
            return
        }

        login(loginInput, passwordInput)
            .then((res) => res.json())
            .then((data) => {
                updateToken(data.user.token)
                updateName(data.user.name)
                fetchAndRenderComments()
                renderComments()
            })
            .catch(() => alert('Неверный логин или пароль'))
    })

    document.querySelector('.link-register').addEventListener('click', () => {
        renderRegistration()
    })
}
