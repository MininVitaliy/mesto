const formProfileValidity = {
  form: '.popup_open_profil',
  button: '.popup__button-save',
  buttonValid: 'popup__button-save_valid',
  buttonInvalid: 'popup__button-save_invalid',
  inputElementForm: '.popup__form',
  inputValid: 'popup__form_valid',
  inputInvalid: 'popup__form_invalid',
  spanFormLittleLines: 'popup__error_little-lines',
  spanForm: 'popup__form_span',
  errorClass: 'popup__error',
};

const formMestoValidity = {
  form: '.popup_open_mesto',
  button: '.popup__button-save',
  buttonValid: 'popup__button-save_valid',
  buttonInvalid: 'popup__button-save_invalid',
  inputElementForm: '.popup__form',
  inputValid: 'popup__form_valid',
  inputInvalid: 'popup__form_invalid',
  spanFormLittleLines: 'popup__error_little-lines',
  spanForm: 'popup__form_span',
  errorClass: 'popup__error'
};

/** функция определения открытой формы к какому обьекту относится */
function activForm (popup) {
  if (popup.classList.contains('popup_open_profil')) {
    enableValidation(formProfileValidity); 
  } else if (popup.classList.contains('popup_open_mesto')) {   
    enableValidation(formMestoValidity);
  };  
};

/** запуск валидации только открытой формы */
function enableValidation (activForm) {
  const formElement = document.querySelector(activForm.form);
  const buttonElement = formElement.querySelector(activForm.button);
  const inputList = Array.from(formElement.querySelectorAll(activForm.inputElementForm));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, activForm);
    inputElement.addEventListener('input', () => {  
      checkInputValidity(formElement, inputElement, activForm);
      toggleButtonState(inputList, buttonElement, activForm);
    });
  });
  toggleButtonState(inputList, buttonElement, activForm);
};

/** провека input на валидность и вызов соответсвующих функций для показа или скрытия ошибок */
function checkInputValidity (formElement, inputElement, activForm) {
  hideInputError(formElement, inputElement, activForm);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, activForm);
  } else {
    hideInputError(formElement, inputElement, activForm);
  }
}

/** функция показа ошибок */
function showInputError (formElement, inputElement, errorMessage, activForm) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.add(activForm.inputInvalid);
  inputElement.classList.remove(activForm.inputValid);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(activForm.errorClass);
  if (errorElement.textContent.length > 60 && errorElement.classList.contains(activForm.spanFormLittleLines)) {
    errorElement.classList.remove(activForm.spanFormLittleLines);
    errorElement.classList.add(activForm.spanForm);
  };
  if (errorElement.textContent.length < 60 && errorElement.classList.contains(activForm.spanForm)) {
    errorElement.classList.add(activForm.spanFormLittleLines);
    errorElement.classList.remove(activForm.spanForm);
  };
};

/** функция скрытия ошибок */
function hideInputError (formElement, inputElement, activForm) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.remove(activForm.inputInvalid);
  inputElement.classList.add(activForm.inputValid);
  errorElement.textContent = '';
  errorElement.classList.remove(activForm.errorClass);
  if (errorElement.classList.contains(activForm.spanFormLittleLines)) {
    errorElement.classList.remove(activForm.spanFormLittleLines);
    errorElement.classList.add(activForm.spanForm);
  };
};

/** функция включения или выключения кнопки сохранить в зависимости от валидности или не валидности
input открытой формы в целом */
function toggleButtonState (inputList, buttonElement, activForm) {
  if (hasInvalidInput (inputList)) { 
  buttonElement.classList.add(activForm.buttonInvalid);
  buttonElement.classList.remove(activForm.buttonValid);
  buttonElement.setAttribute('disabled', true);
  } else {
  buttonElement.classList.remove(activForm.buttonInvalid);
  buttonElement.classList.add(activForm.buttonValid);
  buttonElement.removeAttribute('disabled');
  };
};

/** функция проверки валидности всех input в открытой форме */
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => { 
  return !inputElement.validity.valid;
  });
};