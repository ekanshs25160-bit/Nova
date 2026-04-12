let categories = [];
let meals = [];
let selectedCategory = 'All';
let searchQuery = '';
let sortBy = 'asc';
let selectedMealId = null;
let mealDetail = null;
let loading = false;
let detailLoading = false;

async function init() {
  setupEventListeners();
  await fetchCategories();
  await fetchMeals();
}

async function fetchCategories() {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    if (!res.ok) {
      throw "HTTP error! status: " + res.status;
    }
    const data = await res.json();
    categories = data.categories || [];
    renderCategories();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }
}

async function fetchMeals() {
  loading = true;
  renderMeals();
  try {
    let url = '';
    if (searchQuery) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;
    } else if (selectedCategory === 'All') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    meals = data.meals || [];
  } catch (err) {
    console.error('Failed to fetch meals:', err);
    meals = [];
  } finally {
    loading = false;
    renderMeals();
  }
}

async function fetchMealDetail(id) {
  detailLoading = true;
  renderModal();
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!res.ok) {
      throw "HTTP error! status: " + res.status;
    }
    const data = await res.json();
    
    if (data.meals && data.meals.length > 0) {
      mealDetail = data.meals[0];
    } else {
      mealDetail = null;
    }
  } catch (err) {
    console.error('Failed to fetch meal detail:', err);
    mealDetail = null;
  } finally {
    detailLoading = false;
    renderModal();
  }
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchMeals();
    }, 500);
  });

  const sortButton = document.getElementById('sort-button');
  sortButton.addEventListener('click', () => {
    sortBy = sortBy === 'asc' ? 'desc' : 'asc';
    renderMeals();
  });
}

function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;
  container.innerHTML = `
    <div class="filter-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
      <span class="filter-text">Filter</span>
    </div>
    <button class="category-pill ${selectedCategory === 'All' ? 'active' : ''}" data-category="All">All</button>
    ${categories.map((cate) => {
      let btnClass = "category-pill";
      if (selectedCategory === cate.strCategory) {
        btnClass += " active";
      }
      return `
      <button class="${btnClass}" data-category="${cate.strCategory}">${cate.strCategory}</button>
    `
    }).join('')}
  `;

  container.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.getAttribute('data-category');
      searchQuery = '';
      document.getElementById('search-input').value = '';
      renderCategories();
      fetchMeals();
    });
  });
}

function renderMeals() {
  const grid = document.getElementById('meals-grid');
  const title = document.getElementById('results-title');
  const sortText = document.getElementById('sort-text');
  if (!grid || !title || !sortText) return;

  sortText.textContent = `Sort ${sortBy === 'asc' ? 'A-Z' : 'Z-A'}`;
  title.innerHTML = `
    ${searchQuery ? `Search results for "${searchQuery}"` : `${selectedCategory} Selection`}
    <span class="results-count">(${meals.length} items)</span>
  `;

  if (loading) {
    grid.innerHTML = `
      <div class="loader-container">
        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <p class="loader-text">Fetching culinary delights...</p>
      </div>
    `;
    return;
  }

  if (meals.length === 0 && !loading) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 2-2 2"/><path d="m20 8-2 2"/><path d="m22 2-5.5 5.5"/><path d="m11 15.5 9.5-9.5"/><path d="M8 15a2 2 0 1 1 0 4 2 2 0 1 1 0-4Z"/><path d="m9 17 4 4"/><path d="m14 16 4 4"/><path d="M2 8v6a2 2 0 0 0 2 2h20"/><path d="M15 3v20"/></svg>
        </div>
        <h3 class="empty-title">No meals found</h3>
        <p class="empty-subtitle">We couldn't find any meals. This might be due to a network issue or no results for your search.</p>
        <button onclick="location.reload()" class="btn-secondary" style="margin-top: 1.5rem">Retry</button>
      </div>
    `;
    return;
  }

  const sortedMeals = [...meals].sort(function(a, b) {
    if (a.strMeal < b.strMeal) {
      if (sortBy === 'asc') {
        return -1;
      } else {
        return 1;
      }
    } else if (a.strMeal > b.strMeal) {
      if (sortBy === 'asc') {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 0;
    }
  });

  grid.innerHTML = sortedMeals.map(meal => `
    <div class="meal-card" data-id="${meal.idMeal}">
      <div class="meal-image-container">
        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
          class="meal-image"
          referrerpolicy="no-referrer"
        />
        <div class="meal-overlay"></div>
      </div>
      <div class="meal-info">
        <h3 class="meal-title">${meal.strMeal}</h3>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.meal-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedMealId = card.getAttribute('data-id');
      fetchMealDetail(selectedMealId);
    });
  });
}

function renderModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;
  if (!selectedMealId) {
    container.innerHTML = '';
    document.body.style.overflow = '';
    return;
  }

  document.body.style.overflow = 'hidden';

  container.innerHTML = `
    <div class="modal-wrapper">
      <div id="modal-overlay" class="modal-overlay"></div>
      <div class="modal-content">
        ${detailLoading ? `
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 5rem;">
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          </div>
        ` : mealDetail ? `
          <div class="modal-image-section">
            <img
              src="${mealDetail.strMealThumb}"
              alt="${mealDetail.strMeal}"
              class="modal-image"
              referrerpolicy="no-referrer"
            />
            <div class="modal-badges">
              <span class="badge">${mealDetail.strCategory}</span>
              <span class="badge">${mealDetail.strArea}</span>
            </div>
          </div>
          <div class="modal-details-section">
            <div class="modal-header">
              <h2 class="modal-title">${mealDetail.strMeal}</h2>
              <button id="close-modal" class="btn-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

            <div class="modal-body">
              <section class="modal-section">
                <h3 class="section-title">Ingredients</h3>
                <div class="ingredients-grid">
                  ${getIngredientsList().map(item => `
                    <div class="ingredient-item">
                      <span class="ingredient-name">${item.ingredient}</span>
                      <span class="ingredient-measure">${item.measure}</span>
                    </div>
                  `).join('')}
                </div>
              </section>

              <section class="modal-section">
                <h3 class="section-title">Instructions</h3>
                <p class="instructions-text">${mealDetail.strInstructions}</p>
              </section>

              ${mealDetail.strYoutube ? `
                <a
                  href="${mealDetail.strYoutube}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-youtube"
                >
                  Watch on YouTube
                </a>
              ` : ''}
            </div>
          </div>
        ` : `
          <div style="padding: 5rem; text-align: center; flex: 1;">
            <p style="color: #6b7280;">Failed to load meal details.</p>
          </div>
        `}
      </div>
    </div>
  `;

  document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
  document.getElementById('close-modal')?.addEventListener('click', closeModal);
}

function closeModal() {
  selectedMealId = null;
  renderModal();
}

function getIngredientsList() {
  if (!mealDetail) return [];
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealDetail[`strIngredient${i}`];
    const measure = mealDetail[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient, measure });
    }
  }
  return list;
}

init();
