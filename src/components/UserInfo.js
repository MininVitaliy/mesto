export default class UserInfo {
  constructor ({className, classJob}, nameAvatar, jobAvatar, profileAddButtonAvatar) {
    this._selectorName =  document.querySelector(className);
    this._selectorJob = document.querySelector(classJob);
    this._nameAvatar = nameAvatar;
    this._jobAvatar = jobAvatar;
    this._profileAddButtonAvatar = profileAddButtonAvatar;
  };
  /** метод предачи данных со страницы в форму */
  getUserInfo () {
    this._nameProfile = this._selectorName.textContent;
    this._jobProfile = this._selectorJob.textContent;
    return {name: this._nameProfile, job: this._jobProfile};
  };

  /** метод передачи данных из формы на страницу - новые от пользователя */
  setUserInfo (obj) {
    this._selectorName.textContent = obj.name;
    this._selectorJob.textContent = obj.link;
  };

  /** метод передачи данных на страницу добавление информации об User*/
  initialUser (item) {
    this._nameAvatar.textContent = item.name;
    this._jobAvatar.textContent = item.about;
    this._profileAddButtonAvatar.style.backgroundImage = `url(${item.avatar})`;
  };
  
  /** метод передачи данных на страницу добавление информации об Avatar*/
  initialAvatarNew (item) {
    this._profileAddButtonAvatar.style.backgroundImage = `url(${item.avatar})`;
  };
};