const db = require('../config/db');

exports.addFitup = (req, res) => {
  console.log('Received request to add fitup data');
  console.log('Request body:', req.body);

  const { id_pipe, fitup_result, heat1, heat2, name } = req.body;
  const fitup_date = new Date(); // Current date

  const query = 'INSERT INTO fitup SET ?';
  const data = { id_pipe, fitup_date, fitup_result, heat1, heat2, name };

  console.log('Generated fitup data:', data);
  console.log('SQL Query:', query);

  db.query(query, data, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    } else {
      console.log('Data added successfully:', result);
      return res.send('Data added...');
    }
  });
};


