/** упорядочевания классов в selectors */
const selectors = {
  popup: '.popup',
  profile: '.profile',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  popupButtonClose: '.popup__button-close',
  elementHeart: '.element__heart',
  elementsLists: '.elements__lists',
  popupForms: '.popup__forms',
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
const popups = document.querySelectorAll(selectors.popup);
const profile = document.querySelector(selectors.profile);
const buttonOpenFormEditing = profile.querySelector(selectors.profileEditButton);
const buttonOpenFormMesto = profile.querySelector(selectors.profileAddButton);
const buttonsForClosingForms = document.querySelectorAll(selectors.popupButtonClose);
const fotoConteinerLists = document.querySelector(selectors.elementsLists);
const formElements = document.querySelectorAll(selectors.popupForms);
const nameInput = document.querySelector(selectors.popupFormNewName);
const jobInput = document.querySelector(selectors.popupFormNewJob);
const titleInput = document.querySelector(selectors.popupFormTitle);
const imageInput = document.querySelector(selectors.popupFormImage);
const profileName = profile.querySelector(selectors.profileTitle);
const profileJob = profile.querySelector(selectors.profileText);
const groupTitle = document.querySelector(selectors.popupGroupTitle);
const groupImage = document.querySelector(selectors.popupGroup)

/** открытие формы */
function openedFormToPopup (index) {
  popups[index].classList.add('popup_opened');
  /** присвоение значения указаных на странице в value для каждого title и text*/
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

/** закрытие формы */
function closedFormToPopup (index) {
  popups[index].classList.remove('popup_opened');
};

/** сохранения формы профиль */
function saveformSubmitProfil (evt) {
  evt.preventDefault(); 
  /**Вставьте новые значения с помощью textConten*/
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  closedFormToPopup(0);
};

/** сохранения формы новое место */
function saveformSubmitMesto (evt) {
  evt.preventDefault(); 
  /** создаем массив для работы с карточкой, вставляем значения с помощью value в переменые */
  const newCard = [{name: titleInput.value, link: imageInput.value}];
  newCard.forEach(createCard);
  closedFormToPopup(1);
};

/** функция для создания 6 первых карточек из масива - cards.js */
function createInitialCards() {
  initialCards.forEach(createCard);
};
createInitialCards();

/** функция добавление картинки */
function createCard(card) {
  const fotoTemplate = document.querySelector(selectors.fotoTemplate).content;
  const fotoElement = fotoTemplate.querySelector(selectors.element).cloneNode(true);
  fotoElement.querySelector(selectors.elementTitle).textContent = card.name;
  fotoElement.querySelector(selectors.elementMasckGroup).src = card.link;
  fotoElement.querySelector(selectors.elementMasckGroup).alt = 'Фото ' + card.name;
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
    groupImage.alt = 'Фото ' + card.name;
    openedFormToPopup(2);
  });
  /** вставка картинки в начало */
  fotoConteinerLists.prepend(fotoElement);
};

/** функция действия по несовпадению target и event.currentTarget*/
/**const closePpupopOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return
  };
  closedFormToPopup (0);
  closedFormToPopup (1);
  closedFormToPopup (2);
};*/

/** реакция на действия пользователя
открытие*/
buttonOpenFormEditing.addEventListener('click', () => openedFormToPopup(0));
buttonOpenFormMesto.addEventListener('click', () => openedFormToPopup(1));

/** закрытие */
buttonsForClosingForms[0].addEventListener('click', () => closedFormToPopup(0));
buttonsForClosingForms[1].addEventListener('click', () => closedFormToPopup(1));
buttonsForClosingForms[2].addEventListener('click', () => closedFormToPopup(2));

/** сохранения */
formElements[0].addEventListener('submit', saveformSubmitProfil); 
formElements[1].addEventListener('submit', saveformSubmitMesto);

/** закрытие при нажатие вне формы (на затемненый экран)
popups[0].addEventListener('click', closePpupopOverlay);
popups[1].addEventListener('click', closePpupopOverlay);
popups[2].addEventListener('click', closePpupopOverlay);*/