/** импорт данных из других модулей*/
import {renderCard, createCard} from './index.js';
import {initialCards, selectorsCard} from './utils.js';

class Card {
  /** конструктор - прием масива и селектора-template */
  constructor(card, templateSelector, handleOpenCardPopup) {  
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleOpenCardPopup = handleOpenCardPopup; 
  };
  
  /** поиск и клонирования template элемента*/
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(selectorsCard.element).cloneNode(true);
    return cardElement;
  };

  /** создания карточки */
  createCard () {
    this._fotoElement = this._getTemplate();
    this._photoOfTheCard = this._fotoElement.querySelector(selectorsCard.elementMasckGroup);
    this._fotoElement.querySelector(selectorsCard.elementTitle).textContent = this._name;
    this._photoOfTheCard.src = this._link;
    this._photoOfTheCard.alt = `Фото ${this._name}`;
    this._changeTheHeartLike ();
    this._deleteImageLocation ();
    this._openСardPopup ();
    //this._closeСardPopup ();
    return this._fotoElement;
  };

  /** изменения сердечка лайк на закрашенный и обратно */
  _changeTheHeartLike () {
    this._fotoElement.querySelector(selectorsCard.elementHeart).addEventListener('click', (evt) => {
    evt.target.classList.toggle(selectorsCard.elementHeartActive);
    });
  };

  /** удаление картинки места */
  _deleteImageLocation () {
    this._fotoElement.querySelector(selectorsCard.elementGarbage).addEventListener('click', () => {
      this._fotoElement.remove();
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

/** добавление 6 первых карточек*/
initialCards.forEach((item) => {
  const card = createCard(item);
  renderCard(card);
});