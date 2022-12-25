import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name,
      link,
    })
  }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      saveButtonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_name"
          name="card_name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error popup__input-error_type_name"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_type_info"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error popup__input-error_type_info"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
