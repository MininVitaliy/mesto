/** импорт данных из ругих модулей*/
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  params, 
  selectorsCard, 
  selectors,
  popupProfile,
  popupMesto,
  popupAvatar,
  profileAddButton,
  profileEditButton,
  profileAddButtonAvatar,
  nameAvatar,
  jobAvatar,
  fotoConteinerLists,
  nameInput,
  jobInput,
  popupDelete
} from '../components/utils.js';
import Section from '../components/Section.js';
import PopupWithImage  from '../components/PicturePopup.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import Api from '../components/Api.js';

/** создание класса Card для карточек */
function generateClassCard (item, api) {
  const card = new Card({
    card: item,
    templateSelector: selectors.fotoTemplate, 
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    item: selectorsCard,
    api: api,
    idUser: myServerNumber,
    popupWithConfirmation: popupWithConfirmation,
    deleteLike: (itemId, fotoElementLikes, fotoElementHeart, elementHeartActive) => {
      api.deleteLike (itemId) 
        .then((res)=> {
          fotoElementLikes.textContent = res.likes.length
        })
        .then(() => fotoElementHeart.classList.remove(elementHeartActive))
        .catch(err => console.log(err)
      )
    },
    addLike: (itemId, fotoElementLikes, fotoElementHeart , elementHeartActive) => {
      api.addLike (itemId) 
        .then((res)=> {
          fotoElementLikes.textContent = res.likes.length
        })
        .then(() => fotoElementHeart.classList.add(elementHeartActive))
        .catch(err => console.log(err)
      )
    }
  });
  return card.createCard ();
};

/*создание любых карточек и добавления*/
const section = new Section ({
  renderer: (item) => {
    if (item.owner._id !== myServerNumber) {
      const cardNoElementGarbage = generateClassCard (item, api);
      cardNoElementGarbage.querySelector(selectorsCard.elementGarbage).remove();
      section.addItem (cardNoElementGarbage);
    } else {
      section.addItem (generateClassCard (item, api));
    };
  }
}, fotoConteinerLists);


/** добавление карточки PopupWithForm для работы Mesto попапа,
добавления открытия и закрытия попапа Image, навешивания обработчиков событий*/
const popupFormMesto = new PopupWithForm ({
  popupSelector: selectorsCard.popupMesto,
  sabmitForm: (formData) => {
    renderLoading(true, popupMesto);
    const {'popup__span_name-location': name, 'popup__span_foto-location': link} = formData; 
    api.addNewCardOnTheServer (name, link)
      .then((result) => {
      section.addItem(generateClassCard (result, api));    
      })
      .then (() => popupFormMesto.close ())
      .catch(err => console.log(err))
      .finally(() => { 
        renderLoading(false, popupMesto, 'Сохранение');
    }); 
  },
  selector: selectorsCard
});

/** добавление карточки PopupWithConfirmation для удаления Mesto*/
const popupWithConfirmation = new PopupWithConfirmation ({
  popupSelector: selectorsCard.popupDelete,
  sabmitForm: (id, deleteCard) => {
    renderLoading(true, popupDelete);
    api.deleteCardTheServer (id)
      .then(()=> {
        deleteCard.remove();
        deleteCard = null;
      })
      .then(() => popupWithConfirmation.close ())
      .catch(err => console.log(err))
      .finally(() => { 
        renderLoading(false, popupDelete, 'Да'); 
    }); 
  },
  selector: selectorsCard,
  api: api
});
popupWithConfirmation.setEventListeners ();

/** добавление карточки PopupWithForm для работы Profile попапа со всем функционалом*/
const popupFormProfile = new PopupWithForm ({
  popupSelector: selectorsCard.popupProfile,
  sabmitForm: (formData) => {
    renderLoading(true, popupProfile);
    const {'popup__span_name-author': name, 'popup__span_name-job': link} = formData;
    api.changeUserProfile (name, link)
      .then(json => userInfo.initialUser (json))
      .then (()=> popupFormProfile.close())
      .catch(err => console.log(err))
      .finally(() => { 
        renderLoading(false, popupProfile, 'Сохранение');
    }); 
  },
  selector: selectorsCard
});

/** добавление карточки popupFormAvatar для работы Profile с Avatarм*/
const popupFormAvatar = new PopupWithForm ({
  popupSelector: selectorsCard.popupAvatar,
  sabmitForm: (formData) => {
    renderLoading(true, popupAvatar);
    const {'popup__span_avatar': link} = formData;
    api.changeUserAvatar (link)
      .then(json => userInfo.initialAvatarNew (json))
      .then(() => popupFormAvatar.close())
      .catch(err => console.log(err))
      .finally(() => { 
        renderLoading(false, popupAvatar, 'Сохранение');
    }); 
  },
  selector: selectorsCard
});

/** реакция на действия пользователя открытие попапа - Mesto*/
popupFormMesto.setEventListeners ();
profileAddButton.addEventListener('click', () =>{ 
  popupFormMesto.open ();
  validatorCardMesto.resetValidation();
});

/** реакция на действия пользователя открытие попапа - Profile*/
popupFormProfile.setEventListeners ();
profileEditButton.addEventListener('click', () =>{ 
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  validatorCardProfile.resetValidation(); 
  popupFormProfile.open ();
});

/** реакция на действия пользователя открытие попапа - Avatar*/
popupFormAvatar.setEventListeners ();
profileAddButtonAvatar.addEventListener('click', () =>{ 
  popupFormAvatar.open ();
  validatorAvatar.resetValidation();
});

/** добавление карточки UserInfo*/
const userInfo = new UserInfo({className: selectors.profileTitle, classJob: selectors.profileText}, nameAvatar, jobAvatar, profileAddButtonAvatar);

/** создание класса PopupWithImage для модального окна картинки */
const popupWithImage = new PopupWithImage (selectors.popupFotoNoPoint, selectorsCard);
popupWithImage.setEventListeners ();

/** добавление карточки класса FormValidator для валидации формы Profile */
const validatorCardProfile = new FormValidator (params, popupProfile);
validatorCardProfile.enableValidation ();

/** добавление карточки класса FormValidator для валидации формы Mesto */
const validatorCardMesto = new FormValidator (params, popupMesto);
validatorCardMesto.enableValidation ();

/** добавление карточки класса FormValidator для валидации формы Avatar */
const validatorAvatar = new FormValidator (params, popupAvatar);
validatorAvatar.enableValidation ();

/** добавление карточки класса FormValidator для валидации формы Garbage */
const validatorConfirmationDeletion = new FormValidator (params, popupDelete);
validatorConfirmationDeletion.enableValidation ();

/** добавление карточки класса Api для работы с сервером */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '52a3545b-5386-49f4-b8ab-457025f8bc26',
    'Content-Type': 'application/json'
  }
}); 

/** добавление карточки Section для инициализациии карточек из массива, 
добавления открытия и закрытия попапа Image, навешивания обработчиков событий и
добавление информации об User*/
let myServerNumber;
Promise.all([api.getInitialCards(), api.getInitialUserMe ()])
  .then(([infoCard, infoUserMe]) => {
    userInfo.initialUser (infoUserMe);
    myServerNumber = infoUserMe._id;
    return infoCard;
  })
  .then ((infoCard) => {
    section.renderItems(infoCard);
  })
  .catch(err => console.log(err)
);

/* функция измения кнопки sabmit на ативную при нажатии и обратно */
function renderLoading (isLoading, selectorPopup, infoText) {
  const loadButton = selectorPopup.querySelector('.popup__button-save');
  if (isLoading) {
    loadButton.textContent = 'Сохранение...';
  } else {
    loadButton.textContent = `${infoText}`;
  }
};