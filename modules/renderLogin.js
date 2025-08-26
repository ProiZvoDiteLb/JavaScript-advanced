export const renderLogin = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
<h1>Страница входа</h1>
<div class="form">
    <h3 class="form-title">Форма входа</h3>
    <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин">
        <input type="text" id="password-input" class="input" placeholder="Пароль">
</div>
    <br>
    <button class="button" id="login-button">Войти</button>
    <button class="button" id="reg-button">Зарегистрироваться</button>
`
    const button = document.getElementById('login-button')
    const loginEl = document.getElementById('login-input')
    const passwordEl = document.getElementById('password-input')

    button.addEventListener('click', () => {
        login({
            login: loginEl.value,
            password: passwordEl.value,
        }).then((data)) => {
    
        }
    })
}
