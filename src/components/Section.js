export default class Section {
  constructor ({renderer}, classElement) {
    this._renderer = renderer;
    this._container = classElement;
  };

  /** метод создания первых 6 карточек из масива*/
  renderItems(items) {
    items.reverse().forEach(item => {
     this._renderer(item);
    })
  };

  /** метод добавления карточек на страницу*/
  addItem (element) {
    this._container.prepend(element);
  };
};