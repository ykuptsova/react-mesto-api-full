function ImagePopup(props) {
  const { card, onClose } = props

  const containerClass =
    'popup popup_dimmed popup_type_picture ' + (card ? 'popup_opened' : '')

  return (
    <div className={containerClass}>
      <figure className="popup__image-container">
        <img className="popup__image" alt="Place" src={card ? card.link : ''} />
        <figcaption className="popup__image-description">
          {card && card.name}
        </figcaption>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  )
}

export default ImagePopup
