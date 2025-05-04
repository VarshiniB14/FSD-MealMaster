import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import './MealCalendar.css'; // Ensure this file is imported
import calbg from './calbg2.jpg'; // Import the image file

// Function to get the number of days in a given month and year
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

// Function to get the first day of a given month and year
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

function MealCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // current month (0-11)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // current year
  const [showModal, setShowModal] = useState(false);
  const [currentCell, setCurrentCell] = useState({ day: "", mealType: "" });
  const [recipe, setRecipe] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealsData, setMealsData] = useState([]); // Store all meals for the month

  const days = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"];

  // Fetch meals from MongoDB whenever the month or year changes
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes", {
          params: {
            year: currentYear,
            month: currentMonth,
          },
        });
        setMealsData(response.data); // Update meals data with the response
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [currentMonth, currentYear]);

  const handleCellClick = (day) => {
    setCurrentCell({ day });
    setShowModal(true); // Open the modal when a date is clicked
  };

  const handleSave = async () => {
    if (!mealType || !recipe) {
      alert("Please enter both meal type and recipe!");
      return;
    }

    try {
      // Save the meal to the backend
      await axios.post("http://localhost:5000/api/recipes", {
        day: currentCell.day,
        mealType,
        recipe,
        year: currentYear,
        month: currentMonth,
      });

      // Fetch updated meals
      const response = await axios.get("http://localhost:5000/api/recipes", {
        params: {
          year: currentYear,
          month: currentMonth,
        },
      });
      setMealsData(response.data); // Update the meals data with the saved meal

      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save the recipe.");
    }
    setRecipe("");
    setMealType("");
    setShowModal(false); // Close the modal
  };

  const handleDelete = async (mealId) => {
    try {
      // Send request to delete the meal from the backend
      await axios.delete(`http://localhost:5000/api/recipes/${mealId}`);

      // Fetch updated meals after deletion
      const response = await axios.get("http://localhost:5000/api/recipes", {
        params: {
          year: currentYear,
          month: currentMonth,
        },
      });
      setMealsData(response.data); // Update meals data with the remaining meals

      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete the recipe.");
    }
  };
  

  // Function to navigate to the next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // January
      setCurrentYear(currentYear + 1); // Increment year
    } else {
      setCurrentMonth(currentMonth + 1); // Increment month
    }
  };

  // Function to navigate to the previous month
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // December
      setCurrentYear(currentYear - 1); // Decrement year
    } else {
      setCurrentMonth(currentMonth - 1); // Decrement month
    }
  };

  // Calculate the first day of the month and number of days in the current month
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const totalDays = getDaysInMonth(currentMonth, currentYear);

  // Generate an array representing the calendar grid (empty cells for the first week of the month)
  const calendarDays = Array.from({ length: firstDay }).concat(
    Array.from({ length: totalDays }, (_, i) => i + 1)
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: `url(${calbg})`, // Apply background image
        backgroundSize: "cover", // Ensure it covers the entire page
        backgroundPosition: "center", // Center the image
        minHeight: "100vh", // Make the background cover the full height
      }}
    >
      <h1 style={{ textAlign: "center", color: "white" }}>Meal Planner</h1>

      {/* Navigation for Month */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Button onClick={previousMonth}>&lt; Previous</Button>
        <h3 style={{ margin: "0 20px", color: "white" }}>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h3>
        <Button onClick={nextMonth}>Next &gt;</Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          textAlign: "center",
        }}
      >
        {/* Header Row */}
        {days.map((day) => (
          <div key={day} style={{ fontWeight: "bold", color: "white" }}>
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => day && handleCellClick(day)} // Only allow click on actual days
            style={{
              border: "1px solid black",
              height: "50px",
              cursor: "pointer",
              textAlign: "center",
              lineHeight: "50px",
              backgroundColor: day ? "#f9f9f9" : "transparent", // Styling empty cells
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Display meals for the month below the calendar */}
      <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "white" }}>Meals for the Month</h4>
        <ul>
          {mealsData.map((meal) => (
            <li key={meal._id} style={{ color: "white" }}>
              <strong>{meal.day}:</strong> {meal.mealType} - {meal.recipe}{" "}
              <Button variant="danger" size="sm" onClick={() => handleDelete(meal._id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Adding Recipe */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Meal Type</Form.Label>
              <Form.Control
                as="select"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="">Select Meal Type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snacks">Snacks</option>
                <option value="Dinner">Dinner</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                placeholder="Enter recipe"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MealCalendar;
