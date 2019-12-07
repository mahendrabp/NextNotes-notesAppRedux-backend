const conn = require('../configs/database');
const moment = require('moment');

exports.getNote = function(req, res) {
  let params = {
    page: parseInt(req.query.page) || 1,
    search: req.query.search || '',
    sort: req.query.sort || 'DESC',
    limit: parseInt(req.query.limit) || 10,
    category: req.query.category || ''
  };
  let conState = params.category == '' ? 'OR' : 'AND';
  let totalData;
  let totalPage;
  let offset = (params.page - 1) * params.limit;

  conn.query(
    `select count(*) 'total' from notes inner join category  on category.id = notes.id_category where title like '%${params.search}%'   `,
    function(error, rows, field) {
      totalData = rows[0].total;
      totalPage = Math.ceil(Number(totalData) / params.limit);
    }
  );
  // backup = ${conState} category.name='${params.category}' order by updated_at ${params.sort} limit ${params.limit} offset ${offset}
  conn.query(
    `select title,note,category.name as category, DATE_FORMAT(updated_at, '%d/%m/%Y %h:%i:%s') as 'datetime',category.id as 'idCategory',notes.id as 'noteId' from notes inner join category  on category.id = notes.id_category where title like '%${params.search}%' ${conState} category.name='${params.category} order by updated_at ${params.sort} limit ${params.limit} offset ${offset}';`,
    function(error, rows, field) {
      if (error) {
        throw error;
      } else {
        console.log(rows.length);
        if (rows.length == 0) {
          res.status(400).json({
            status: 400,
            error: false,
            message: 'gagal',
            data: {
              data: rows,
              totalData: totalData,
              page: params.page,
              totalPage: totalPage,
              limit: params.limit,
              search: params.search,
              selectedCategory: params.category
            }
          });
          // response.pagination(
          //   totalData,
          //   params.page,
          //   totalPage,
          //   params.limit,
          //   rows,
          //   res,
          //   params.search,
          //   params.category,
          // );
        } else {
          res.status(200).json({
            status: 200,
            error: false,
            message: 'berhasil',
            data: {
              data: rows,
              totalData: totalData,
              page: params.page,
              totalPage: totalPage,
              limit: params.limit,
              search: params.search,
              selectedCategory: params.category
            }
          });
          // response.pagination(
          //   totalData,
          //   params.page,
          //   totalPage,
          //   params.limit,
          //   rows,
          //   res,
          //   params.search,
          //   params.category
          // );
        }
      }
    }
  );
};
// exports.getNote = function(req, res) {
//   let params = {
//     page: parseInt(req.query.page) || 1,
//     search: req.query.search || '',
//     sort: req.query.sort || 'DESC',
//     limit: parseInt(req.query.limit) || 10,
//     category: req.query.category || ''
//   };
//   let conState = params.category == '' ? 'OR' : 'AND';
//   let totalData;
//   let totalPage;
//   let offset = (params.page - 1) * params.limit;

//   conn.query(
//     `select count(*) 'total' from notes inner join category  on category.id = notes.id_category where title like '%${params.search}%' ${conState} category.name='${params.category}'  `,
//     function(error, rows, field) {
//       totalData = rows[0].total;
//       totalPage = Math.ceil(Number(totalData) / params.limit);
//     }
//   );

//   // let sql = `select title,note,category.name 'category', updated_at,category.id as 'idCategory',notes.id as 'noteId' from notes inner join category  on category.id = notes.id_category where title like '%${params.search}%'  ${conState} category.name='${params.category}' order by updated_at ${params.sort} limit ${params.limit} offset ${offset} ;`;
//   let sql = `select title,note,category.name as'category', updated_at,category.id as 'idCategory',notes.id as 'noteId' from notes inner join category  on category.id = notes.id_category where title like '%${params.search}%' ${conState} category.name='${params.category}' order by updated_at ${params.sort} limit ${params.limit} offset ${offset} ;`;
//   conn.query(sql, function(error, rows, field) {
//     if (error) {
//       throw error;
//     } else {
//       if (rows.length == 0) {
//         console.log(rows.length);
//         res.status(400).json({
//           status: 400,
//           error: false,
//           message: 'gagal',
//           data: {
//             data: rows,
//             totalData: totalData,
//             page: params.page,
//             totalPage: totalPage,
//             limit: params.limit,
//             search: params.search,
//             selectedCategory: params.category
//           }
//         });
//       } else {
//         console.log(rows);
//         res.status(200).json({
//           status: 200,
//           error: false,
//           message: 'berhasil',
//           data: {
//             data: rows,
//             totalData: totalData,
//             page: params.page,
//             totalPage: totalPage,
//             limit: params.limit,
//             search: params.search,
//             selectedCategory: params.category
//           }
//         });
//       }
//     }
//   });
// };
exports.getNoteById = (req, res) => {};
exports.insertNote = (req, res) => {
  let { title, note, id_category } = req.body;
  let created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

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
    let sql = `INSERT INTO notes set title=?,note=?,id_category=?,created_at=?,updated_at=?`;
    conn.query(
      sql,
      [title, note, id_category, created_at, updated_at],
      (err, rows, field) => {
        if (err) {
          throw err;
        } else {
          // console.log(rows);
          // conn.query(`select title,note,category.name 'category', DATE_FORMAT(time, '%d/%m/%Y %h:%i:%s') as 'datetime',category.id as 'idCategory',notes.id as 'noteId' from notes inner join category  on category.id = notes.category order by time DESC limit 1`
          // res.status(200).json({
          //   status: 200,
          //   error: false,
          //   message: 'berhasil menambah catatan',
          //   data: rows
          // });
          conn.query(
            `select title,note,category.name 'category', DATE_FORMAT(updated_at, '%d/%m/%Y %h:%i:%s') as 'datetime',category.id as 'idCategory',notes.id as 'noteId' from notes inner join category  on category.id = notes.id_category order by updated_at DESC limit 1`,
            function(error, rows, field) {
              if (error) {
                console.log(error);
              } else {
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
      }
    );
  }
};
exports.updateNote = (req, res) => {
  let { title, note, id_category } = req.body;
  let updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let id = req.params.id;
  let sql = `UPDATE notes SET `;
  sql = title ? sql.concat(`title="${title}" `) : sql;
  sql = note && title ? sql.concat(`, `) : sql;
  sql = note ? sql.concat(`note="${note}" `) : sql;
  sql = note && id_category ? sql.concat(`, `) : sql;
  sql = id_category ? sql.concat(`id_category="${id_category}" `) : sql;
  sql = sql.concat(`WHERE id="${id}" `);

  conn.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
    } else if (rows.affectedRows == 0) {
      console.log(rows.affectedRows);
    } else {
      conn.query(`SELECT * FROM notes WHERE ID = ${id}`, (err, rows, field) => {
        if (err) {
          console.log(err);
        } else {
          conn.query(
            `select title,note,category.name 'category', DATE_FORMAT(updated_at, '%d/%m/%Y %h:%i:%s') as 'datetime',category.id as 'idCategory',notes.id as 'noteId' from notes inner join category  on category.id = notes.id_category WHERE notes.id=${id} order by updated_at DESC limit 1`,
            function(err, rows, field) {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({
                  status: 200,
                  error: false,
                  message: 'berhasil edit catatan',
                  data: rows
                });
              }
            }
          );
          // res.status(200).json({
          //   status: 200,
          //   error: false,
          //   message: 'berhasil menambah catatan',
          //   data: rows
          // });
        }
      });
    }
  });
};
exports.deleteNote = (req, res) => {
  let id = req.params.id;
  conn.query(`delete from notes where id =?`, [id], (err, rows, field) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'gagal hapus catatan'
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
          data: {
            noteId: id
          },
          error: false,
          rows: rows,
          message: 'data deleted successfully!'
        });
      }
    }
  });
};
