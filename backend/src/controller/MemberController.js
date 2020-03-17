const mysql = require('../dbconfig');
const member = require('../model/MemberModel');
const bcrypt = require('bcryptjs');

exports.memberShow = (req, res) => {
  mysql.execute(member.members, [], (err, result, field) => {
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

exports.memberById = (req, res) => {
  const { member_id } = req.params
  mysql.execute(member.member_by_id, [member_id], (err, result, field) => {
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

exports.insertMember = (req, res) => {
  const { username, nama_anggota, gender, no_telp, alamat, email, password } = req.body
  let enc_pass = bcrypt.hashSync(password)
  mysql.execute(member.insert_member, [username, nama_anggota, gender, no_telp, alamat, email, enc_pass], (err, result, field) => {
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

exports.updateMember = (req, res) => {
  const { username, nama_anggota, gender, no_telp, alamat, email, password } = req.body
  const { member_id } = req.params
  mysql.execute(member.update_member, [username, nama_anggota, gender, no_telp, alamat, email, password, member_id], (err, result, field) => {
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

exports.deleteMember = (req, res) => {
  const { member_id } = req.params
  mysql.execute(member.delete_member, [member_id], (err, result, field) => {
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