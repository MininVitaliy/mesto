export default class Api {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
    this._authorization = obj.headers;
  }
  
  getInitialCards () {
    return fetch( `${this._baseUrl}/cards`, {
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  };
  
  getInitialUserMe () {
    return fetch( `${this._baseUrl}/users/me`, {
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  };
  
  changeUserAvatar (avatarNew) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
         avatar: `${avatarNew}`
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCardTheServer (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}`, {
      method: 'DELETE',
      headers: this._authorization,  
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}/likes`, {
      method: 'PUT',
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteLike (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}/likes`, {
      method: 'DELETE',
      headers: this._authorization,  
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
};