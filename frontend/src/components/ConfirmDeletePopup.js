import PopupWithForm from './PopupWithForm'

function ConfirmDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.onConfirm()
  }

  return (
    <PopupWithForm
      name="confirm-trash"
      title="Вы уверены?"
      saveButtonName="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletePopup
