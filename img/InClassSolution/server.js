// import dependencies
const express = require("express");

// set up express app & PORT
const app = express();
const PORT = 3000;

// set up express middleware to handle incoming data (POST data)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// import html and api routes and execute functions that create them
// see html-routes.js and api-routes.js for more info
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// turn server on
app.listen(PORT, () => console.log(`🌎 You're now listening on http://localhost:${PORT}`));