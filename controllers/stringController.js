const db = require('../config/db');

exports.addStringing = (req, res) => {
  console.log('Received request to add stringing data');
  console.log('Request body:', req.body);

  const { PWCBS, id_location, status_location, activity_name, activity_date, loc_name, name, id_pipe } = req.body;
  const stringing_date = new Date(); // Current date

  const query = 'INSERT INTO stringing SET ?';
  const data = { PWCBS, id_location, status_location, activity_name, activity_date, loc_name, name, id_pipe, stringing_date };

  console.log('Generated stringing data:', data);
  console.log('SQL Query:', query);

  db.query(query, data, (err, result) => {
    if (err) {
      console.error('Error inserting stringing data:', err);
      return res.status(500).send({ error: 'Failed to insert stringing data', details: err });
    } else {
      console.log('Stringing data submitted successfully:', result);
      return res.send('Stringing data submitted successfully');
    }
  });
};
