# Documentation

The frontend is hosted on netlify [Live Website](https://recipe-mern-app.netlify.app).  
https://recipe-mern-app.netlify.app

## Administrator authorizations

An administrator is able to access any content that a user is able to, along with administrator only functions.       

Administrator functions consists of accessing and modifying the users list, recipes list, submitted recipes list, fetching and sending the fetched recipes to the database.  

A logged in administrator is able to access these functions on the / directory, also known as the home page.    

The home page of an admin differs from a guest or a logged user.   

Instead of display this documentation that a guest or a logged in user will have access to, a logged in administrator will have access to a different set of content, which will be detailed below.  

Administrator page: Three toggle toggle buttons as well as an action button will be displayed.   

Toggle buttons - Toggle buttons are used to select which one of the three tables to display on the current page.  

All tables have a search bar under each header which is used for searching purposes, additionally, each header is able to be clicked, which will sort the columns in ascending, descending or default view, an icon will be displayed next to the clicked header to match the respective sorting order.  

The first and default button that is displayed is the Users List.  


### Users List
Table displaying all of the users that are currently registered, each row displays an individual user's username, their ID, the number of recipes in their collections, as well as a button which upon a click will show a pop up modal displaying a table listing all of the recipes in the user's collections.   

### Recipes List

Table displaying all of the recipes that are currently in the database, the headers consists of the recipe's ID, name, category, author of the recipe, the date and time in which it was added to the database, a button to view more information regarding the recipe, and a button to delete the recipe from the database.  

### Submitted Recipes
Table displaying all of the submitted recipes that a user has submitted through the /addrecipe directory, the headers in this table are similar to the headers in the Recipes List table, with additional deny and approve buttons to either discard the submitted recipe or to approve the recipe and add it to the recipes database.  

### Fetch Recipes
Fetch Recipes - Unlike the previous three buttons used to render a different table on the page, this buttons acts as an action button.  

Upon click, this button will attempt to fetch recipes from an external API and then upon succession, will attempt to send the fetched recipes into the backend database.  

Loading toast notifications will appear as a visual aid to measure the pending and completion state of the operations.  

## User authorizations
Users are restricted from accessing administrator only functions.  

Administrator functions consists of accessing and modifying the users list, recipes list, submitted recipes list, fetching and sending the fetched recipes to the database.  

Users have access to the following directories:  

/recipes - View recipes, add recipes to their collections, delete recipes from their collections.  

/mycollection - Collection of added recipes from the /recipes directory, users can delete a recipe to remove it from their collections.  

/addRecipe - Users can submit a recipe to be added to the recipes database upon an admin's approval.  

/register - Registering a new user, provided that the entered username is unique.  

/login - Authentication of user.  

/logout - Users can log out to clear their session.  

### Recipes
The /recipes directory can be accessed by a logged in user, or a guest.  

However, only a logged in user is able to save a recipe to their collections.  

This directory consists of a collection of recipes that are publicly available for users to add to or delete from their collections.  

A search bar is located at the top left of the page, which functions interactively whenever a user types into the search field.  

The bottom section of the recipes page consists of a pagination bar which acts as a form of navigation to view the next or previous set of recipes.  

The middle portion of the page consists of eight separate card components that each displays an individual recipe.  

A user can click on the Learn More button on the bottom of each recipe card.  

A modal will pop up upon clicking on the Learn More button, which displays a page that has a more detail explanation regarding that specific recipe.  

The user can choose to either close the recipe modal pop up by clicking on the close button or by clicking outside of the modal popup.  

On the far right of the close button is either an "Add to my collections" button or a "Delete from my collections" button which upon a click, will either add the recipe to the user's collections or delete the recipe from the user's collections.  

A toast notification will appear as a visual aid to reflect the user's actions.  

Deleting a recipe in this way will close the modal popup.  

Below the close and add/delete buttons is the name and picture of the recipe, and directly next to that is a list of ingredients.  

The last section on the bottom is a list of instructions, along with optional checkmark boxes which acts as a visual aid for each instruction.  


### My Collections
The /mycollections directory can be accessed by a logged in user.  

Guests will be instructed to login in order to view relevant portions of this page.  

This page has a layout that is similar to the /recipes directory.  

Consisting of a search bar on the top left, and eight separate card components which displays each individual recipe that has been saved by the user from the /recipes directory.  

A pagination bar is displayed on the bottom portion of the page, which is used to navigate to different set of recipes in the collections.  

Upon clicking on the Learn More button located on the bottom of each recipe card component, a modal will pop up with more information regarding each recipe.  

However, unlike the modal popup in the /recipes directory, the /mycollections modal popup will only allow the user to delete a recipe from their collections. 

Upon deleting a recipe, the modal popup will close, and the user's collections will immediately refresh in order to reflect the changes as a result of deleting the recipe.  

### Add Recipe
A user is required to be logged in to access revelant information on this directory.  

This directory consists of a form that is used to submit a recipe.  

Upon form submission, the submitted recipe will be sent to the Submitted Recipes component on the administrator's page.  

Upon an administrator's approval, a submitted recipe will then be moved to the recipes database.  

The add recipe form consists of a recipe name field, recipe category field, a default field of three separate ingredient and quantity.  

Directly below the ingredients fields is a button that is used to populate additional ingredient fields, with a maximum of 20 fields available.  

Below that is the instructions field, similar to the ingredients field, a button is available to populate additional instructions.  

On the bottom of the form is an optional button to upload an image, upon selecting an image, a text will appear to reflect the file name of the image.  

Finally, the user can click on the submit button to submit the recipe, and a toast notification will appear to reflect the submission.  

### Register
Registration form for user registration, validation is displayed in the form of toast notifications to reflect the user's actions.  

### Login
Login form for user authentication, validation is displayed in the form of toast notifications to reflect the user's actions.  

Upon a successful authentication, the user will be redirected to the home page.  

### Logout
User information is cleared and a redirect to the home page occurs afterwards.  

