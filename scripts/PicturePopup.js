import Popup from './Popup.js';
import {selectorsCard} from './utils.js';

export default class PopupWithImage extends Popup {
  constructor (name, link, popupSelector) {
    super(popupSelector);
    this._popupSelector = document.querySelector(`.${popupSelector}`)
    this._name = name;
    this._link = link;
  };

  /** метод открытия попапа с картинокй и наменованием карточки */
  open() {
    super.open();
    super.setEventListeners ();
    this._popupSelector.querySelector(selectorsCard.popupGroupTitle).textContent = this._name;
    this._image = this._popupSelector.querySelector(selectorsCard.popupGroup);
    this._image.src = this._link;
    this._image.alt = `Фото ${this._name}`;
  }
};