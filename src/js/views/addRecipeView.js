import View from './view.js';

class AddRecipeView extends View {
  _message = 'Recipe was successfully uploaded :)';
  _errorMessage =
    'There was an error uploading the recipe. Please try another one!';

  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _initialFormMarkup = this._parentElement.innerHTML;
  _closeTimer;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    if (this._window.classList.contains('hidden')) {
      clearTimeout(this._closeTimer);
      this._parentElement.innerHTML = this._initialFormMarkup;
      this._overlay.classList.remove('hidden');
      this._window.classList.remove('hidden');
      return;
    }

    this.closeWindow();
  }

  closeWindow() {
    clearTimeout(this._closeTimer);
    this._closeTimer = null;
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  closeAfterDelay(delay) {
    clearTimeout(this._closeTimer);
    this._closeTimer = setTimeout(() => this.closeWindow(), delay);
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
