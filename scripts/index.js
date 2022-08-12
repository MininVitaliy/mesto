/** импорт данных из ругих модулей*/
import Card from './Card.js';
import {makeValidFormAtTheStart, makeInvalidButtonAtTheStart} from './FormValidator.js';

/** упорядочевания классов в selectors */
const selectors = {
  popupProfile: '.popup_open_profil',
  popupMesto: '.popup_open_mesto',
  popupFoto:'.popup_image',
  profile: '.profile',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  buttonClosePopup: '.popup__button-close',
  elementsLists: '.elements__lists',
  formProfile: '.popup__forms-profil',
  formMesto: '.popup__forms-mesto',
  popupFormNewName: '.popup__form_new_name',
  popupFormNewJob: '.popup__form_new_job',
  popupFormTitle: '.popup__form_title',
  popupFormImage: '.popup__form_image',
  profileTitle: '.profile__title',
  profileText: '.profile__text',
  popupOpened: '.popup_opened',
  popupGroupTitle: '.popup__group-title',
  popupGroup: '.popup__group'
};

/** поиск классов */
const popupProfile = document.querySelector(selectors.popupProfile);
const popupMesto = document.querySelector(selectors.popupMesto);
const popupFoto = document.querySelector(selectors.popupFoto);
const profile = document.querySelector(selectors.profile);
const buttonOpenFormEditing = profile.querySelector(selectors.profileEditButton);
const buttonOpenFormMesto = profile.querySelector(selectors.profileAddButton);
const buttonClosePopupProfile = popupProfile.querySelector(selectors.buttonClosePopup);
const buttonClosePopupMesto = popupMesto.querySelector(selectors.buttonClosePopup);
const buttonClosePopupFoto = popupFoto.querySelector(selectors.buttonClosePopup);
const fotoConteinerLists = document.querySelector(selectors.elementsLists);
const formProfile = document.querySelector(selectors.formProfile);
const formMesto = document.querySelector(selectors.formMesto);
const nameInput = document.querySelector(selectors.popupFormNewName);
const jobInput = document.querySelector(selectors.popupFormNewJob);
const titleInput = document.querySelector(selectors.popupFormTitle);
const imageInput = document.querySelector(selectors.popupFormImage);
const profileName = profile.querySelector(selectors.profileTitle);
const profileJob = profile.querySelector(selectors.profileText);
const groupTitle = document.querySelector(selectors.popupGroupTitle);
const groupImage = document.querySelector(selectors.popupGroup);

/** открытие формы */
function openPopup (popup) {
  popup.classList.add('popup_opened');
  /** навешивание обработчика события: закрытие - Esc */
  document.addEventListener('keydown', closePpupopEsc);
};

/** закрытие формы */
function closePopup (popup) {
  popup.classList.remove('popup_opened');  
  /** удаление обработчика события: закрытие - Esc */
  document.removeEventListener('keydown', closePpupopEsc);
};

/** сохранения формы профиль */
function handleSaveFormProfile (evt) {
  evt.preventDefault(); 
  /**Вставьте новые значения с помощью textConten*/
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  closePopup(popupProfile);
};

/** сохранения формы новое место */
function handleSaveFormMesto (evt) {
  evt.preventDefault(); 
  /** создаем массив для работы с карточкой, вставляем значения с помощью value в переменые */
  //addCard({name: titleInput.value, link: imageInput.value});
  renderCard(createCard({name: titleInput.value, link: imageInput.value}));
  evt.target.reset();
  closePopup(popupMesto);
  /** вызов функции по изменению кнопки сохранения на невалидную */
  makeInvalidButtonAtTheStart (popupMesto);
};

/** функция открытия попапа с картинокй и наменованием карточки */
function handleOpenCardPopup (name, link) {
  groupTitle.textContent = name;
  groupImage.src = link;
  groupImage.alt = `Фото ${name}`;
  openPopup(popupFoto);
};

/** функция создания карточки */
function createCard(item) {
  const card = new Card(item, '.foto-template', handleOpenCardPopup);
  const cardElement = card.createCard ();
  return cardElement
};

/** функция добавления карточки в начало */
function renderCard (card) {
  fotoConteinerLists.prepend(card);
};

/** функция действия по несовпадению target и event.currentTarget - Overlay*/
function closePpupopOverlay  (evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  };
  closePopup(evt.target);
};

/** функция закрытия попапа при нажатии на Esc*/
function closePpupopEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(selectors.popupOpened));
  };
};

/** реакция на действия пользователя
открытие*/
buttonOpenFormEditing.addEventListener('click', () => {
  /** присвоение значения указаных на странице в value для каждого title и text*/
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  /** вызов функции по изменению кнопки сохранения на валидную и отлатка input */
  makeValidFormAtTheStart (popupProfile);
});
buttonOpenFormMesto.addEventListener('click', () => openPopup(popupMesto));

/** закрытие */
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupMesto.addEventListener('click', () => closePopup(popupMesto));
buttonClosePopupFoto.addEventListener('click', () => closePopup(popupFoto));

/** закрытие при нажатие вне формы (на затемненый экран)*/
popupProfile.addEventListener('click', closePpupopOverlay);
popupMesto.addEventListener('click', closePpupopOverlay);
popupFoto.addEventListener('click', closePpupopOverlay);

/** сохранения */
formProfile.addEventListener('submit', handleSaveFormProfile); 
formMesto.addEventListener('submit', handleSaveFormMesto);

/** экспорт данных из других модулей*/
export {renderCard, createCard, handleOpenCardPopup};