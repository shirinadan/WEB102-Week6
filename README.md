# Web Development Project 5 - *Recipe Explorer Dashboard*

Submitted by: **Shirina Shaji Daniel**

This web app: **Recipe Explorer Dashboard is a React app that fetches live recipe data from the Spoonacular API and displays it in a dashboard with summary statistics, a searchable list of recipes, and a diet-based filter. Users can explore recipe titles, cooking times, servings, and diet categories in an interactive card layout.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - [x] The dashboard displays at least 10 unique items
  - [x] Each recipe card includes at least two features, such as title, image, ready time, servings, and diet information
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - [x] Total number of recipes currently displayed
  - [x] Total number of results returned for the search query
  - [x] Average ready time in minutes for the filtered recipes
- [x] **A search bar allows the user to search for an item in the fetched data**
  - [x] The search bar correctly filters recipes by title
  - [x] The list of results dynamically updates as the user types
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - [x] A dropdown filter restricts recipes by diet type
  - [x] The filter uses a different attribute than the search bar
  - [x] The dashboard dynamically updates as the filter changes

## Optional Features

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - [x] Text input for title search
  - [x] Dropdown menu for diet filtering
- [ ] The user can enter specific bounds for filter values

## Additional Features

The following **additional** features are implemented:

- [x] Responsive card layout for recipe results
- [x] Recipe images displayed on each card
- [x] Loading and error states for API requests
- [x] Styled dashboard cards and search controls for a cleaner user experience
- [x] Custom pasta-themed background image for visual design

## Video Walkthrough

Here's a walkthrough:

<img src="walkthrough-week6.gif" title="Video Walkthrough" width="" alt="Video Walkthrough" />

## Notes

One challenge was setting up the Spoonacular API key correctly with a `.env` file in Vite and making sure the app could read it through `import.meta.env`. Another challenge was debugging the search bar styling because the typed text was initially not visible until the input text color was explicitly set in CSS. I also adjusted the background and mobile spacing to make the dashboard feel cleaner and easier to read.

## License

Copyright **2026** **Shirina Shaji Daniel**

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.