module.exports = {
  books: `SELECT * FROM buku`,
  book_by_id: 'SELECT * FROM buku WHERE id_buku=?',
  insert_book: 'INSERT INTO buku (id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, gambar, tgl_input, status_buku) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
  update_book: 'UPDATE buku SET id_kategori=?, judul_buku=?, pengarang=?, thn_terbit=?, penerbit=?, isbn=?, jumlah_buku=?, lokasi=?, gambar=?, tgl_input=?, status_buku=? WHERE id_buku=?',
  delete_book: 'DELETE FROM buku WHERE id_buku=?',
  update_number_of_books_min: 'UPDATE buku SET jumlah_buku = jumlah_buku-1 WHERE id_buku=?',
  update_number_of_books_plus: 'UPDATE buku SET jumlah_buku = jumlah_buku+1 WHERE id_buku=?'
}