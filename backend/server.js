// Server.js visada yra pagrindinis failas, kuris paleidzia serveri ir nukreipia marstutus i atitinkamus failus
const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const app = express();
const PORT = 3000;

// Cors - leidzia siusti API uzklausas is kito domeno pvz. localhost:3000 -> localhost:5173
app.use(cors());
app.use(express.json());
// Nukreipiame visas API uzklausas, kurios prasideda /api/cars i carRoutes faila,
// kuris toliau tvarkys uzklausas susijusias su automobiliais.
// Nukreipiame visas uzklausas, kurios prasideda /api/cars i carRoutes faila, kuris toliau tvarkys uzklausas susijusias su automobiliais.
app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
