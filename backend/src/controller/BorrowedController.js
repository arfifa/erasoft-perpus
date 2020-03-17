const mysql = require('../dbconfig');
const borrowed = require('../model/BorrowedModel');
const book = require('../model/BookModel');

exports.borrowedShow = (req, res) => {
  mysql.execute(borrowed.borrowed, [], (err, result, field) => {
    if (err === null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false
      })
    }
  })
}

exports.borrowedById = (req, res) => {
  const { borrowed_id } = req.params
  mysql.execute(borrowed.borrowed_by_id, [borrowed_id], (err, result, field) => {
    if (err === null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: err
      })
    }
  })
}

exports.insertBorrowed = (req, res) => {
  const { id_anggota, id_buku, tgl_pinjam, tgl_kembali, denda } = req.body
  const tanggal_input = new Date()
  const tgl_pengembalian = 0
  const totaldenda = 0
  const status_peminjaman = 1
  const status_pengembalian = 2
  mysql.execute(book.update_number_of_books_min, [id_buku], (err, result, field) => {
    if (err === null) {
      mysql.execute(borrowed.insert_borrowed, [tanggal_input, id_anggota, id_buku, tgl_pinjam, tgl_kembali, denda, tgl_pengembalian, totaldenda, status_peminjaman, status_pengembalian], (err, result, field) => {
        if (err === null) {
          res.send({
            success: true,
            result: result
          })
        } else {
          res.send({
            success: false,
            msg: err
          })
        }
      })
    } else {
      res.send({
        success: false,
        msg: err
      })
    }
  })
}

exports.updateBorrowed = (req, res) => {
  const { tgl_kembali, denda, id_buku } = req.body
  const { borrowed_id } = req.params
  const tgl_pengembalian = new Date()
  let oneDay = 24 * 60 * 60 * 1000
  const diffDay = Math.ceil(Math.round((tgl_pengembalian.getTime() - Date.parse(tgl_kembali)) / (oneDay)))
  if (diffDay > 0) {
    var totaldenda = diffDay * denda
  } else {
    var totaldenda = 0
  }
  const status_peminjaman = 2
  const status_pengembalian = 1
  mysql.execute(book.update_number_of_books_plus, [id_buku], (err, result, field) => {
    if (err === null) {
      mysql.execute(borrowed.update_borrowed, [tgl_pengembalian, totaldenda, status_peminjaman, status_pengembalian, borrowed_id], (err, result, field) => {
        if (err === null) {
          res.send({
            success: true,
            result: result
          })
        } else {
          res.send({
            success: false,
            msg: err
          })
        }
      })
    } else {
      res.send({
        success: false,
        msg: err
      })
    }
  })
}

exports.deleteBorrowed = (req, res) => {
  const { borrowed_id } = req.params
  mysql.execute(borrowed.delete_borrowed, [borrowed_id], (err, result, field) => {
    if (err === null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: err
      })
    }
  })
}