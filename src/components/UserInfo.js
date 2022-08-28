export default class UserInfo {
  constructor ({selectorName, selectorJob}) {
    this._selectorName =  document.querySelector(selectorName);
    this._selectorJob = document.querySelector(selectorJob);
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
};