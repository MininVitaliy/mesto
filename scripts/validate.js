const formProfileValidity = {
  form: '.popup_open_profil',
  button: '.popup__button-save',
  buttonValid: 'popup__button-save_valid',
  buttonInvalid: 'popup__button-save_invalid',
  inputElementForm: '.popup__form',
  inputValid: 'popup__form_valid',
  inputInvalid: 'popup__form_invalid',
  errorClass: 'popup__error'
};

const formMestoValidity = {
  form: '.popup_open_mesto',
  button: '.popup__button-save',
  buttonValid: 'popup__button-save_valid',
  buttonInvalid: 'popup__button-save_invalid',
  inputElementForm: '.popup__form',
  inputValid: 'popup__form_valid',
  inputInvalid: 'popup__form_invalid',
  errorClass: 'popup__error'
};

function activForm (popup) {
  if (popup.classList.contains('popup_open_profil')) {
    enableValidation(formProfileValidity); 
  } else if (popup.classList.contains('popup_open_mesto')) {   
    enableValidation(formMestoValidity);
  };  
};

function enableValidation (activForm) {
  const formElement = document.querySelector(activForm.form);
  setEventListeners(formElement, activForm);
};

function setEventListeners (formElement, activForm) {
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

function checkInputValidity (formElement, inputElement, activForm) {
  hideInputError(formElement, inputElement, activForm);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, activForm);
  } else {
    hideInputError(formElement, inputElement, activForm);
  }
}

function showInputError (formElement, inputElement, errorMessage, activForm) {
    const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
    inputElement.classList.add(activForm.inputInvalid);
    inputElement.classList.remove(activForm.inputValid);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(activForm.errorClass);
  };
  
function hideInputError (formElement, inputElement, activForm) {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.remove(activForm.inputInvalid);
  inputElement.classList.add(activForm.inputValid);
  errorElement.textContent = '';
  errorElement.classList.remove(activForm.errorClass);
};
  
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

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => { 
  return !inputElement.validity.valid;
  });
};
  