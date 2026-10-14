import Fraction from 'fraction.js';
import View from './view.js';
import placeholder from 'url:../../img/placeholder.jpg';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _errorMessage = 'We could not find that recipe. Please try another one!';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    const ingredientsHTML = this._data.ingredients
      .map(
        ingredient => `
           <li class="recipe__ingredient">
             <i class="recipe__icon fa-solid fa-check" aria-hidden="true"></i>
  
<div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toFraction(true) : ''}</div>  
             <div class="recipe__description">
               <span class="recipe__unit">${ingredient.unit}</span>
               ${ingredient.description}
             </div>
           </li>
         `,
      )
      .join('');
    return `
         <figure class="recipe__fig">
           <img src="${this._data.image}" 
           onerror="this.onerror=null; this.src='${placeholder}';" alt="${this._data.title}" class="recipe__img" />
           <h1 class="recipe__title">
             <span>${this._data.title}</span>
           </h1>
         </figure>
 
         <div class="recipe__details">
           <div class="recipe__info">
             <i class="recipe__info-icon fa-regular fa-clock" aria-hidden="true"></i>
             <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
             <span class="recipe__info-text">minutes</span>
           </div>
           <div class="recipe__info">
             <i class="recipe__info-icon fa-solid fa-users" aria-hidden="true"></i>
             <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
             <span class="recipe__info-text">servings</span>
 
             <div class="recipe__info-buttons">
               <button class="btn--tiny btn--increase-servings btn--update-servings" data-update-to="${this._data.servings - 1}">
                 <i class="fa-solid fa-circle-minus" aria-hidden="true"></i>
               </button>
               <button class="btn--tiny btn--increase-servings btn--update-servings" data-update-to="${this._data.servings + 1}">
                 <i class="fa-solid fa-circle-plus" aria-hidden="true"></i>
               </button>
             </div>
           </div>
 
           <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
              <i class="fa-solid fa-user" aria-hidden="true"></i>
           </div>
           <button class="btn--round" data-bookmark>
             <i class="${this._data.bookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark" aria-hidden="true"></i>
           </button>
         </div>
 
         <div class="recipe__ingredients">
           <h2 class="heading--2">Recipe ingredients</h2>
           <ul class="recipe__ingredient-list">
             ${ingredientsHTML}
           </ul>
         </div>
     
 
         <div class="recipe__directions">
           <h2 class="heading--2">How to cook it</h2>
           <p class="recipe__directions-text">
             This recipe was carefully designed and tested by
             <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
             directions at their website.
           </p>
           <a
             class="btn--small recipe__btn"
             href="${this._data.sourceUrl}"
             target="_blank"
           >
             <span>Directions</span>
             <i class="search__icon fa-solid fa-arrow-right" aria-hidden="true"></i>
           </a>
         </div>
         `;
  }
}

export default new RecipeView();
