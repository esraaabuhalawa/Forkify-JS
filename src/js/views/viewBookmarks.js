import View from './view.js';
import previewView from './previewView.js';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerBookmarksRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
