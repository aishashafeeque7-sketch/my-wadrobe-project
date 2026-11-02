import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function CreateOutfit() {
  const [occasion, setOccasion] = useState("Casual");
  const [outfits, setOutfits] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleFindOutfits = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.get(`/outfits/suggest?occasion=${occasion}`);
      setOutfits(response.data.outfits);
      setHasSearched(true);
    } catch (err) {
      setError("Could not build outfit ideas. Please try again.");
    }
  };

  return (
    <div className="page">
      <h1>Create an Outfit</h1>
      <p>Pick an occasion and we will mix items from your own wardrobe.</p>

      <form className="occasion-form" onSubmit={handleFindOutfits}>
        <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          <option>Casual</option>
          <option>Office</option>
          <option>Party</option>
          <option>Wedding</option>
          <option>Festive</option>
          <option>Workout</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Find Outfit Ideas
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {hasSearched && outfits.length === 0 && (
        <p className="empty-text">
          No outfit ideas found for "{occasion}". Try adding more clothes for this
          occasion in your <Link to="/wardrobe">Wardrobe</Link>.
        </p>
      )}

      <div className="outfit-list">
        {outfits.map((outfit, index) => (
          <div className="outfit-card" key={index}>
            <h3>Outfit Idea {index + 1}</h3>
            <div className="outfit-pieces">
              {/* If the outfit uses a dress, show that instead of top + bottom */}
              {outfit.dress ? (
                <OutfitPiece label="Dress" item={outfit.dress} />
              ) : (
                <>
                  <OutfitPiece label="Top" item={outfit.top} />
                  <OutfitPiece label="Bottom" item={outfit.bottom} />
                </>
              )}
              {outfit.shoes && <OutfitPiece label="Shoes" item={outfit.shoes} />}
              {outfit.bag && <OutfitPiece label="Bag" item={outfit.bag} />}
              {outfit.accessory && <OutfitPiece label="Accessory" item={outfit.accessory} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Small helper component so we don't repeat the same code for every piece
function OutfitPiece({ label, item }) {
  return (
    <div className="outfit-piece">
      <img src={item.imageUrl} alt={item.name} />
      <p className="piece-label">{label}</p>
      <p className="piece-name">{item.name}</p>
    </div>
  );
}

export default CreateOutfit;
