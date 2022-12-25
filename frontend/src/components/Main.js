import React from 'react'
import Card from './Card.js'
import pencil from '../images/pencil.svg'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const profileEditClassName =
    'profile__edit-button ' +
    (currentUser.name ? 'profile__edit-button_enabled' : '')

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__pic-container" onClick={props.onEditAvatar}>
            <img
              className="profile__pic"
              src={currentUser.avatar}
              alt="Фото Профиля"
            />
            <img
              className="profile__pencil"
              alt="Редактировать аватар"
              src={pencil}
            />
          </div>
          <div className="profile__texts">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className={profileEditClassName}
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__info">{currentUser.description}</p>
          </div>
          <button
            className="profile__new-card-button"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>

      <section className="elements">
        <div className="elements__content">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main
