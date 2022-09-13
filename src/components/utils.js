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
  popupFoto:'.popup_image',
  popupForm: '.popup__form',
  popupForms: '.popup__forms',
  popupOpened:'popup_opened',
  popupButtonClose:'.popup__button-close',
  popupMesto: 'popup_open_mesto',
  popupProfile: 'popup_open_profil',
  popupAvatar: 'popup_open_avatar',
  popupDelete: 'popup_delete',
  button: '.popup__button-save',
  elementLikes: '.element__likes'
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

/** упорядочевания классов в selectors */
const selectors = {
  popupProfile: '.popup_open_profil',
  popupMesto: '.popup_open_mesto',
  popupAvatar: '.popup_open_avatar',
  elementsLists: '.elements__lists',
  popupFormNewName: '.popup__form_new_name',
  popupFormNewJob: '.popup__form_new_job',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  profileAvatarButton: '.profile__avatar',
  popupFotoNoPoint:'popup_image',
  fotoTemplate: '.foto-template',
  profileTitle: '.profile__title',
  profileText: '.profile__text',
  popupDelete: '.popup_delete'
};

/** поиск классов */
export const popupProfile = document.querySelector(selectors.popupProfile);
export const popupMesto = document.querySelector(selectors.popupMesto);
export const popupAvatar = document.querySelector(selectors.popupAvatar);
export const profileAddButton = document.querySelector(selectors.profileAddButton);
export const profileEditButton = document.querySelector(selectors.profileEditButton);
export const profileAddButtonAvatar = document.querySelector(selectors.profileAvatarButton);
export const fotoConteinerLists = document.querySelector(selectors.elementsLists);
export const nameInput = document.querySelector(selectors.popupFormNewName);
export const jobInput = document.querySelector(selectors.popupFormNewJob);
export const nameAvatar = document.querySelector(selectors.profileTitle);
export const jobAvatar = document.querySelector(selectors.profileText);
export const popupDelete = document.querySelector(selectors.popupDelete);

/** экспорт данных в другие модули*/
export {selectorsCard, params, selectors};