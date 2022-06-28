/**поиск классов - открытие и закрытие формы*/
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile')
const buttonOpenFormEditing = profile.querySelector('.profile__edit-button');
const buttonCloseFormEditing = popup.querySelector('.popup__button-close');

/**поиск классов для сохранения изменений в форму*/
let formElement = document.querySelector('.popup__forms');
const nameInput = popup.querySelector('.popup__form_new_name');
const jobInput = popup.querySelector('.popup__form_new_job');

let saveName = profile.querySelector('.profile__title');
let saveJob = profile.querySelector('.profile__text');


/**ввод функций
открытие формы*/
function openedFormToPopup () {
    popup.classList.add('popup_opened');
    /** присвоение значения указаных на странице в value для каждого title и text*/
    nameInput.value = saveName.textContent;
    jobInput.value = saveJob.textContent;
};

/**закрытие формы*/
function closedFormToPopup () {
    popup.classList.remove('popup_opened');
};

/**сохранения формы*/
function saveformSubmitHandler (evt) {
    evt.preventDefault(); 
    /** Вставьте новые значения с помощью textConten*/
    saveName.textContent = nameInput.value;
    saveJob.textContent =  jobInput.value;
    closedFormToPopup ()
};

/** функция закрытия при совпадения target и currentTarget
const closePpupopOverlay = function (event) {
    if (event.target !== event.currentTarget) {
     return
    }
    closedFormToPopup () 
};*/

/**реакция на действия пользователя
открытие*/
buttonOpenFormEditing.addEventListener('click', openedFormToPopup);
/** закрытие */
buttonCloseFormEditing.addEventListener('click', closedFormToPopup);
/** сохранения */
formElement.addEventListener('submit', saveformSubmitHandler); 

/** закрытие при нажатие вне формы (на затемненый экран)
popup.addEventListener('click', closePpupopOverlay);*/
