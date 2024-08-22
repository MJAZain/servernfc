const db = require('../config/db');
const moment = require('moment');

exports.uploadWeldingData = (req, res) => {
  console.log('Received welding data upload request');
  console.log('Request body:', req.body);

  const {
    root1, root2, root3, root4, weldingcol, root_wp, root_batchno, filler1, filler2, filler3, filler4,
    filler_wp, filler_batchno, cover1, cover2, cover3, cover4, cover_wp, cover_batchno, wps_id, name, id_pipe
  } = req.body;

  const root_date = moment().format('YYYY-MM-DD');
  const filler_date = moment().format('YYYY-MM-DD');
  const cover_date = moment().format('YYYY-MM-DD');
  const welding_date = new Date();

  console.log('Generated dates:', { root_date, filler_date, cover_date, welding_date });

  const query = `INSERT INTO welding (root1, root2, root3, root4, weldingcol, root_wp, root_batchno, 
  root_date, filler1, filler2, filler3, filler4, filler_wp, filler_batchno, filler_date, cover1, cover2, 
  cover3, cover4, cover_wp, cover_batchno, cover_date, wps_id, name, id_pipe, welding_date) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [root1, root2, root3, root4, weldingcol, root_wp, root_batchno, root_date, 
    filler1, filler2, filler3, filler4, filler_wp, filler_batchno, filler_date, cover1, cover2, 
    cover3, cover4, cover_wp, cover_batchno, cover_date, wps_id, name, id_pipe, welding_date
  ];

  console.log('Prepared query:', query);
  console.log('Query values:', values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error', details: err });
    } else {
      console.log('Welding data uploaded successfully, ID:', result.insertId);
      res.status(201).json({ message: 'Welding data uploaded successfully', weldingId: result.insertId });
    }
  });
};

