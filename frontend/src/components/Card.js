import React from 'react'
import trash from '../images/trash.svg'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const heardClass = `element__heart ${
    card.liked ? 'element__heart_active' : ''
  }`
  const trashClass = `element__trash ${
    card.owned ? 'element__trash_active' : ''
  }`
  const handleCardClick = () => onCardClick(card)
  const handleCardLike = () => onCardLike(card)
  const handleDeleteClick = () => onCardDelete(card)

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.alt}
        onClick={handleCardClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            className={heardClass}
            type="button"
            onClick={handleCardLike}
          ></button>
          <div className="element__like_counter">{card.likes || ''}</div>
        </div>
      </div>
      <img
        className={trashClass}
        src={trash}
        alt="Удалить карточку"
        onClick={handleDeleteClick}
      />
    </article>
  )
}

export default Card
