/** импорт данных из ругих модулей*/
import Card from './Card.js';
import {makeValidFormAtTheStart, makeInvalidButtonAtTheStart, FormValidator} from './FormValidator.js';
import {initialCards, params, selectorsCard, selectors} from './utils.js';
import Section from './Section.js';
import PopupWithImage  from './PicturePopup.js';
import PopupWithForm  from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

/** поиск классов */
const popupProfile = document.querySelector(selectors.popupProfile);
const popupMesto = document.querySelector(selectors.popupMesto);
const profileAddButton = document.querySelector(selectors.profileAddButton);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const fotoConteinerLists = document.querySelector(selectors.elementsLists);
const nameInput = document.querySelector(selectors.popupFormNewName);
const jobInput = document.querySelector(selectors.popupFormNewJob);
const formList = Array.from(document.querySelectorAll(params.form));

/** добавление карточки Section для инициализациии 6 карточек из массива, 
добавления открытия и закрытия попапа Image, навешивания обработчиков событий*/
const section = new Section ({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, selectors.fotoTemplate, 
        (name, link) => {
        const popupWithImage = new PopupWithImage (name, link, selectors.popupFotoNoPoint)
        popupWithImage.open();
      });
    const cardElement = card.createCard ();
    section.addItem (cardElement);
  }
}, fotoConteinerLists);
section.renderItems();

/** добавление карточки PopupWithForm для работы Mesto попапа,
добавления открытия и закрытия попапа Image, навешивания обработчиков событий*/
const popupFormMesto = new PopupWithForm ({
  popupSelector: selectorsCard.popupMesto,
  sabmitForm: (formData) => {
    const card = new Card(formData, selectors.fotoTemplate, 
      (name, link) => {
      const popupWithImage = new PopupWithImage (name, link, selectors.popupFotoNoPoint)
      popupWithImage.open();
    });
    const cardElement = card.createCard ();
    section.addItem (cardElement);
    makeInvalidButtonAtTheStart (popupMesto);
  }
});

/** добавление карточки PopupWithForm для работы Profile попапа со всем функционалом*/
const popupFormProfile = new PopupWithForm ({
  popupSelector: selectorsCard.popupProfile,
  sabmitForm: (formData) => {
    userInfo.setUserInfo (formData);
  }
});

/** добавление карточки UserInfo*/
const userInfo = new UserInfo({selectorName: selectors.profileTitle ,selectorJob: selectors.profileText});

/** реакция на действия пользователя открытие попапа - Mesto*/
popupFormMesto.setEventListeners ();
profileAddButton.addEventListener('click', () =>{ 
  popupFormMesto.open ();
});

/** реакция на действия пользователя открытие попапа - Profile*/
popupFormProfile.setEventListeners ();
profileEditButton.addEventListener('click', () =>{ 
  popupFormProfile.open ();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  makeValidFormAtTheStart(popupProfile);
});

/** добавление 2-х карточек из класса для валидации 2 форм */
formList.forEach((formElement) => {
  const card = new FormValidator (params, formElement);
  card.enableValidation ();
});