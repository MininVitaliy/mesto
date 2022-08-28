import {selectorsCard} from './utils.js';

export default class Popup {
  constructor (popupSelector) {
  this.popupSelector = document.querySelector(`.${popupSelector}`)
  this._active = selectorsCard.popupOpened;
  this._handleEscClose = this._handleEscClose.bind(this);
  this._closePpupopOverlay = this._closePpupopOverlay.bind(this);
  };
  
  /** метод открытия попапа и навешивания обработчика событий для закрытия попапа на ESC */
  open () {
    this.popupSelector.classList.add(`${this._active}`);
    /** навешивание обработчика события: закрытие - Esc */
    document.addEventListener('keydown', this._handleEscClose); 
  };

  /** метод закрытия попапа и снятия обработчика событий для закрытия попапа на ESC */
  close () {
    this.popupSelector.classList.remove(`${this._active}`);  
    /** удаление обработчика события: закрытие - Esc */
    document.removeEventListener('keydown', this._handleEscClose);
  };

  /** приватный метод закрытия попапа при нажатии на ESC */
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  /** приватный метод закрытия попапа при нажатии на затемненую область */
  _closePpupopOverlay  (evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    };
    this.close();
  };

  /** навешивания обработчиков событий для закрытия на крестик и при нажатии на затемненую область*/
  setEventListeners () {
    this._popupCloseButton = this.popupSelector.querySelector(selectorsCard.popupButtonClose);
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this.popupSelector.addEventListener('click', this._closePpupopOverlay);
  };
};