const db = require('../config/db');

exports.addPipe = (req, res) => {
  const { id_pipe, spool_no, iso_no, joint_no, pj_code } = req.body;

  const query = 'INSERT INTO pipe SET ?';
  const data = { id_pipe, spool_no, iso_no, joint_no, pj_code };

  db.query(query, data, (err, result) => {
    if (err) {
      console.error('Error inserting pipe data:', err);
      return res.status(500).send({ error: 'Failed to insert pipe data', details: err });
    } else {
      return res.send('Pipe data submitted successfully');
    }
  });
};

exports.checkPipeRegistration = (req, res) => {
  const pipeId = req.params.id;
  console.log('Checking registration for pipe ID:', pipeId);  // Log the pipe ID

  const query = 'SELECT COUNT(*) as count FROM pipe WHERE id_pipe = ?';

  db.query(query, [pipeId], (err, results) => {
    if (err) {
      console.error('Database error:', err);  // Log any database errors
      return res.status(500).json({ error: 'Database error', details: err });
    }

    const isRegistered = results[0].count > 0;
    console.log('Pipe registration status:', isRegistered);  // Log the registration status
    res.status(200).json({ registered: isRegistered });
  });
};
