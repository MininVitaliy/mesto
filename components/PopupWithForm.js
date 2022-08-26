import Popup from './Popup.js';
import {selectorsCard} from './utils.js';

export default  class PopupWithForm extends Popup {
  constructor ({popupSelector, sabmitForm}) {
    super(popupSelector);
    this._popupSelector = document.querySelector(`.${popupSelector}`);
    this._sabmitForm = sabmitForm;
  };

  /** приватный метод поиска всех input и извлечения данных из них*/
  _getInputValues () {
    this._formValues = {};
    this._inputList = this._popupSelector.querySelectorAll(selectorsCard.popupForm);
    for (var i = 0; i < this._inputList.length; ++i) {
      this._formValues[i] = this._inputList[i].value;
    };
    return this._formValues;
  };

  /** навешивания обработчика событий submit*/
  setEventListeners () {
    super.setEventListeners ();
    this._form = this._popupSelector.querySelector(selectorsCard.popupForms);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sabmitForm({name: this._getInputValues ()[0], link: this._getInputValues ()[1]})
      this._close ();
      this._form.reset();
    })
  }; 
  
  /** метод закрытия попапа - перезаписаный */
  _close () {
    super.close();    
  }
};