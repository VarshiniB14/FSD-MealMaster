const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (using the existing 'mealplanner' database)
mongoose.connect("mongodb://localhost:27017/mealplanner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Recipe Schema for meals (already existing)
const recipeSchema = new mongoose.Schema({
  day: String,
  meal: String,
  recipe: String,
  year: Number,
  month: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Purchase Item Schema for shopping cart
const purchaseItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const PurchaseItem = mongoose.model("PurchaseItem", purchaseItemSchema);

// API Route to Save Recipe
// POST /api/recipes - Save a meal
app.post("/api/recipes", async (req, res) => {
  try {
    const { day, mealType, recipe, year, month } = req.body;

    if (!day || !mealType || !recipe || !year || !month) {
      return res.status(400).send("Missing required fields.");
    }

    const newMeal = new Recipe({
      day,
      meal: mealType,
      recipe,
      year,
      month,
    });

    await newMeal.save();
    res.status(200).send(newMeal);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).send("Failed to save the recipe.");
  }
});

// API Route to Get Recipes for a specific month and year
app.get("/api/recipes", async (req, res) => {
  try {
    const { year, month } = req.query;
    const meals = await Recipe.find({ year, month });

    if (!meals.length) {
      return res.status(404).send("No meals found for this month.");
    }

    res.status(200).send(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).send("Failed to fetch meals.");
  }
});

// API Route to Save Purchase Items
// POST /api/purchase-items - Save a new purchase item (for the shopping cart)
app.post("/api/purchase-items", async (req, res) => {
  try {
    const { name, quantity } = req.body;

    if (!name || quantity == null) {
      return res.status(400).send("Missing required fields.");
    }

    const newPurchaseItem = new PurchaseItem({
      name,
      quantity,
    });

    await newPurchaseItem.save();
    res.status(200).send(newPurchaseItem);
  } catch (error) {
    console.error("Error saving purchase item:", error);
    res.status(500).send("Failed to save the purchase item.");
  }
});

// API Route to Get All Purchase Items
// GET /api/purchase-items - Retrieve all purchase items (for the shopping cart)
app.get("/api/purchase-items", async (req, res) => {
  try {
    const purchaseItems = await PurchaseItem.find();
    
    if (!purchaseItems.length) {
      return res.status(404).send("No purchase items found.");
    }

    res.status(200).send(purchaseItems);
  } catch (error) {
    console.error("Error fetching purchase items:", error);
    res.status(500).send("Failed to fetch purchase items.");
  }
});

// Example route to update an item in your backend
app.put('/api/purchase-items/:id', async (req, res) => {
  const { id } = req.params;
  const { bought } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(id, { bought }, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});

// Example route to delete an item from your backend
app.delete('/api/purchase-items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Use the correct model PurchaseItem instead of Item
    await PurchaseItem.findByIdAndDelete(id); 
    res.status(200).send('Item deleted');
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(400).json({ message: 'Error deleting item', error });
  }
});
// DELETE a recipe by ID
app.delete("/api/recipes/:id", async (req, res) => {
  const mealId = req.params.id;
  try {
    const deletedMeal = await Recipe.findByIdAndDelete(mealId); // Use Recipe instead of Meal
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully", meal: deletedMeal });
  } catch (err) {
    res.status(500).json({ message: "Error deleting meal", error: err });
  }
});



// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
