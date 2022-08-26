export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = containerSelector;
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