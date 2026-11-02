# my-wadrobe-project
A web-based Wardrobe Management System that helps users organize clothing digitally by uploading or capturing photos, categorizing items, and managing details like colour, season, brand, and occasion.  **Tech Stack:** HTML, CSS, JavaScript, Node.js, Express.js, EJS, MongoDB, and Multer.
# SmartWardrobe
React (Vite) + Express + MongoDB. No EJS.
## Run
1. Start MongoDB locally (or use Atlas).
2. `cd server && cp .env.example .env && npm install && npm run seed && npm run dev`
3. `cd client && npm install && npm run dev` then open http://localhost:5173
Admin login after seeding: admin@smartwardrobe.com / admin123 (change it).
## Notes
- Weather suggestions call the free Open-Meteo API from the browser; allow location access.
- Test payment mode only marks the order paid; no real gateway is connected.
- Uploaded images are saved in `server/uploads`.
