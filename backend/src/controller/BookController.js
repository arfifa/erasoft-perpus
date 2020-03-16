require('dotenv').config();
const mysql = require('../dbconfig');
const book = require('../model/BookModel');

exports.bookShow = (req, res) => {
  mysql.execute(book.books, [], (err, result, field) => {
    if (err === null) {
      console.log(err)
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

exports.bookById = (req, res) => {
  const { book_id } = req.params
  mysql.execute(book.book_by_id, [book_id], (err, result, field) => {
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

exports.insertBook = (req, res) => {
  const { id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, status_buku } = JSON.parse(req.body.data)
  const gambar = req.file.filename
  const tgl_input = new Date()
  mysql.execute(book.insert_book, [id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, gambar, tgl_input, status_buku], (err, result, field) => {
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

exports.updateBook = (req, res) => {
  const { id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, status_buku } = req.body
  const gambar = req.file.filename
  const { book_id } = req.params
  const tgl_input = new Date()
  mysql.execute(book.update_book, [id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, gambar, tgl_input, status_buku, book_id], (err, result, field) => {
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

exports.deleteBook = (req, res) => {
  const { book_id } = req.params
  mysql.execute(book.delete_book, [book_id], (err, result, field) => {
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