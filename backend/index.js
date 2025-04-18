const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // to parse JSON request bodies


//Import routes
app.use("/api/patients", require("./routes/patients"));
app.use("/api/medicaments", require("./routes/medicaments"));
app.use("/api/allergies", require("./routes/allergies"));
app.use("/api/patient-medicaments", require("./routes/patientMedicaments"));
app.use("/api/patient-allergies", require("./routes/patientAllergies"));




// Test route
app.get("/api", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// Connect to MongoDB
mongoose.connect('mongodb+srv://abdelrahmanmhamdy:dodokoka@cluster0.h2ltp2h.mongodb.net/DB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connecté à MongoDB avec succès!");
})
.catch((err) => {
  console.error("Erreur de connexion à MongoDB: ", err);
});
