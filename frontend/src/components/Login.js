import React from 'react'

function Login(props) {
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
      <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__form-field">
            <input
              className="login__input login__input_type_email"
              name="email"
              type="text"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              value={email || ''}
              onChange={handleEmailChange}
              required
            />
            <span className="login__input-error login__input-error_type_email"></span>
          </label>
          <label className="login__form-field">
            <input
              className="login__input login__input_type_password"
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="40"
              value={password || ''}
              onChange={handlePasswordChange}
              required
            />
            <span className="login__input-error login__input-error_type_password"></span>
          </label>
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
