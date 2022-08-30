/** импорт данных из ругих модулей*/
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  params, 
  selectorsCard, 
  selectors,
  popupProfile,
  popupMesto,
  profileAddButton,
  profileEditButton,
  fotoConteinerLists,
  nameInput,
  jobInput
} from '../components/utils.js';
import initialCards from '../utils/places.js';
import Section from '../components/Section.js';
import PopupWithImage  from '../components/PicturePopup.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

/** создание класса Card для карточек */
function generateClassCard (item) {
  const card = new Card(item, selectors.fotoTemplate, 
    (name, link) => {
    popupWithImage.open(name, link);
  }, selectorsCard);
 return card.createCard ();
};

/** создание класса PopupWithImage для модального окна картинки */
const popupWithImage = new PopupWithImage (selectors.popupFotoNoPoint, selectorsCard);
popupWithImage.setEventListeners ();

/** добавление карточки Section для инициализациии 6 карточек из массива, 
добавления открытия и закрытия попапа Image, навешивания обработчиков событий*/
const section = new Section ({
  items: initialCards, 
  renderer: (item) => {
    section.addItem (generateClassCard (item));
  }
}, fotoConteinerLists);
section.renderItems();

/** добавление карточки PopupWithForm для работы Mesto попапа,
добавления открытия и закрытия попапа Image, навешивания обработчиков событий*/
const popupFormMesto = new PopupWithForm ({
  popupSelector: selectorsCard.popupMesto,
  sabmitForm: (formData) => {
    const {'popup__span_name-location': name, 'popup__span_foto-location': link} = formData;
    section.addItem (generateClassCard ({name, link}));
    validatorCardMesto.makeInvalidButtonAtTheStart ();
  },
  selector: selectorsCard
});

/** добавление карточки PopupWithForm для работы Profile попапа со всем функционалом*/
const popupFormProfile = new PopupWithForm ({
  popupSelector: selectorsCard.popupProfile,
  sabmitForm: (formData) => {
    const {'popup__span_name-author': name, 'popup__span_name-job': link} = formData;
    userInfo.setUserInfo ({name, link});
  },
  selector: selectorsCard
});

/** добавление карточки UserInfo*/
const userInfo = new UserInfo({className: selectors.profileTitle, classJob: selectors.profileText});

/** реакция на действия пользователя открытие попапа - Mesto*/
popupFormMesto.setEventListeners ();
profileAddButton.addEventListener('click', () =>{ 
  popupFormMesto.open ();
});

/** реакция на действия пользователя открытие попапа - Profile*/
popupFormProfile.setEventListeners ();
profileEditButton.addEventListener('click', () =>{ 
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  validatorCardProfile.makeValidFormAtTheStart();
  popupFormProfile.open ();
});

/** добавление карточки класса FormValidator для валидации формы Profile */
const  validatorCardProfile = new FormValidator (params, popupProfile);
validatorCardProfile.enableValidation ();

/** добавление карточки класса FormValidator для валидации формы Mesto */
const  validatorCardMesto = new FormValidator (params, popupMesto);
validatorCardMesto.enableValidation ();