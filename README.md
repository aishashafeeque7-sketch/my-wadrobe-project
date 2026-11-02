# my-wadrobe-project
A web-based Wardrobe Management System that helps users organize clothing digitally by uploading or capturing photos, categorizing items, and managing details like colour, season, brand, and occasion.  **Tech Stack:** HTML, CSS, JavaScript, Node.js, Express.js, EJS, MongoDB, and Multer.
# Outfit Planner (MERN Stack)

A simple beginner-level website where a user can:
1. Sign up / Login
2. Add their own clothing items to a wardrobe (with an image, category, color, occasion)
3. Pick an occasion (Casual, Office, Party, Wedding, Festive, Workout) and get outfit
   ideas built ONLY from their own wardrobe items — no AI, just simple matching rules.

This project is built with:
- **M**ongoDB - database
- **E**xpress - backend web framework
- **R**eact - frontend
- **N**ode.js - backend runtime

It is written in a beginner-friendly way (simple code, lots of comments) since it is
meant for someone learning MERN.

---

## Project structure

```
outfit-planner/
  backend/       -> Express + MongoDB API
  frontend/      -> React app
```

---

## How the "outfit matching" logic works

There is no AI involved — it is simple, rule-based JavaScript, which is perfect for
a beginner project:

1. Every clothing item you save has a `category` (Top, Bottom, Dress, Shoes, Bag,
   Accessory), a `color`, and an `occasion`.
2. When you pick an occasion on the "Create Outfit" page, the backend grabs every
   item you own tagged with that occasion.
3. It then tries pairing every Top with every Bottom, and checks a simple
   "which colors go well together" chart (see `colorMatches` in
   `backend/routes/outfitRoutes.js`).
4. If the colors match, it builds an outfit and also attaches one Shoe, one Bag,
   and one Accessory (if you have any saved for that occasion).
5. Dresses are shown as their own separate outfit option.

You can open `backend/routes/outfitRoutes.js` and tweak the `colorMatches` object
to add more colors or change the pairing rules.

---

## Setup instructions

### 1. Install MongoDB

You can either:
- Install MongoDB locally: https://www.mongodb.com/try/download/community, OR
- Use a free MongoDB Atlas cloud database: https://www.mongodb.com/cloud/atlas

Either way, you'll end up with a connection string that looks like:
`mongodb://127.0.0.1:27017/outfit-planner` (local) or
`mongodb+srv://username:password@cluster.mongodb.net/outfit-planner` (Atlas)

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open the new `.env` file and paste in your MongoDB connection string and a random
JWT_SECRET (any long random text works).

Then start the backend:

```bash
npm start
```

You should see:
```
MongoDB connected successfully
Server is running on http://localhost:5000
```

### 3. Frontend setup

Open a **second terminal window** (keep the backend running in the first one):

```bash
cd frontend
npm install
npm start
```

This will open the website automatically at `http://localhost:3000`.

---

## Using the site

1. Go to `http://localhost:3000` — you'll land on the Login page.
2. Click "Sign up" to create an account.
3. Go to "My Wardrobe" and click "+ Add Item" to save clothes you own.
   - For the image, paste any image link (for example, right-click an image on
     Google Images or Pinterest and choose "Copy image address").
4. Add a few Tops, Bottoms, Shoes, Bags and Accessories, all tagged with the same
   occasion (e.g. "Casual").
5. Go to "Create Outfit", pick "Casual", and click "Find Outfit Ideas" — you'll see
   outfit cards built from your own wardrobe!

---

## Ideas to improve this project later (once you're comfortable)

- Add real image uploads instead of pasting image links (using something like
  Multer + Cloudinary).
- Let users "save" or "favourite" a generated outfit so it shows up on the Home page.
- Add more colors and smarter matching rules.
- Add a "My Saved Outfits" page (the schema is already ready to be extended for this).
- Add form validation messages that look nicer.

