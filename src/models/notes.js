const conn = require('../configs/database');

exports.countNotes = (req, res, cb) => {
  const { searchBy, search, id, orderBy, sort } = req.query;
  let select = req.query.select;

  let select_mode = select ? select : ',';
  select = select_mode.split(',');

  let sql = '';

  let loop = [];
  for (let i = 0; i < select.length; i++) {
    let val = select[i];
    switch (val) {
      case 'time':
        loop.push('notes.time');
        break;
      case 'id':
        loop.push('notes.id');
        break;
      case 'title':
        loop.push('notes.title');
        break;
      case 'note':
        loop.push('notes.title');
        break;
      case 'category':
        loop.push('category.name as category');
        break;
    }
  }
};
