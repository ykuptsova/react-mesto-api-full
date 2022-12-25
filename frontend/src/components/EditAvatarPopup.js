import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const inputRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    })
  }

  React.useEffect(() => {
    inputRef.current.value = ''
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="pic"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          ref={inputRef}
          className="popup__input popup__input_type_pic"
          name="avatar"
          type="url"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__input-error popup__input-error_type_pic"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
