# All-Gender Bathroom Finder

## Local Setup

### Requirements
1. Install [Vue](https://vuejs.org/v2/guide/installation.html) locally on your machine. `npm install vue`
1. Run `npm install`
1. Run `npm run serve` to run the site locally.
1. The site should be available at [http://localhost:8080/](http://localhost:8080/)
1. Make sure to enable location services

It will also be helpful to have [Vue Dev Tools](https://github.com/vuejs/vue-devtools#vue-devtools) installed in your browser.

## Summary

This project stems from a drive to fulfill a personal need, and a need for many other non-binary and trans identifying individuals. When on any given day you can be perceived as either male or female, something as simple as going to the bathroom can become a huge safety issue. My spouse and I try to frequent locations that offer gender-netural bathrooms, but it can be hard remembering all of those spaces.

This project seeks to fulfill that need by providing a database of locations with all-gender bathrooms that anyone can add to. Its present functionality allows for the following:

*   Returns a list of safe bathrooms based on the user's present location. (Note: all locations currently are on the Triangle area of North Carolina.
*   Users can search for locations with the Google Places API generating autocomplete results for teh search engine.
*   Users can add new locations

Plans for future funtionality include:

*   Add a link to a location's website
*   Create a Map view in addition to List view of search results.
*   Add authentication to allow for users to create an account
*   Require users to answer a series of questions about a location before adding it.
*   Allow users to add comments about a location.
*   Allow users to edit or delete a location
*   Create an admin account to handle user feedback & requests

## Technologies Used

This project was created using the following technologies:

*   Vue.js
*   Vuex
*   Vue Router
*   Sass
*   Axios
*   Google Maps & Places API

The [server side](https://github.com/alexmanzo/bathroom-finder-server) of the project was created using the following technologies:

*   Node.js
*   Express
*   MongoDB
*   Mongoose
*   Mocha/Chai Testing
*   Travis CI

## Author

This project was created by Alex Manzo.