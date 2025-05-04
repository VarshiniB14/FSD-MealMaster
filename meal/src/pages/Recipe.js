import React, { useState } from "react";
import "./Recipe.css";
// Import images
import ladoo from "./ladoo.jpg";
import gujia from "./gujia.jpg";
import aviyal from "./aviyal.jpg";

const Recipe = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const recipes = [
    {
      id: 1,
      name: "Motichoor Ladoo",
      image: ladoo,
      description: "A delicious Motichoor Ladoo recipe.",
      ingredients: ["1 cup chickpea flour (besan)", "1/2 cup water", "1/4 cup ghee (clarified butter)", "1/2 cup sugar", "1/4 cup water (for sugar syrup)", "1/4 tsp cardamom powder", "1/4 cup chopped pistachios or almonds (optional)", "1/4 tsp saffron strands (optional)"],
      steps: ["Prepare the sugar syrup: Heat 1/4 cup water in a pan and add sugar. Stir until the sugar dissolves and the syrup reaches a one-string consistency. Add cardamom powder and saffron strands. Set aside.", "Make the batter: In a bowl, mix chickpea flour and water to form a smooth batter. It should have a dropping consistency.", "Fry the boondi: Heat ghee in a pan. Drop small spoonfuls of the batter into the hot ghee using a perforated spoon to form small boondi (round fried droplets). Fry until golden brown and crispy.", "Soak in sugar syrup: Immediately transfer the fried boondi into the sugar syrup and let them soak for 10-15 minutes.", "Shape into ladoos: Once the boondi absorbs the syrup, take small portions and shape them into ladoos. Garnish with chopped pistachios or almonds."],
      festival: "Diwali",
    },
    {
      id: 2,
      name: "Gujiya",
      image: gujia,
      description: "A yummy sweet filling dish.",
      ingredients: ["1 cup all-purpose flour (maida)", "1/4 cup ghee", "1 cup khoya (mawa), crumbled", "1/2 cup powdered sugar", "1/4 cup chopped dry fruits (cashews, almonds, raisins)", "1/4 tsp cardamom powder", "Oil (for frying)"],
      steps: ["Make the dough: In a mixing bowl, combine all-purpose flour and ghee. Rub the ghee into the flour until it resembles breadcrumbs. Add water little by little and knead the dough until it becomes smooth. Cover it with a damp cloth and set aside.", "Prepare the filling: In a pan, cook crumbled khoya on medium heat until it becomes soft and slightly golden. Add powdered sugar, chopped dry fruits, and cardamom powder. Mix well and cook for another 2-3 minutes. Remove from heat and let it cool.", "Shape the gujiya: Roll out small portions of dough into circles. Place a spoonful of the filling in the center, fold the dough over to form a half-moon shape, and seal the edges by pressing with your fingers or using a fork.", "Fry the gujiya: Heat oil in a pan on medium heat. Fry the gujiyas in batches until they turn golden brown and crispy. Remove from oil and drain on paper towels."],
      festival: "Holi",
    },
    {
      id: 3,
      name: "Aviyal",
      image: aviyal,
      description: "A famous onam sadhya dish.",
      ingredients: ["1/2 cup carrots, diced", "1/2 cup potatoes, diced", "1/2 cup drumsticks, cut into pieces", "1/2 cup beans, chopped", "1/2 cup raw banana, diced", "1/2 cup pumpkin, diced", "1/4 cup coconut, grated", "2 green chilies", "1/4 tsp turmeric powder", "1/2 cup yogurt", "2 tbsp coconut oil", "Curry leaves"],
      steps: ["Prepare the vegetables: In a large pot, add all the diced vegetables with turmeric powder and enough water to cook them. Cook the vegetables until they are tender but not mushy.", "Make the coconut paste: In a blender, combine grated coconut and green chilies. Grind into a smooth paste by adding a little water if necessary.", "Mix coconut paste with vegetables: Once the vegetables are cooked, add the coconut paste and salt. Stir to combine and cook for another 5-10 minutes on low heat.", "Add yogurt and oil: Remove the pot from the heat. Add yogurt and mix gently. Drizzle with coconut oil and add curry leaves for garnish.", "Serve: Serve hot with rice as part of the Onam Sadya."],
      festival: "Onam",
    },
  ];

  const groupedRecipes = recipes.reduce((acc, recipe) => {
    if (!acc[recipe.festival]) acc[recipe.festival] = [];
    acc[recipe.festival].push(recipe);
    return acc;
  }, {});

  const closeDetails = () => setSelectedRecipeId(null);

  return (
    <div className="recipe-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Festival Recipes 🎉</h3>
        {Object.keys(groupedRecipes).map((festival) => (
          <div key={festival}>
            <h4>{festival}</h4>
            <ul>
              {groupedRecipes[festival].map((recipe) => (
                <li
                  key={recipe.id}
                  onClick={() => setSelectedRecipeId(recipe.id)}
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="recipes-section">
        <h2>Recipes 🍴</h2>
        <div className="recipe-list">
          {/* Render Recipe Cards */}
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div
                onClick={() =>
                  setSelectedRecipeId(
                    selectedRecipeId === recipe.id ? null : recipe.id
                  )
                }
              >
                <img src={recipe.image} alt={recipe.name} />
                <p className="recipe-name">{recipe.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Render Selected Recipe Details After All Cards */}
        {selectedRecipeId && (
          <div className="recipe-details">
            {/* Find the selected recipe */}
            {recipes.map((recipe) =>
              recipe.id === selectedRecipeId ? (
                <div key={recipe.id}>
                  <h3>{recipe.name}</h3>
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h4>Steps:</h4>
                  <ol>
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                  <button className="close-btn-green" onClick={closeDetails}>
                    Close
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
