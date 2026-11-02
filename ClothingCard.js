

import React from "react";

function ClothingCard({ item, onDelete }) {
  return (
    <div className="clothing-card">
      <img src={item.imageUrl} alt={item.name} className="clothing-image" />
      <div className="clothing-info">
        <h4>{item.name}</h4>
        <p>{item.category}</p>
        <p>
          Color: <span className="tag">{item.color}</span>
        </p>
        <p>
          Occasion: <span className="tag">{item.occasion}</span>
        </p>
        {onDelete && (
          <button className="btn btn-small btn-danger" onClick={() => onDelete(item._id)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default ClothingCard;
