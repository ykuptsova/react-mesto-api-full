function PopupWithForm(props) {
  const openClass = props.isOpen ? 'popup_opened' : ''
  return (
    <div className={`popup popup_type_${props.name} ${openClass}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__save-button">
            {props.saveButtonName || 'Сохранить'}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        />
      </div>
    </div>
  )
}

export default PopupWithForm
