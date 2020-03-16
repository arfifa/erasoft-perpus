module.exports = {
  members: `SELECT * FROM anggota`,
  member_by_id: 'SELECT * FROM anggota WHERE id_anggota=?',
  insert_member: 'INSERT INTO anggota (username, nama_anggota, gender, no_telp, alamat, email, password) VALUES (?,?,?,?,?,?,?)',
  update_member: 'UPDATE anggota SET username=?, nama_anggota=?, gender=?, no_telp=?, alamat=?, email=?, password=? WHERE id_anggota=?',
  delete_member: 'DELETE FROM anggota WHERE id_anggota=?'
}