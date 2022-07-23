/** упорядочевания классов в selectors */
const selectors = {
  popupProfile: '.popup_open_profil',
  popupMesto: '.popup_open_mesto',
  popupFoto:'.popup_image',
  profile: '.profile',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  buttonClosePopup: '.popup__button-close',
  elementHeart: '.element__heart',
  elementsLists: '.elements__lists',
  formProfile: '.popup__forms-profil',
  formMesto: '.popup__forms-mesto',
  popupFormNewName: '.popup__form_new_name',
  popupFormNewJob: '.popup__form_new_job',
  popupFormTitle: '.popup__form_title',
  popupFormImage: '.popup__form_image',
  profileTitle: '.profile__title',
  profileText: '.profile__text',
  popupGroupTitle: '.popup__group-title',
  popupGroup: '.popup__group',
  fotoTemplate: '.foto-template',
  element: '.element',
  elementTitle: '.element__title',
  elementMasckGroup: '.element__masck-group',
  elementGarbage: '.element__garbage',
  popupOpened: '.popup_opened'
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
const fotoTemplate = document.querySelector(selectors.fotoTemplate).content.querySelector(selectors.element);
const nameInput = document.querySelector(selectors.popupFormNewName);
const jobInput = document.querySelector(selectors.popupFormNewJob);
const titleInput = document.querySelector(selectors.popupFormTitle);
const imageInput = document.querySelector(selectors.popupFormImage);
const profileName = profile.querySelector(selectors.profileTitle);
const profileJob = profile.querySelector(selectors.profileText);
const groupTitle = document.querySelector(selectors.popupGroupTitle);
const groupImage = document.querySelector(selectors.popupGroup)

/** открытие формы */
function openPopup (popup) {
  popup.classList.add('popup_opened');
  activForm(popup);
};

/** закрытие формы */
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.querySelectorAll('.popup__form').forEach((strippingValue) => {
    strippingValue.value = '';
  });
  
};

/** сохранения формы профиль */
function saveFormProfile (evt) {
  evt.preventDefault(); 
  /**Вставьте новые значения с помощью textConten*/
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  closePopup(popupProfile);
};

/** сохранения формы новое место */
function saveFormMesto (evt) {
  evt.preventDefault(); 
  /** создаем массив для работы с карточкой, вставляем значения с помощью value в переменые */
  addCard({name: titleInput.value, link: imageInput.value});
  closePopup(popupMesto);
  evt.target.reset();
};

/** функция для создания 6 первых карточек из масива - cards.js */
function addInitialCards() {
  initialCards.forEach(addCard);
};
addInitialCards();

/** функция добавления картинки */
function addCard(card) {
  const variable = createCard (card);
  /** вставка картинки в начало с помощью функции renderCard */
  renderCard(variable);
};

/** функция создания карточки */
function createCard (card) {
  const fotoElement = fotoTemplate.cloneNode(true);
  fotoElement.querySelector(selectors.elementTitle).textContent = card.name;
  fotoElement.querySelector(selectors.elementMasckGroup).src = card.link;
  fotoElement.querySelector(selectors.elementMasckGroup).alt = `Фото ${card.name}`;
  return fotoElement;
};

/** функция добавления карточки в начало */
function renderCard (card) {
  fotoConteinerLists.prepend(card);
};

/** функция действия по несовпадению target и event.currentTarget - Overlay*/
function closePpupopOverlay  (evt) {
  if (evt.target !== evt.currentTarget) {
    return
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
});
buttonOpenFormMesto.addEventListener('click', () => openPopup(popupMesto));

/** закрытие */
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePopupMesto.addEventListener('click', () => closePopup(popupMesto));
buttonClosePopupFoto.addEventListener('click', () => closePopup(popupFoto));

/** закрытие - Esc */
document.addEventListener('keydown', closePpupopEsc);

/** закрытие при нажатие вне формы (на затемненый экран)*/
popupProfile.addEventListener('click', closePpupopOverlay);
popupMesto.addEventListener('click', closePpupopOverlay);
popupFoto.addEventListener('click', closePpupopOverlay);

/** сохранения */
formProfile.addEventListener('submit', saveFormProfile); 
formMesto.addEventListener('submit', saveFormMesto);

/** изменения сердечка лайк на закрашенный и обратно - делегирование события  */
fotoConteinerLists.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__heart')) {
    evt.target.classList.toggle('element__heart_active');
  };
});

/** удаление картинки места - делегирование события  */
fotoConteinerLists.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__garbage')) {
    evt.target.parentElement.remove();
  };
});

/** открытие попапа с картинкой - делегирование события */
fotoConteinerLists.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__masck-group')) {
    const classPopup = evt.target.parentElement;
    groupTitle.textContent = classPopup.querySelector(selectors.elementTitle).textContent;
    groupImage.src = classPopup.querySelector(selectors.elementMasckGroup).src;
    groupImage.alt = `Фото ${classPopup.querySelector(selectors.elementTitle).textContent}`;
    openPopup(popupFoto);
  }
});