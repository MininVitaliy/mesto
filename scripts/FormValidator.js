import {params} from './utils.js';

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

const formList = Array.from(document.querySelectorAll(params.form));
formList.forEach((formElement) => {
  const card = new FormValidator (params, formElement);
  card.enableValidation ();
});

/** функция для отладки формы profile при открытии (start) - вопрос ВАЛИДАЦИИ*/
function makeValidFormAtTheStart (popup) {
  const buttonPopup = popup.querySelector(params.button);
  buttonPopup.classList.remove(params.buttonInvalid);
  buttonPopup.classList.add(params.buttonValid);
  buttonPopup.removeAttribute('disabled');
  popup.querySelectorAll(`.${params.errorClass}`).forEach((element) => {
    if (element.classList.contains(params.errorClass)) {
      element.classList.remove(params.errorClass);
    } else if (element.classList.contains(params.spanFormLittleLines)) {
      element.classList.remove(params.spanFormLittleLines);
    };
    element.classList.add(params.spanForm);
    element.textContent = '';
  });
  popup.querySelectorAll(params.popupForm).forEach((element) => {
    if (element.classList.contains(params.inputInvalid)) {
      element.classList.remove(params.inputInvalid);
      element.classList.add(params.inputValid);
    };
  });
};

/** функция для отладки формы mesto при сохранении и повторном открытии (start) - вопрос ВАЛИДАЦИИ*/
function makeInvalidButtonAtTheStart (popup) {
  const buttonPopup = popup.querySelector(params.button);
  buttonPopup.classList.add(params.buttonInvalid);
  buttonPopup.classList.remove(params.buttonValid);
  buttonPopup.setAttribute('disabled', true);
};

export {makeValidFormAtTheStart, makeInvalidButtonAtTheStart};