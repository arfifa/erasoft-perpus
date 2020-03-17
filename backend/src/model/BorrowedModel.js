module.exports = {
  borrowed: `SELECT * FROM peminjaman JOIN anggota ON peminjaman.id_anggota = anggota.id_anggota JOIN buku ON peminjaman.id_buku = buku.id_buku `,
  insert_borrowed: 'INSERT INTO peminjaman (tanggal_input, id_anggota, id_buku, tgl_pinjam, tgl_kembali, denda, tgl_pengembalian, totaldenda, status_peminjaman, status_pengembalian) VALUES (?,?,?,?,?,?,?,?,?,?)',
  update_borrowed: 'UPDATE peminjaman SET tgl_pengembalian=?, totaldenda=?, status_peminjaman=?, status_pengembalian=? WHERE id_pinjam=?',
  delete_borrowed: 'DELETE FROM peminjaman WHERE id_pinjam=?'
}