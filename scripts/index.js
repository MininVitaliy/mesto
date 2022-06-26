/*поиск классов*/
const popup = document.querySelector('.popup');
console.log('нашел .popup');
const profile = document.querySelector('.profile')
const buttonOpenFormEditing = profile.querySelector('.profile__edit-button');
console.log('нашел .profile__edit-button');
const buttonCloseFormEditing = popup.querySelector('.popup__button-close');
console.log('нашел .popup__button-close');

let formElement = document.querySelector('.popup');
console.log(formElement);

const nameInput = popup.querySelector('.popup__form_name');
console.log('нашел .popup__form_name');
const jobInput = popup.querySelector('.popup__form_job');
console.log('нашел .popup__form_job');


/*ввод функций*/
function openedFormToPopup () {
    popup.classList.add('popup_opened');
    console.log('добавлен класс');
};

function closedFormToPopup () {
    popup.classList.remove('popup_opened');
    console.log('убран класс');
};


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


/*реакция на действия пользователя*/
buttonOpenFormEditing.addEventListener('click', openedFormToPopup);
buttonCloseFormEditing.addEventListener('click', closedFormToPopup);
formElement.addEventListener('submit', formSubmitHandler); 

