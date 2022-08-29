export default class Section {
  constructor ({items, renderer}, classElement) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = classElement;
  };

  /** метод создания первых 6 карточек из масива*/
  renderItems() {
    this._initialArray.forEach(item => {
     this._renderer(item);
    });
  };

  /** метод добавления карточек на страницу*/
  addItem (element) {
    this._container.prepend(element);
  };
};