import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
console.log("API KEY:", API_KEY);

const buildUrl = (query) => {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    query: query || "pasta",
    number: "25",          // show up to 24 recipes
    addRecipeInformation: "true", // include readyInMinutes, servings, etc.
    instructionsRequired: "true", // only recipes with instructions
  });

  return `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
};

function App() {
  const [recipes, setRecipes] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // e.g. vegetarian, vegan, gluten free
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!API_KEY) {
      setError("Missing Spoonacular API key. Add VITE_SPOONACULAR_API_KEY to your .env file.");
      setLoading(false);
      return;
    }

    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const url = buildUrl("pasta");
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        // Spoonacular complexSearch returns { results: [...], totalResults, ... }
        setRecipes(data.results || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Simple diet filter using recipe.diets array from addRecipeInformation=true
      const matchesFilter =
        filterType === "all" ||
        (Array.isArray(recipe.diets) &&
          recipe.diets.map((d) => d.toLowerCase()).includes(filterType));

      return matchesSearch && matchesFilter;
    });
  }, [recipes, searchTerm, filterType]);

  const totalShown = filteredRecipes.length;

  const averageReadyTime =
    filteredRecipes.length > 0
      ? Math.round(
          filteredRecipes.reduce(
            (sum, recipe) => sum + (recipe.readyInMinutes || 0),
            0
          ) / filteredRecipes.length
        )
      : 0;

  const uniqueDiets = new Set(
    filteredRecipes
      .flatMap((recipe) => recipe.diets || [])
      .map((diet) => diet.toLowerCase())
  );

  const dietOptions = ["all", ...Array.from(uniqueDiets)];

  return (
    <div className="app">
      <header className="header">
        <h1>Recipe Explorer Dashboard</h1>
        <p>Search quick recipes and explore by diet type.</p>
      </header>

      <section className="stats-container">
        <div className="stat-card">
          <h2>{totalShown}</h2>
          <p>Visible Recipes</p>
        </div>

        <div className="stat-card">
          <h2>{totalResults}</h2>
          <p>Total API Results</p>
        </div>

        <div className="stat-card">
          <h2>{averageReadyTime || "–"}</h2>
          <p>Avg. Ready Time (min)</p>
        </div>
      </section>

      <section className="controls">
        <input
          type="text"
          placeholder="Search within results by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {dietOptions.map((diet) => (
            <option key={diet} value={diet}>
              {diet === "all"
                ? "All Diets"
                : diet.charAt(0).toUpperCase() + diet.slice(1)}
            </option>
          ))}
        </select>
      </section>

      {loading && <p className="message">Loading recipes...</p>}
      {error && <p className="message error">{error}</p>}

      {!loading && !error && (
        <section className="cards-grid">
          {filteredRecipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
                loading="lazy"
              />
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p className="meta">
                  {recipe.readyInMinutes
                    ? `${recipe.readyInMinutes} min`
                    : "Time N/A"}{" "}
                  ·{" "}
                  {recipe.servings ? `${recipe.servings} servings` : "Servings N/A"}
                </p>
                {recipe.diets && recipe.diets.length > 0 && (
                  <p className="diets">
                    Diets: {recipe.diets.join(", ")}
                  </p>
                )}
              </div>
            </article>
          ))}

          {filteredRecipes.length === 0 && (
            <p className="message">No recipes match your filters.</p>
          )}
        </section>
      )}
    </div>
  );
}

export default App;