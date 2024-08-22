const db = require('../config/db');

exports.searchPipesWithHistory = (req, res) => {
  const { spool_no, iso_no, joint_no, pj_code } = req.query;

  let pipeQuery = 'SELECT * FROM pipe WHERE 1=1';
  const pipeParams = [];

  if (spool_no) {
    pipeQuery += ' AND spool_no = ?';
    pipeParams.push(spool_no);
  }
  if (iso_no) {
    pipeQuery += ' AND iso_no = ?';
    pipeParams.push(iso_no);
  }
  if (joint_no) {
    pipeQuery += ' AND joint_no = ?';
    pipeParams.push(joint_no);
  }
  if (pj_code) {
    pipeQuery += ' AND pj_code = ?';
    pipeParams.push(pj_code);
  }

  db.query(pipeQuery, pipeParams, (err, pipeResults) => {
    if (err) {
      console.error('Error searching pipes:', err);
      return res.status(500).json({ error: 'Failed to search pipes', details: err });
    }

    if (pipeResults.length === 0) {
      return res.status(404).json({ error: 'No pipes found' });
    }

    const pipeIds = pipeResults.map(pipe => pipe.id_pipe);
    
    const fitupQuery = 'SELECT * FROM fitup WHERE id_pipe IN (?)';
    const weldingQuery = 'SELECT * FROM welding WHERE id_pipe IN (?)';
    const stringingQuery = 'SELECT * FROM stringing WHERE id_pipe IN (?)';

    db.query(fitupQuery, [pipeIds], (fitupErr, fitupResults) => {
      if (fitupErr) {
        console.error('Error fetching fitup data:', fitupErr);
        return res.status(500).json({ error: 'Failed to fetch fitup data', details: fitupErr });
      }

      db.query(weldingQuery, [pipeIds], (weldingErr, weldingResults) => {
        if (weldingErr) {
          console.error('Error fetching welding data:', weldingErr);
          return res.status(500).json({ error: 'Failed to fetch welding data', details: weldingErr });
        }

        db.query(stringingQuery, [pipeIds], (stringingErr, stringingResults) => {
          if (stringingErr) {
            console.error('Error fetching stringing data:', stringingErr);
            return res.status(500).json({ error: 'Failed to fetch stringing data', details: stringingErr });
          }

          res.status(200).json({
            pipes: pipeResults,
            fitup: fitupResults,
            welding: weldingResults,
            stringing: stringingResults,
          });
        });
      });
    });
  });
};
