/** упорядочевания классов в selectors */
const selectors = {
  popupProfile: '.popup_open_profil',
  popupMesto: '.popup_open_mesto',
  popupFoto:'.popup_image',
  profile: '.profile',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  buttonClosePopupProfile: '.popup__profil-close',
  buttonClosePopupMesto: '.popup__mesto-close',
  buttonClosePopupFoto: '.popup__foto-close',
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
  elementGarbage: '.element__garbage'
};

/** поиск классов */
const popupProfile = document.querySelector(selectors.popupProfile);
const popupMesto = document.querySelector(selectors.popupMesto);
const popupFoto = document.querySelector(selectors.popupFoto);
const profile = document.querySelector(selectors.profile);
const buttonOpenFormEditing = profile.querySelector(selectors.profileEditButton);
const buttonOpenFormMesto = profile.querySelector(selectors.profileAddButton);
const buttonClosePopupProfile = document.querySelector(selectors.buttonClosePopupProfile);
const buttonClosePopupMesto = document.querySelector(selectors.buttonClosePopupMesto);
const buttonClosePopupFoto = document.querySelector(selectors.buttonClosePopupFoto);
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
};

/** закрытие формы */
function closePopup (popup) {
  popup.classList.remove('popup_opened');
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
  /** изменения сердечка лайк на закрашенный и обратно */
  fotoElement.querySelector(selectors.elementHeart).addEventListener('click', (event) => {
    event.target.classList.toggle('element__heart_active');
  });
  /** удаление картинки места */
  fotoElement.querySelector(selectors.elementGarbage).addEventListener('click', () => {
    fotoElement.remove();
  });
  /** открытие попапа с картинкой */
  fotoElement.querySelector(selectors.elementMasckGroup).addEventListener('click', () => {
    groupTitle.textContent = card.name;
    groupImage.src = card.link;
    groupImage.alt = `Фото ${card.name}`;
    openPopup(popupFoto);
  });
  return fotoElement;
};

/** функция добавления карточки в начало */
function renderCard (card) {
  fotoConteinerLists.prepend(card);
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

/** сохранения */
formProfile.addEventListener('submit', saveFormProfile); 
formMesto.addEventListener('submit', saveFormMesto);