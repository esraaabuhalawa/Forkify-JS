# Forkify

Forkify is a recipe search application built with JavaScript and Sass. Search recipes by name or ingredient, view recipe details, adjust servings, save bookmarks, and upload your own recipes.

Recipes are provided by the [Forkify API](https://forkify-api.jonas.io/). Bookmarks are saved in the browser's local storage.

## Getting Started

You will need Node.js and npm installed.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm start
   ```

   Parcel will print the local URL in the terminal.

3. Create a production build:

   ```sh
   npm run build
   ```

## Using the App

- Enter a recipe name or ingredient in the search field. Search results are paginated.
- Select a result to see its ingredients and instructions link. Change the serving count to update ingredient quantities.
- Use the bookmark control to save or remove a recipe. Bookmarks persist in the current browser.
- Choose **Add recipe** to submit a recipe. Enter each ingredient as `quantity,unit,description` (for example, `1, cup, flour`). The uploaded recipe is bookmarked automatically.

## Project Structure

- `index.html` - Application page and main layout.
- `src/js/controller.js` - Connects UI events, application state, and views.
- `src/js/model.js` - Recipe API requests, search results, servings, and bookmarks.
- `src/js/views/` - Search, recipe, bookmark, pagination, and upload views.
- `src/js/config.js` - API endpoint and application settings.
- `src/sass/` - Sass stylesheets.

## Technologies

- JavaScript modules
- Parcel 2
- Sass
- Forkify recipe API
- `core-js`, `regenerator-runtime`, and `fraction.js`

## Attribution

This project is based on the Forkify application from Jonas Schmedtmann's JavaScript course. The page includes the original attribution and learning-use notice. Recipe data is supplied by the Forkify API.
