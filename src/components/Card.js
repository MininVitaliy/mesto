class Card {
  /** конструктор - прием масива и селектора-template */
  constructor(card, templateSelector, handleCardClick, item) {  
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleOpenCardPopup = handleCardClick;
    this._element = item.element;
    this._elementMasckGroup = item.elementMasckGroup;
    this._elementTitle = item.elementTitle;
    this._elementHeart = item.elementHeart;
    this._elementHeartActive = item.elementHeartActive;
    this._elementGarbage = item.elementGarbage;
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
    this._changeTheHeartLike ();
    this._deleteImageLocation ();
    this._openСardPopup ();
    return this._fotoElement;
  };

  /** изменения сердечка лайк на закрашенный и обратно */
  _changeTheHeartLike () {
    this._fotoElement.querySelector(this._elementHeart).addEventListener('click', (evt) => {
    evt.target.classList.toggle(this._elementHeartActive);
    });
  };

  /** удаление картинки места */
  _deleteImageLocation () {
    this._fotoElement.querySelector(this._elementGarbage).addEventListener('click', () => {
      this._fotoElement.remove();
      this._fotoElement = null;
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