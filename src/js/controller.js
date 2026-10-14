//import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime/runtime'; // polyfilling async/awaitimport * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/viewBookmarks.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

//comming from parcel
if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    const recipe = model.state.recipe;

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError(err.message);
  }
};

const controlResults = function (page = 1) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlSearchResults = async function (query = searchView.getQuery()) {
  try {
    resultsView.renderSpinner();
    //const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    controlResults();
  } catch (err) {
    resultsView.renderError(err.message);
  }
};

const controlPagination = function (goToPage) {
  controlResults(goToPage);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarksRender = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    //Close form window
    addRecipeView.closeAfterDelay(MODAL_CLOSE_SEC * 1000);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = async function () {
  bookmarksView.addHandlerBookmarksRender(controlBookmarksRender);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  await controlSearchResults('pizza');
};

init();
