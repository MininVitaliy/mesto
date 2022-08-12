/** данные по первым 6 карточкам */
const initialCards = [
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1604231787570-99263ec7b715?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1504615458222-979e04d69a27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80'
  },
  {
    name: 'Петергоф',
    link: 'https://images.unsplash.com/photo-1577695912741-960e89e5dcee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Казбек',
    link: 'https://images.unsplash.com/photo-1611090179322-b398bbfd0c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1619527441512-97d55b860d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
  }
]; 

/** упорядочевания классов в selectorsCard */
const selectorsCard = {
  element: '.element',
  elementMasckGroup: '.element__masck-group',
  elementTitle: '.element__title',
  elementHeart: '.element__heart',
  elementHeartActive: 'element__heart_active',
  elementGarbage: '.element__garbage',
  popupGroupTitle: '.popup__group-title',
  popupGroup: '.popup__group',
  popupFoto:'.popup_image'
};

/** упорядочевания классов в params */
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

/** экспорт данных в другие модули*/
export {initialCards, selectorsCard, params};