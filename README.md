# Meal Explorer

Meal Explorer is a vibrant and modern single-page web application designed for discovering culinary delights from around the world. It provides users with an intuitive interface to browse, search, and view detailed information about hundreds of recipes.


## Features

- **Search Capabilities**: Instantly search for recipes by name.
- **Category Filtering**: Browse meals by specific categories (e.g., Beef, Chicken, Seafood, Vegan).
- **Sorting**: Toggle alphabetical sorting (A-Z or Z-A) to easily locate your favorite dishes.
- **Detailed Recipe Modals**: Click on any meal to see a beautifully presented popup containing:
  - An image of the finished dish
  - A categorized list of specific ingredients and measurements
  - Step-by-step cooking instructions
  - Links to YouTube video tutorials (when available)
- **Responsive Design**: Polished, modern UI with smooth animations and hover effects, looking great on desktop and mobile.

## API Integration

This project is powered by **[TheMealDB API](https://www.themealdb.com/api.php)**. 
It uses several free endpoints provided by TheMealDB to fetch real-time recipe data:
- `categories.php` - for retrieving meal categories
- `search.php?s=` - for querying meals by name
- `filter.php?c=` - for filtering meals by category
- `lookup.php?i=` - for fetching comprehensive details of a specific meal by ID


