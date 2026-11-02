import React, { useState, useEffect } from "react";
import api from "../api/api";
import ClothingCard from "../components/ClothingCard";

function Wardrobe() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Top");
  const [color, setColor] = useState("black");
  const [occasion, setOccasion] = useState("Casual");
  const [imageUrl, setImageUrl] = useState("");

  // Get all wardrobe items when the page loads
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get("/wardrobe");
      setItems(response.data);
    } catch (err) {
      setError("Could not load your wardrobe");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/wardrobe", { name, category, color, occasion, imageUrl });

      // reset the form
      setName("");
      setImageUrl("");
      setShowForm(false);

      fetchItems(); // reload the list so the new item shows up
    } catch (err) {
      setError(err.response?.data?.message || "Could not add item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/wardrobe/${id}`);
      fetchItems();
    } catch (err) {
      setError("Could not delete item");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Wardrobe</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Item"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {showForm && (
        <form className="card form-card" onSubmit={handleAddItem}>
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. White cotton shirt"
            required
          />

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Top</option>
            <option>Bottom</option>
            <option>Dress</option>
            <option>Shoes</option>
            <option>Bag</option>
            <option>Accessory</option>
          </select>

          <label>Color</label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option>black</option>
            <option>white</option>
            <option>beige</option>
            <option>brown</option>
            <option>blue</option>
            <option>grey</option>
            <option>green</option>
            <option>red</option>
            <option>pink</option>
            <option>yellow</option>
            <option>orange</option>
            <option>gold</option>
          </select>

          <label>Occasion</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option>Casual</option>
            <option>Office</option>
            <option>Party</option>
            <option>Wedding</option>
            <option>Festive</option>
            <option>Workout</option>
          </select>

          <label>Image link (URL)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste an image link here"
            required
          />
          <p className="hint-text">
            Tip: you can right-click any image online and choose "Copy image address"
          </p>

          <button type="submit" className="btn btn-primary">
            Save Item
          </button>
        </form>
      )}

      {items.length === 0 ? (
        <p className="empty-text">
          Your wardrobe is empty. Click "+ Add Item" to add your first piece of clothing.
        </p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <ClothingCard key={item._id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wardrobe;
