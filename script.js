document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');

    if (!searchInput) return alert("Please enter a search term!");

    resultsDiv.innerHTML = ''; // Clear previous results

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();

    if (!data.meals) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    const meals = data.meals.slice(0, 5); // Show first 5 results
    meals.forEach(meal => {
        resultsDiv.innerHTML += `
            <div class="meal-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <p><strong>ID:</strong> ${meal.idMeal}</p>
                <p>${meal.strInstructions.slice(0, 100)}...</p>
            </div>
        `;
    });

    if (data.meals.length > 5) {
        const showAllButton = document.createElement('button');
        showAllButton.textContent = "SHOW ALL";
        showAllButton.onclick = () => {
            data.meals.slice(5).forEach(meal => {
                resultsDiv.innerHTML += `
                    <div class="meal-card">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h2>${meal.strMeal}</h2>
                        <p><strong>ID:</strong> ${meal.idMeal}</p>
                        <p>${meal.strInstructions.slice(0, 100)}...</p>
                    </div>
                `;
            });
            showAllButton.remove();
        };
        resultsDiv.appendChild(showAllButton);
    }
});
