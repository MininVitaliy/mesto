export default class Api {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
    this._authorization = obj.headers;
  }
  
  getInitialCards () {
    return fetch( `${this._baseUrl}/cards`, {
      headers: this._authorization
    })
    .then(this._checkResponse)
  };
  
  getInitialUserMe () {
    return fetch( `${this._baseUrl}/users/me`, {
      headers: this._authorization
    })
    .then(this._checkResponse)
  };

  changeUserProfile (nameNew, aboutNew) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
        name: `${nameNew}`,
        about: `${aboutNew}`
      })
    })
    .then(this._checkResponse)
  };
  
  changeUserAvatar (avatarNew) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
         avatar: `${avatarNew}`
      })
    })
    .then(this._checkResponse)
  };

  addNewCardOnTheServer (nameNewCard, linkNewCard) {
    return fetch( `${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._authorization,
      body: JSON.stringify({
        name: `${nameNewCard}`,
        link: `${linkNewCard}`
      })
    })
    .then(this._checkResponse)
  }

  deleteCardTheServer (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}`, {
      method: 'DELETE',
      headers: this._authorization,  
    })
    .then(this._checkResponse)
  }

  addLike (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}/likes`, {
      method: 'PUT',
      headers: this._authorization
    })
    .then(this._checkResponse)
  }

  deleteLike (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}/likes`, {
      method: 'DELETE',
      headers: this._authorization,  
    })
    .then(this._checkResponse)
  }
  
  _checkResponse (res) {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
  };
};