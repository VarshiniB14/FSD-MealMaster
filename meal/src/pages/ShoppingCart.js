import React, { useState, useEffect } from "react";
import axios from "axios";

// Main ShoppingCart Component
const ShoppingCart = () => {
  // State to hold the list of items and the new item to be added
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch existing items from the MongoDB
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/purchase-items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []); // Empty dependency array means this will run once when the component mounts

  // Handle adding a new item to MongoDB and updating the frontend
  const handleAddItem = async () => {
    if (!newItem || quantity <= 0) {
      alert("Please provide a valid item name and quantity.");
      return;
    }

    // Create a new item object
    const item = {
      name: newItem,
      quantity,
    };

    try {
      // Make the POST request to add the item to MongoDB
      await axios.post("http://localhost:5000/api/purchase-items", item);

      // Clear input fields
      setNewItem("");
      setQuantity(1);

      // Fetch the updated items and update the state
      const response = await axios.get("http://localhost:5000/api/purchase-items");
      setItems(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle deleting an item from MongoDB
  const handleDeleteItem = async (id) => {
    try {
      // Make DELETE request to remove the item from MongoDB
      await axios.delete(`http://localhost:5000/api/purchase-items/${id}`);

      // Remove the item from the local state
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="shopping-cart-container" style={containerStyle}>
      <h1 style={{ textAlign: "center", color: "black" }}>Items to be Purchased</h1>
      <div className="add-item-container" style={addItemContainerStyle}>
        <input
          type="text"
          placeholder="Enter item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          style={inputStyle}
        />
        {/* + Button next to the quantity input */}
        <button onClick={handleAddItem} style={plusButtonStyle}>
          +
        </button>
      </div>

      <div className="items-list" style={itemsListStyle}>
        <ul>
          {items.map((item) => (
            <li
              key={item._id}
              style={{
                ...itemStyle,
                color: "black", // Always black for text
              }}
            >
              {item.name} (Quantity: {item.quantity})
              <button onClick={() => handleDeleteItem(item._id)} style={deleteButtonStyle}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Styles for the container, input fields, and button
const containerStyle = {
  backgroundColor: "#f8d7da", // Light pink background
  height: "100vh", // Full page height
  padding: "20px", // Padding around the container
};

const addItemContainerStyle = {
  textAlign: "center",
  display: "flex", // Flexbox to align the input fields and button in a row
  alignItems: "center", // Vertically center the elements
  marginBottom: "20px",
};

const inputStyle = {
  marginRight: "10px",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
};

const plusButtonStyle = {
  width: "40px", // Adjust the size of the button
  height: "40px", // Adjust the size of the button
  borderRadius: "50%", // Circle shape
  backgroundColor: "#4CAF50", // Green background
  color: "white", // White color for the + sign
  fontSize: "24px", // Make the + sign large
  border: "none", // Remove the border
  cursor: "pointer", // Pointer cursor on hover
  display: "flex", // Flexbox to center the + sign
  justifyContent: "center", // Center the content horizontally
  alignItems: "center", // Center the content vertically
};

const itemsListStyle = {
  margin: "20px auto",
  padding: "20px",
  width: "80%",
  border: "1px solid black",
  borderRadius: "10px",
  backgroundColor: "white", // White background for the list frame
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
};

const itemStyle = {
  fontSize: "18px",
  color: "black",
};

const deleteButtonStyle = {
  marginLeft: "10px",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "red",
};

export default ShoppingCart;
