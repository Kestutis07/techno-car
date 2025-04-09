// Server.js visada yra pagrindinis failas, kuris paleidžia serverį ir nukreipia maršrutus į atitinkamus failus
const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const app = express();
const PORT = 3000;

// Cors - leidžia siusti API užklausas iš kito domeno pvz. localhost:3000 -> localhost:5173
app.use(cors());
app.use(express.json());
// Nukreipiame visas API užklausas, kurios prasideda /api/cars į carRoutes failą, kuris toliau tvarkys užklausas susijusias su automobiliais.
app.use('/api/cars', carRoutes);
app.use('/api/reviews', reviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
