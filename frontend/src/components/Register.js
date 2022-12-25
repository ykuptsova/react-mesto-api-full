import React from 'react'
import { Link } from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = React.useState('')
  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  const [password, setPassword] = React.useState('')
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(email, password)
  }

  return (
    <div>
      <div className="register">
        <h1 className="register__title">Регистрация</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__form-field">
            <input
              className="register__input register__input_type_email"
              name="email"
              type="text"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              value={email || ''}
              onChange={handleEmailChange}
              required
            />
            <span className="register__input-error register__input-error_type_email"></span>
          </label>
          <label className="register__form-field">
            <input
              className="register__input register__input_type_password"
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              value={password || ''}
              onChange={handlePasswordChange}
              required
            />
            <span className="register__input-error register__input-error_type_password"></span>
          </label>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="login__question">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="login__link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
