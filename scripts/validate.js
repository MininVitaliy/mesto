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
};

/** запуск валидации форм */
function enableValidation (params) {
  const formList = Array.from(document.querySelectorAll(params.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(params);

/** функция поиска input и button для проверки на валидность*/
function setEventListeners (formElement) {
  const buttonElement = formElement.querySelector(params.button);
  const inputList = Array.from(formElement.querySelectorAll(params.inputElementForm));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.addEventListener('input', () => {  
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
};

/** функция провека input на валидность и вызов соответсвующих функций для показа или скрытия ошибок */
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

/** функция показа ошибок */
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.add(params.inputInvalid);
  inputElement.classList.remove(params.inputValid);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
  if (errorElement.textContent.length > 60 && errorElement.classList.contains(params.spanFormLittleLines)) {
    errorElement.classList.remove(params.spanFormLittleLines);
    errorElement.classList.add(params.spanForm);
  };
  if (errorElement.textContent.length < 60 && errorElement.classList.contains(params.spanForm)) {
    errorElement.classList.add(params.spanFormLittleLines);
    errorElement.classList.remove(params.spanForm);
  };
};

/** функция скрытия ошибок */
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.remove(params.inputInvalid);
  inputElement.classList.add(params.inputValid);
  errorElement.textContent = '';
  errorElement.classList.remove(params.errorClass);
  if (errorElement.classList.contains(params.spanFormLittleLines)) {
    errorElement.classList.remove(params.spanFormLittleLines);
    errorElement.classList.add(params.spanForm);
  };
};

/** функция включения или выключения кнопки сохранить в зависимости от валидности или не валидности
input открытой формы в целом */
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput (inputList)) { 
    buttonElement.classList.add(params.buttonInvalid);
    buttonElement.classList.remove(params.buttonValid);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(params.buttonInvalid);
    buttonElement.classList.add(params.buttonValid);
    buttonElement.removeAttribute('disabled');
  };
};

/** функция проверки валидности всех input в формах */
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => { 
  return !inputElement.validity.valid;
  });
};

/** функция для отладки формы profile при открытии (start)*/
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
  popup.querySelectorAll(selectors.popupForm).forEach((element) => {
    if (element.classList.contains(params.inputInvalid)) {
      element.classList.remove(params.inputInvalid);
      element.classList.add(params.inputValid);
    };
  });
};

/** функция для отладки формы mesto при сохранении и повторном открытии (start)*/
function makeInvalidButtonAtTheStart (popup) {
  const buttonPopup = popup.querySelector(params.button);
  buttonPopup.classList.add(params.buttonInvalid);
  buttonPopup.classList.remove(params.buttonValid);
  buttonPopup.setAttribute('disabled', true);
};