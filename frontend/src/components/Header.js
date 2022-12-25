import logo from '../images/logo.svg'

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Проекта Место" />
      <div className="header__controls">
        <div className="header__email">{props.email}</div>
        {props.buttonLabel && (
          <button className="header__button" onClick={props.onButtonClick}>
            {props.buttonLabel}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
