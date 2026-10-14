import View from './view.js';
import previewView from './previewView.js';

class ResultsView extends View {
 _parentElement = document.querySelector('.results');
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _errorMessage = 'no results found. Please try another search!';

    _generateMarkup() {
      return this._data
        .map(recipe => previewView.render(recipe, false))
        .join('');
    }
}

export default new ResultsView();