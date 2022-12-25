class Auth {
  constructor(options) {
    this._options = options
  }

  // --- работа с авторизацией
  signup(email, password) {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }
    return fetch(this._url('signup'), this._init(config))
      .then(this._handleResponse)
      .then((res) => ({ _id: res.data._id, email: res.data.email }))
  }

  signin(email, password) {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    }
    return fetch(this._url('signin'), this._init(config))
      .then(this._handleResponse)
      .then((data) => data.token)
  }

  usersMe(token) {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return fetch(this._url('users/me'), this._init(config))
      .then(this._handleResponse)
      .then((res) => ({ _id: res.data._id, email: res.data.email }))
  }

  // --- вспомогательные приватные методы
  _url(path) {
    return `${this._options.baseUrl}/${path}`
  }

  _init(config) {
    return {
      headers: this._options.headers,
      ...config,
    }
  }

  _handleResponse(res) {
    if (res.ok) return res.json()
    return res.json().then((data) => Promise.reject(data))
  }
}

const auth = new Auth({
  baseUrl: 'https://web-exp.nomoredomains.club/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default auth
