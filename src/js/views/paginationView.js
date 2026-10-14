import View from './view.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateButton(direction, page) {
    const isNext = direction === 'next';

    return `
      <button 
        class="btn--inline pagination__btn--${direction}" 
        data-goto="${page}"
      >
        ${
          !isNext
            ? `
              <i class="search__icon fa-solid fa-arrow-left" aria-hidden="true"></i>
            `
            : ''
        }

        <span>Page ${page}</span>

        ${
          isNext
            ? `
              <i class="search__icon fa-solid fa-arrow-right" aria-hidden="true"></i>
            `
            : ''
        }
      </button>
    `;
  }
  _generateMarkup() {
    const { page: curPage, results, resultsPerPage } = this._data;
    const numPages = Math.ceil(results.length / resultsPerPage);

    if (curPage === 1 && numPages > 1) {
      return this._generateButton('next', curPage + 1);
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateButton('prev', curPage - 1);
    }

    if (curPage > 1 && curPage < numPages) {
      return `
        ${this._generateButton('prev', curPage - 1)}
        ${this._generateButton('next', curPage + 1)}
      `;
    }

    return '';
  }
}

export default new PaginationView();
