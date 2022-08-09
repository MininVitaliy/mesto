const params = {
  form: '.popup__forms-input',
  button: '.popup__button-save',
  buttonValid: 'popup__button-save_valid',
  buttonInvalid: 'popup__button-save_invalid',
  inputElementForm: '.popup__form',
  inputValid: 'popup__form_valid',
  inputInvalid: 'popup__form_invalid',
  spanFormLittleLines: 'popup__error_little-lines',
  spanForm: 'popup__span',
  errorClass: 'popup__error',
  popupForm: '.popup__form'
};

class FormValidator {
  constructor(item, formElement) {      
    this._form = item.form;
    this._button = item.button;
    this._buttonValid = item.buttonValid;
    this._buttonInvalid = item.buttonInvalid;
    this._inputElementForm = item.inputElementForm;
    this._inputValid = item.inputValid;
    this._inputInvalid = item.inputInvalid;
    this._spanFormLittleLines = item.spanFormLittleLines;
    this._spanForm = item.spanForm;
    this._errorClass = item.errorClass;
    this._formElement = formElement;
   
  };

  /** запуск валидации форм */
  enableValidation () {
    this._setEventListeners();
  };


  /** функция поиска input и button для проверки на валидность*/
  _setEventListeners () {
    this._buttonElement = this._formElement.querySelector(this._button);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElementForm));
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.addEventListener('input', () => {  
        this._checkInputValidity (inputElement);
        this._toggleButtonState ();
      });
    });
    this._toggleButtonState ();
  };
  
  /** функция провека input на валидность и вызов соответсвующих функций для показа или скрытия ошибок */
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  /** функция показа ошибок */
  _showInputError (inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}_error`);
    inputElement.classList.add(this._inputInvalid);
    inputElement.classList.remove(this._inputValid);
    this._errorElement.textContent =  errorMessage;
    this._errorElement.classList.add(this._errorClass);
    if (this._errorElement.textContent.length > 60 && this._errorElement.classList.contains(this._spanFormLittleLines)) {
      this._errorElement.classList.remove(this._spanFormLittleLines);
      this._errorElement.classList.add(this._spanForm);
    };
    if (this._errorElement.textContent.length < 60 && this._errorElement.classList.contains(this._spanForm)) {
      this._errorElement.classList.add(this._spanFormLittleLines);
      this._errorElement.classList.remove(this._spanForm);
    };
  };
  
  /** функция скрытия ошибок */
  _hideInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}_error`);
    inputElement.classList.remove(this._inputInvalid);
    inputElement.classList.add(this._inputValid);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
    if (this._errorElement.classList.contains(this._spanFormLittleLines)) {
      this._errorElement.classList.remove(this._spanFormLittleLines);
      this._errorElement.classList.add(this._spanForm);
    };
  };
  
  /** функция включения или выключения кнопки сохранить в зависимости от валидности или не валидности
  input открытой формы в целом */
  _toggleButtonState () {
    if (this._hasInvalidInput ()) { 
      this._buttonElement.classList.add(this._buttonInvalid);
      this._buttonElement.classList.remove(this._buttonValid);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._buttonInvalid);
      this._buttonElement.classList.add(this._buttonValid);
      this._buttonElement.removeAttribute('disabled');
    };
  };
  
  /** функция проверки валидности всех input в формах */
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => { 
    return !inputElement.validity.valid;
    });
  };
};

class ValidFormAtTheStart {
  constructor(item, popup) {      
    this._form = item.form;
    this._button = item.button;
    this._buttonValid = item.buttonValid;
    this._buttonInvalid = item.buttonInvalid;
    this._inputElementForm = item.inputElementForm;
    this._inputValid = item.inputValid;
    this._inputInvalid = item.inputInvalid;
    this._spanFormLittleLines = item.spanFormLittleLines;
    this._spanForm = item.spanForm;
    this._errorClass = item.errorClass;
    this._popupForm = item.popupForm;
    this._popup = popup;
  };
  
  /** функция для отладки формы profile при открытии (start)*/
  makeValidFormAtTheStart () {
    this._buttonPopup = this._popup.querySelector(this._button);
    this._buttonPopup.classList.remove(this._buttonInvalid);
    this._buttonPopup.classList.add(this._buttonValid);
    this._buttonPopup.removeAttribute('disabled');
    this._popup.querySelectorAll(`.${this._errorClass}`).forEach((element) => {
      if (element.classList.contains(this._errorClass)) {
        element.classList.remove(this._errorClass);
      } else if (element.classList.contains(this._spanFormLittleLines)) {
        element.classList.remove(this._spanFormLittleLines);
      };
      element.classList.add(this._spanForm);
      element.textContent = '';
    });
    this._popup.querySelectorAll(this._popupForm).forEach((element) => {
      if (element.classList.contains( this._inputInvalid)) {
        element.classList.remove( this._inputInvalid);
        element.classList.add(this._inputValid);
      };
    });
  };
};

class InvalidButtonAtTheStart {
  constructor(item, popup) {      
    this._button = item.button;
    this._buttonValid = item.buttonValid;
    this._buttonInvalid = item.buttonInvalid;
    this._popup = popup;
  };

  /** функция для отладки формы mesto при сохранении и повторном открытии (start)*/
  makeInvalidButtonAtTheStart () {
    this._buttonPopup = this._popup.querySelector(this._button);
    this._buttonPopup.classList.add( this._buttonInvalid);
    this._buttonPopup.classList.remove(this._buttonValid );
    this._buttonPopup.setAttribute('disabled', true);
  };
};

const formList = Array.from(document.querySelectorAll(params.form));
formList.forEach((formElement) => {
  const card = new FormValidator (params, formElement);
  card.enableValidation ();
});

export {InvalidButtonAtTheStart, ValidFormAtTheStart, params};