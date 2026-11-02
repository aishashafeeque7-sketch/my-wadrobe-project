import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80"
          alt="Wardrobe with clothes"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Hi {user?.name}, plan your next outfit</h1>
          <p>
            Save the clothes you already own, pick an event, and get outfit ideas
            made only from your own wardrobe.
          </p>
          <div className="hero-buttons">
            <Link to="/wardrobe" className="btn btn-primary">
              Go to My Wardrobe
            </Link>
            <Link to="/create-outfit" className="btn btn-secondary">
              Create an Outfit
            </Link>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How this works</h2>
        <div className="steps">
          <div className="step-card">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80"
              alt="Add clothes"
            />
            <h3>1. Add your clothes</h3>
            <p>Save tops, bottoms, dresses, shoes, bags and accessories you own.</p>
          </div>
          <div className="step-card">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80"
              alt="Pick an occasion"
            />
            <h3>2. Pick an occasion</h3>
            <p>Casual day out, office, party, wedding, or festive - you choose.</p>
          </div>
          <div className="step-card">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80"
              alt="Get outfit ideas"
            />
            <h3>3. Get outfit ideas</h3>
            <p>We mix and match your own items into ready-to-wear outfit ideas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
