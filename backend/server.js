const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
require('./src/routes/evenement.routes.js')(app);
require('./src/routes/participants.routes.js')(app);
require('./src/routes/lieux.routes.js')(app);

const db = require('./src/database/database');

db.mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

app.get('/', (req, res) => {
  res.send('Support evenements API is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});