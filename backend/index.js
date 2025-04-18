const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Test route
app.get("/api", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
