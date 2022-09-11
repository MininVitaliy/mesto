import Popup from './Popup.js';

export default  class PopupWithConfirmation extends Popup {
  constructor ({popupSelector, sabmitForm, selector, api}) {
    super(popupSelector, selector);
    this._popupForms = selector.popupForms;
    this._sabmitForm = sabmitForm;
    this._form = this._popupElement.querySelector(this._popupForms);
    this._api = api;
  };

  /** форма удаления карточки */
  setEventListeners () {
    super.setEventListeners ();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sabmitForm (this._id, this._cardDelete)
    })
  };

  popupApi (id, cardDelete) {
    this._id = id
    this._cardDelete = cardDelete;
  };
  
  qwrtyFotolement (cardElement) {
    this._elementCard = cardElement;
    console.log(cardElement)
  }
};



 