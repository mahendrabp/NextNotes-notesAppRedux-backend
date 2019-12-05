const conn = require('../configs/database');
const moment = require('moment');

exports.getNote = (req, res) => {};
exports.getNoteById = (req, res) => {};
exports.insertNote = (req, res) => {
  let { title, note, id_category } = req.body;
  let created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  if (
    typeof note == 'undefined' ||
    typeof id_category == 'undefined' ||
    typeof title == 'undefined' ||
    note == '' ||
    note == null ||
    id_category == '' ||
    id_category == null
  ) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: 'field tidak boleh kosong'
    });
  } else {
    let sql = `INSERT INTO data_note set title=?,note=?,id_category=?,created_at=?`;
    conn.query(
      sql,
      [title, note, id_category, created_at],
      (err, rows, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
          res.status(200).json({
            status: 200,
            error: false,
            message: 'berhasil menambah catatan',
            data: rows
          });
        }
      }
    );
  }
};
exports.updateNote = (req, res) => {};
exports.deleteNote = (req, res) => {};
