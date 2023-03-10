class Api {
  constructor(options) {
    this._options = options
  }

  // --- работа с профилем пользователя
  getUserInfo() {
    return fetch(this._url('users/me'), this._init())
      .then(this._handleResponse)
      .then((userInfo) => this._toUserInfo(userInfo))
  }

  setUserInfo(data) {
    const config = {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }
    return fetch(this._url('users/me'), this._init(config))
      .then(this._handleResponse)
      .then((userInfo) => this._toUserInfo(userInfo))
  }

  setUserAvatar(data) {
    const config = {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }
    return fetch(this._url('users/me/avatar'), this._init(config))
      .then(this._handleResponse)
      .then((userInfo) => this._toUserInfo(userInfo))
  }

  // --- работа с карточками
  getInitialCards(userId) {
    return fetch(this._url('cards'), this._init())
      .then(this._handleResponse)
      .then((cards) => cards.data.map((card) => this._toCard(card, userId)))
  }

  addCard(data) {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }
    return fetch(this._url('cards'), this._init(config))
      .then(this._handleResponse)
      .then((card) => this._toCard(card, card.owner))
  }

  deleteCard(id) {
    const config = {
      method: 'DELETE',
    }
    return fetch(this._url(`cards/${id}`), this._init(config)).then(
      this._handleResponse,
    )
  }

  // --- работа с лайками
  likeCard(id, userId) {
    const config = {
      method: 'PUT',
    }
    return fetch(this._url(`cards/${id}/likes`), this._init(config))
      .then(this._handleResponse)
      .then((card) => this._toCard(card.data, userId))
  }

  unlikeCard(id, userId) {
    const config = {
      method: 'DELETE',
    }
    return fetch(this._url(`cards/${id}/likes`), this._init(config))
      .then(this._handleResponse)
      .then((card) => this._toCard(card.data, userId))
  }

  // --- вспомогательные приватные методы
  _url(path) {
    return `${this._options.baseUrl}/${path}`
  }

  _init(config = {}) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      ...config.headers,
      ...this._options.headers,
    }
    return config
  }

  _toCard(card, userId) {
    return {
      _id: card._id,
      name: card.name,
      link: card.link,
      alt: `${card.name} by ${card.owner.name}`,
      likes: card.likes.length,
      liked: card.likes.some((user) => user._id === userId),
      owned: card.owner._id === userId,
    }
  }

  _toUserInfo(userInfo) {
    userInfo = userInfo.data
    return {
      _id: userInfo._id,
      name: userInfo.name,
      description: userInfo.about,
      avatar: userInfo.avatar,
    }
  }

  _handleResponse(res) {
    if (res.ok) return res.json()
    return Promise.reject(`Request failed: ${res.status}`)
  }
}

const api = new Api({
  baseUrl: 'https://api.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
