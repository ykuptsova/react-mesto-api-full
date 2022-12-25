import React from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext)
  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.description)
  }, [currentUser, props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      description,
    })
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error popup__input-error_type_name"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_info"
          name="info"
          type="text"
          placeholder="О Себе"
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__input-error popup__input-error_type_info"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
