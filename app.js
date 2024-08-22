const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const fitupRoutes = require('./routes/fitupRoutes');
const pipeRoutes = require('./routes/pipeRoutes');
const weldRoutes = require('./routes/weldRoutes');
const searchRoutes = require('./routes/searchRoutes');
const stringRoutes = require('./routes/stringRoutes');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/auth', authRoutes);
app.use('/fitup', fitupRoutes);
app.use('/pipe', pipeRoutes);
app.use('/welding', weldRoutes);
app.use('/search', searchRoutes);
app.use('/string', stringRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
