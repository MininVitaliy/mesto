import Popup from './Popup.js';

export default  class PopupWithForm extends Popup {
  constructor ({popupSelector, sabmitForm, selector, api}) {
    super(popupSelector, selector);
    this._popupForm = selector.popupForm;
    this._popupForms = selector.popupForms;
    this._sabmitForm = sabmitForm;
    this._inputList = this._popupElement.querySelectorAll(this._popupForm);
    this._form = this._popupElement.querySelector(this._popupForms);
    this._api= api;
  };

  /** приватный метод поиска всех input и извлечения данных из них*/
  _getInputValues () {
    this._formValues = {};
    for (var i = 0; i < this._inputList.length; ++i) {
      this._formValues[this._inputList[i].name] = this._inputList[i].value;
    };
    return this._formValues;
  };

  /** навешивания обработчика событий submit*/
  setEventListeners () {
    super.setEventListeners ();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sabmitForm(this._getInputValues ());
    })
  }; 

  /** метод закрытия попапа - перезаписаный */ 
  close () { 
    super.close(); 
    this._form.reset(); 
  }; 
};