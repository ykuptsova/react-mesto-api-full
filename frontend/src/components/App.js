/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'

import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api.js'
import auth from '../utils/auth.js'

import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register'
import Login from './Login'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmDeletePopup from './ConfirmDeletePopup'

function App() {
  // history
  const history = useHistory()

  // auth management
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'))
  const [email, setEmail] = useState(null)
  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setEmail(null)
    history.push('/sign-in')
  }
  function tokenCheck() {
    const token = localStorage.getItem('jwt')
    if (!token) return
    auth
      .usersMe(token)
      .then((data) => {
        setEmail(data.email)
      })
      .catch((res) => {
        handleSignOut()
      })
  }
  useEffect(() => {
    tokenCheck()
  }, [])

  const [tooltip, setTooltip] = React.useState({ status: null, title: null })

  function handleInfoTooltipClose() {
    // redirect user to login page on successful registration
    if (
      tooltip.status === 'ok' &&
      new URL(window.location.href).pathname === '/sign-up'
    ) {
      setTooltip({ ...tooltip, status: null })
      history.push('/sign-in')
    } else {
      setTooltip({ ...tooltip, status: null })
    }
  }

  function handleLoginSubmit(email, password) {
    auth
      .signin(email, password)
      .then((token) => {
        localStorage.setItem('jwt', token)
        setLoggedIn(true)
        tokenCheck()
        history.push('/')
      })
      .catch((err) => {
        setTooltip({
          status: 'nok',
          title:
            err.error ||
            err.message ||
            'Что-то пошло не так! Попробуйте ещё раз.',
        })
        console.error(err)
      })
  }

  function handleRegisterSubmit(email, password) {
    return auth
      .signup(email, password)
      .then((res) => {
        setTooltip({ status: 'ok', title: 'Вы успешно зарегистрировались!' })
      })
      .catch((err) => {
        setTooltip({
          status: 'nok',
          title:
            err.error ||
            err.message ||
            'Что-то пошло не так! Попробуйте ещё раз.',
        })
        console.error(err)
      })
  }

  function handleGoToSignUp() {
    history.push('/sign-up')
  }

  function handleGoToSignIn() {
    history.push('/sign-in')
  }

  // component states
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [deletingCard, setDeletingCard] = useState(null)

  // handling popups
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setConfirmDeletePopupOpen(false)
    setSelectedCard(null)
  }

  // handling user profile
  const handleEditProfileClick = () => setEditProfilePopupOpen(true)
  const handleUpdateUser = (user) => {
    closeAllPopups()
    api
      .setUserInfo(user)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Could not update user info:', error)
      })
  }

  // handling avatar
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true)
  const handleUpdateAvatar = (data) => {
    closeAllPopups()
    api
      .setUserAvatar(data)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Could not update user avatar:', error)
      })
  }

  // handling cards
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true)
  const handleCardClick = (card) => setSelectedCard(card)
  const handleImagePopupClose = () => setSelectedCard(null)
  function handleCardLike(card) {
    ;(card.liked
      ? api.unlikeCard(card._id, currentUser._id)
      : api.likeCard(card._id, currentUser._id)
    )
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c)),
        )
      })
      .catch((error) => {
        console.log('Could not like / unlike card:', error)
      })
  }
  function handleCardDelete(card) {
    setDeletingCard(card)
    setConfirmDeletePopupOpen(true)
  }
  function handleConfirmDeleteCard() {
    closeAllPopups()
    api
      .deleteCard(deletingCard._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== deletingCard._id))
      })
      .catch((error) => {
        console.log('Could not delete card:', error)
      })
  }
  function handleAddPlace(card) {
    closeAllPopups()
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards])
      })
      .catch((error) => {
        console.log('Could not save card:', error)
      })
  }

  // fetch currentUser on component mount
  useEffect(() => {
    if (!loggedIn) return
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser({
          _id: data._id,
          name: data.name,
          description: data.description,
          avatar: data.avatar,
        })
      })
      .catch((error) => {
        console.log('Could not fetch user info:', error)
      })
  }, [loggedIn])

  // fetch cards on current user update
  useEffect(() => {
    if (!loggedIn) return
    api
      .getInitialCards(currentUser._id)
      .then((cards) => {
        setCards(cards)
      })
      .catch((error) => {
        console.log('Could not fetch cards:', error)
      })
  }, [currentUser._id, loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-up">
          <Header buttonLabel="Войти" onButtonClick={handleGoToSignIn} />
          <Register onSubmit={handleRegisterSubmit} />
        </Route>

        <Route path="/sign-in">
          <Header buttonLabel="Регистрация" onButtonClick={handleGoToSignUp} />
          <Login onSubmit={handleLoginSubmit} />
        </Route>

        <ProtectedRoute path="/" loggedIn={loggedIn} exact>
          <Header
            email={email}
            buttonLabel="Выйти"
            onButtonClick={handleSignOut}
          />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleConfirmDeleteCard}
          />
          <ImagePopup card={selectedCard} onClose={handleImagePopupClose} />
        </ProtectedRoute>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <InfoTooltip
        title={tooltip.title}
        status={tooltip.status}
        visible={!!tooltip.status}
        onClose={handleInfoTooltipClose}
      />
    </CurrentUserContext.Provider>
  )
}

export default App
