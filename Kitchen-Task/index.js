let currentRecipes = [];

    async function loadCategories() {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        const categorySelect = document.getElementById('categorySelect');

        data.categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.strCategory;
          option.textContent = category.strCategory;
          categorySelect.appendChild(option);
        });
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

    async function loadRecipes(category) {
      if (!category) return;

      const mainContent = document.getElementById('mainContent');
      const recipesGrid = document.getElementById('recipesGrid');

      recipesGrid.innerHTML = '<div class="loading">Loading recipes...</div>';
      mainContent.style.display = 'block';

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        currentRecipes = data.meals || [];

        const recipesToShow = currentRecipes.slice(0, 32);

        recipesGrid.innerHTML = '';

        recipesToShow.forEach((recipe, index) => {
          const card = document.createElement('div');
          card.className = 'recipe-card';
          card.onclick = () => showRecipeDetail(recipe.idMeal);

card.innerHTML = `
<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
<h3>${recipe.strMeal}</h3>`;

          recipesGrid.appendChild(card);
        });

      } catch (error) {
        console.error('Error loading recipes:', error);
        recipesGrid.innerHTML = '<div class="loading">Error loading recipes. Please try again.</div>';
      }
    }

    async function showRecipeDetail(mealId) {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
          }
        }

        const recipeDetailContent = document.getElementById('recipeDetailContent');
        recipeDetailContent.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="recipe-info">
      <h2>${meal.strMeal}</h2>
      <div class="ingredients">
    <h3>Ingredients:</h3>
<ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul></div>
    ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank" class="youtube-btn">Watch Recipe Video</a>` : ''}</div>`;

        document.getElementById('recipeDetail').classList.add('active');
      } catch (error) {
        console.error('Error loading recipe details:', error);
      }
    }

    function closeRecipeDetail() {
      document.getElementById('recipeDetail').classList.remove('active');
    }

    document.addEventListener('click', function (event) {
      const recipeDetail = document.getElementById('recipeDetail');
      if (event.target === recipeDetail) {
        closeRecipeDetail();
      }
    });

    document.getElementById('categorySelect').addEventListener('change', function () {
      const selectedCategory = this.value;
      if (selectedCategory) {
        loadRecipes(selectedCategory);
      } else {
        document.getElementById('mainContent').style.display = 'none';
      }
    });

    document.addEventListener('DOMContentLoaded', function () {
      loadCategories();
    });