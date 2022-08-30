import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector, item) {
    super(popupSelector, item);
    this._popupSelectorName = this._popupElement.querySelector(item.popupGroupTitle);
    this._popupSelectorImage = this._popupElement.querySelector(item.popupGroup);
  };

  /** метод открытия попапа с картинокй и наменованием карточки */
  open(name, link) {
    this._popupSelectorName .textContent = name;
    this._image = this._popupSelectorImage;
    this._image.src = link;
    this._image.alt =`Фото ${name}`;
    super.open();
  }
};