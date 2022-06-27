//поиск классов - открытие и закрытие формы
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile')
const buttonOpenFormEditing = profile.querySelector('.profile__edit-button');
const buttonCloseFormEditing = popup.querySelector('.popup__button-close');

//поиск классов для сохранения изменений в форму
let formElement = document.querySelector('.popup');
const nameInput = popup.querySelector('.popup__form_name');
const jobInput = popup.querySelector('.popup__form_job');


//ввод функций
//открытие формы
function openedFormToPopup () {
    popup.classList.add('popup_opened');
    console.log('добавлен класс');
};
//закрытие формы
function closedFormToPopup () {
    popup.classList.remove('popup_opened');
    console.log('убран класс');
};

//сохранения формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameInput.value;
    console.log(nameInput.value);
    jobInput.value;
    console.log(jobInput.value);
    // Выберите элементы, куда должны быть вставлены значения полей
    let name = profile.querySelector('.profile__title');
    let job = profile.querySelector('.profile__text');

    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent =  jobInput.value;

    closedFormToPopup ()
};
//функция закрытия при совпадения target и currentTarget
const closePpupopOverlay = function (event) {
    if (event.target !== event.currentTarget) {
     return
    }
    closedFormToPopup () 
 }

 
//реакция на действия пользователя
//открытие
buttonOpenFormEditing.addEventListener('click', openedFormToPopup);
//закрытие
buttonCloseFormEditing.addEventListener('click', closedFormToPopup);
//сохранения
formElement.addEventListener('submit', formSubmitHandler); 
//закрытие при нажатие вне формы (на затемненый экран)
popup.addEventListener('click', closePpupopOverlay);
