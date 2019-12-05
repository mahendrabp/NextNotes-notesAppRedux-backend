const conn = require('../configs/database');

exports.getCategory = (req, res) => {
  const select = req.query.select;
  const searchBy = req.query.search_by;
  const search = req.query.search;
  const id = req.query.id;
  const orderBy = req.query.order_by;
  const sort = req.query.sort;

  const page = req.query.page;
  const limit = req.query.limit;

  let end = (page || 1) * (limit || 5);
  let start = end - (limit || 5);

  let sql = '';
  const table = 'category';

  sql = select
    ? sql.concat(`SELECT ${select} FROM ${table} `)
    : sql.concat(`SELECT * FROM ${table} `);

  conn.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.length);
      if (rows.length > 0) {
        res.status(200).json({
          status: 200,
          error: false,
          message: 'berhasil mendapatkan category',
          data: rows
        });
      } else {
        res.status(400).json({
          status: 400,
          error: true,
          message: 'kategori tidak ditemukan'
          //   data: rows
        });
      }
    }
  });
};

exports.getCategoryById = (req, res) => {};
exports.insertCategory = (req, res) => {
  let { name, pict } = req.body;

  if (typeof name == undefined || name == '' || name == null) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: 'nama tidak boleh kosong'
    });
  } else if (typeof pict == undefined || pict == '' || pict == null) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: 'gambar tidak boleh kosong'
    });
  } else {
    conn.query(
      `INSERT INTO category set name=?, pict=?`,
      [name, pict],
      (err, rows, field) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: true,
            message: 'nama tidak boleh kosong',
            data: res
          });
          throw err;
        } else {
          let sql = `SELECT * FROM category ORDER BY category.id DESC LIMIT 1`;
          conn.query(sql, (err, rows, field) => {
            if (err) {
              res.status(400).json({
                status: 400,
                error: true,
                message: 'nama tidak boleh kosong',
                data: res
              });
              throw err;
            } else {
              res.status(200).json({
                status: 200,
                error: false,
                message: 'berhasil menambah category',
                data: rows
              });
            }
          });
        }
      }
    );
  }
};
exports.updateCategory = (req, res) => {
  let { id } = req.params;
  let { name, pict } = req.body;

  if (typeof name == undefined || name == '' || name == null) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: 'nama tidak boleh kosong'
    });
  } else if (typeof pict == undefined || pict == '' || pict == null) {
    return res.status(400).json({
      status: 400,
      error: true,
      message: 'gambar tidak boleh kosong'
    });
  } else {
    let sql = `UPDATE category SET name=?, pict=? WHERE id=?`;
    conn.query(sql, [name, pict, id], (err, rows, field) => {
      if (err) {
        console.log(err);
      } else {
        conn.query(
          'SELECT * FROM category WHERE id =?',
          [id],
          (err, rows, field) => {
            console.log(rows);
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({
                status: 200,
                error: false,
                message: 'berhasil mengedit category',
                data: rows
              });
            }
          }
        );
      }
    });
  }
};
exports.deleteCategory = (req, res) => {
  conn.query(
    `delete from category where id =?`,
    [req.params.id],
    (err, rows, field) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: true,
          message: 'gagal hapus kategori'
        });
      } else {
        if (rows.affectedRows == 0) {
          return res.status(400).json({
            status: 400,
            error: true,
            message: 'id tidak ditemukan'
          });
        } else {
          res.status(200).json({
            status: 200,
            error: false,
            message: `berhasil menghapus kategori ${req.params.id}`,
            data: rows
          });
        }
      }
    }
  );
};
