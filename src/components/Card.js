class Card {
  /** конструктор - прием масива и селектора-template */
  constructor(card, templateSelector, handleCardClick, item, api, idUser, popupWithConfirmation) {  
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._templateSelector = templateSelector;
    this._handleOpenCardPopup = handleCardClick;
    this._element = item.element;
    this._elementMasckGroup = item.elementMasckGroup;
    this._elementTitle = item.elementTitle;
    this._elementHeart = item.elementHeart;
    this._elementHeartActive = item.elementHeartActive;
    this._elementGarbage = item.elementGarbage;
    this._api = api;
    this._idUser = idUser;
    this._popupWithConfirmation = popupWithConfirmation;
  };
  
  /** поиск и клонирования template элемента*/
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(this._element).cloneNode(true);
    return cardElement;
  };

  /** создания карточки */
  createCard () {
    this._fotoElement = this._getTemplate();
    this._photoOfTheCard = this._fotoElement.querySelector(this._elementMasckGroup);
    this._fotoElement.querySelector(this._elementTitle).textContent = this._name;
    this._photoOfTheCard.src = this._link;
    this._photoOfTheCard.alt = `Фото ${this._name}`;
    this._fotoElement.querySelector('.element__likes').textContent = this._likes.length;
    this._putStartingLike ();
    this._changeTheHeartLike ();
    this._openImageLocationForm () 
    this._openСardPopup ();
    return this._fotoElement;
  };

  /** проверка ранее поставленного лайка и навешевания активного знака */
  _putStartingLike () {
    this._meLike = this._likes.filter(item => item._id === this._idUser)
    if (this._meLike.length > 0) {
      this._fotoElement.querySelector(this._elementHeart).classList.add(this._elementHeartActive)
    } else if (this._meLike.length === 0){
      this._fotoElement.querySelector(this._elementHeart).classList.remove(this._elementHeartActive)
    };
  }

  /** изменения сердечка лайк на закрашенный и обратно */
  _changeTheHeartLike () {
    this._fotoElement.querySelector(this._elementHeart).addEventListener('click', (evt) => {      
      if (this._fotoElement.querySelector(this._elementHeart).classList.contains(this._elementHeartActive)) {
        evt.target.classList.add(this._elementHeartActive)
        this._api.deleteLike (this._id) 
          .then((res)=> {
          this._fotoElement.querySelector('.element__likes').textContent = res.likes.length
          })
          .then(() =>  evt.target.classList.toggle(this._elementHeartActive))
          .catch(err => console.log(err))
      } else {
        evt.target.classList.remove(this._elementHeartActive)
        this._api.addLike (this._id) 
          .then((res)=> {
            this._fotoElement.querySelector('.element__likes').textContent = res.likes.length
          })
          .then(() =>  evt.target.classList.toggle(this._elementHeartActive))
          .catch(err => console.log(err))
      }
    });
  };

  /** открытие поппа для потверждения удаления карточки */
  _openImageLocationForm () {
    this._fotoElement.querySelector(this._elementGarbage).addEventListener('click', () => {     
      this._popupWithConfirmation.popupApi (this._id, this._fotoElement);
      this._popupWithConfirmation.open ();
    });
  };

   /** открытие попапа с картинкой - навешивание обработчика событий */
  _openСardPopup () {
    this._photoOfTheCard.addEventListener('click', () =>{ 
      this._handleOpenCardPopup(this._name, this._link) 
    });
  };
};

/** экспорт данных в другие модули*/
export default Card;