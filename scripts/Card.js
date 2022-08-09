/** данные по первым 6 карточкам */
const initialCards = [
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1604231787570-99263ec7b715?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1504615458222-979e04d69a27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80'
  },
  {
    name: 'Петергоф',
    link: 'https://images.unsplash.com/photo-1577695912741-960e89e5dcee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Казбек',
    link: 'https://images.unsplash.com/photo-1611090179322-b398bbfd0c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1619527441512-97d55b860d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
  }
]; 

/** упорядочевания классов в selectorsCard */
const selectorsCard = {
  element: '.element',
  elementMasckGroup: '.element__masck-group',
  elementTitle: '.element__title',
  elementHeart: '.element__heart',
  elementHeartActive: 'element__heart_active',
  elementGarbage: '.element__garbage',
  popupGroupTitle: '.popup__group-title',
  popupGroup: '.popup__group',
  popupFoto:'.popup_image',
  popupOpened: '.popup_opened',
  buttonClosePopup: '.popup__button-close'
};

/** поиск классов */
const popupFoto = document.querySelector(selectorsCard.popupFoto);
const buttonClosePopupFoto = popupFoto.querySelector(selectorsCard.buttonClosePopup);

/** импорт данных из других модулей*/
import {openPopup, closePopup, renderCard} from './index.js';

class Card {
  /** конструктор - прием масива и селектора-template */
  constructor(card, templateSelector) {  
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
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
    this._closeСardPopup ();
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

  /** открытие попапа с картинкой */
  _openСardPopup () {
    this._photoOfTheCard.addEventListener('click', () => {
      this._groupTitle = document.querySelector(selectorsCard.popupGroupTitle);
      this._groupImage = document.querySelector(selectorsCard.popupGroup)
      this._groupTitle.textContent = this._name;
      this._groupImage.src = this._link;
      this._groupImage.alt = `Фото ${this._name}`;
      openPopup(popupFoto);
    });
  };

  /** закрытие попапа с картинкой */
  _closeСardPopup () {
    buttonClosePopupFoto.addEventListener('click', () => {
    closePopup(popupFoto);
    });
  };
};

/** добавление 6 первых карточек*/
initialCards.forEach((item) => {
  const card = new Card(item, '.foto-template');
  const cardElement = card.createCard ();
  renderCard(cardElement);
});

/** экспорт данных в другие модули*/
export default Card;