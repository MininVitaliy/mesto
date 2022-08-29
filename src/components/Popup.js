export default class Popup {
  constructor (popupSelector, item) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._active = item.popupOpened;
    this._popupButtonCloseElement = item.popupButtonClose;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePpupopOverlay = this._closePpupopOverlay.bind(this);
  };
  
  /** метод открытия попапа и навешивания обработчика событий для закрытия попапа на ESC */
  open () {
    this._popupElement.classList.add(`${this._active}`);
    /** навешивание обработчика события: закрытие - Esc */
    document.addEventListener('keydown', this._handleEscClose); 
  };

  /** метод закрытия попапа и снятия обработчика событий для закрытия попапа на ESC */
  close () {
    this._popupElement.classList.remove(`${this._active}`);  
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
    this._popupCloseButton = this._popupElement.querySelector(this._popupButtonCloseElement);
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('click', this._closePpupopOverlay);
  };
};