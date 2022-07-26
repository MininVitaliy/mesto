const forms = {
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
function enableValidation (forms) {
  const formList = Array.from(document.querySelectorAll(forms.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(forms);

/** функция поиска input и button для проверки на валидность*/
function setEventListeners (formElement) {
  const buttonElement = formElement.querySelector(forms.button);
  const inputList = Array.from(formElement.querySelectorAll(forms.inputElementForm));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, forms);
    inputElement.addEventListener('input', () => {  
      checkInputValidity(formElement, inputElement, forms);
      toggleButtonState(inputList, buttonElement, forms);
    });
  });
  toggleButtonState(inputList, buttonElement, forms);
};

/** функция провека input на валидность и вызов соответсвующих функций для показа или скрытия ошибок */
function checkInputValidity (formElement, inputElement, forms) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, forms);
  } else {
    hideInputError(formElement, inputElement, forms);
  }
}

/** функция показа ошибок */
function showInputError (formElement, inputElement, errorMessage, forms) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.add(forms.inputInvalid);
  inputElement.classList.remove(forms.inputValid);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(forms.errorClass);
  if (errorElement.textContent.length > 60 && errorElement.classList.contains(forms.spanFormLittleLines)) {
    errorElement.classList.remove(forms.spanFormLittleLines);
    errorElement.classList.add(forms.spanForm);
  };
  if (errorElement.textContent.length < 60 && errorElement.classList.contains(forms.spanForm)) {
    errorElement.classList.add(forms.spanFormLittleLines);
    errorElement.classList.remove(forms.spanForm);
  };
};

/** функция скрытия ошибок */
function hideInputError (formElement, inputElement, forms) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.remove(forms.inputInvalid);
  inputElement.classList.add(forms.inputValid);
  errorElement.textContent = '';
  errorElement.classList.remove(forms.errorClass);
  if (errorElement.classList.contains(forms.spanFormLittleLines)) {
    errorElement.classList.remove(forms.spanFormLittleLines);
    errorElement.classList.add(forms.spanForm);
  };
};

/** функция включения или выключения кнопки сохранить в зависимости от валидности или не валидности
input открытой формы в целом */
function toggleButtonState (inputList, buttonElement, forms) {
  if (hasInvalidInput (inputList)) { 
  buttonElement.classList.add(forms.buttonInvalid);
  buttonElement.classList.remove(forms.buttonValid);
  buttonElement.setAttribute('disabled', true);
  } else {
  buttonElement.classList.remove(forms.buttonInvalid);
  buttonElement.classList.add(forms.buttonValid);
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
  const buttonPopupProfile = popup.querySelector(forms.button);
  buttonPopupProfile.classList.remove(forms.buttonInvalid);
  buttonPopupProfile.classList.add(forms.buttonValid);
  buttonPopupProfile.removeAttribute('disabled');
  popup.querySelectorAll(`.${forms.errorClass}`).forEach((element) => {
    if (element.classList.contains(forms.errorClass)) {
      element.classList.remove(forms.errorClass);
    } else if (element.classList.contains(forms.spanFormLittleLines)) {
      element.classList.remove(forms.spanFormLittleLines);
    };
    element.classList.add(forms.spanForm);
    element.textContent = '';
  });
  popup.querySelectorAll(selectors.popupForm).forEach((element) => {
    if (element.classList.contains(forms.inputInvalid)) {
      element.classList.remove(forms.inputInvalid);
      element.classList.add(forms.inputValid);
    };
  });
};