-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 17 Mar 2020 pada 15.05
-- Versi Server: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erasoft-perpus`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `anggota`
--

CREATE TABLE `anggota` (
  `id_anggota` int(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nama_anggota` varchar(45) NOT NULL,
  `gender` enum('Laki-Laki','Perempuan') NOT NULL,
  `no_telp` varchar(15) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(35) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `anggota`
--

INSERT INTO `anggota` (`id_anggota`, `username`, `nama_anggota`, `gender`, `no_telp`, `alamat`, `email`, `password`) VALUES
(11, 'imam', 'Imam Nawawi', 'Laki-Laki', '087829398630', 'jl H Isa no 1 Rengas Ciputat Timur', 'imam.imw@bsi.ac.id', '01cfcd4f6b8770febfb40cb906715822'),
(12, 'maruloh', 'Maruloh', 'Laki-Laki', '081519940383', 'Pedongkelan', 'maruloh.mru@gmail.com', '8d57dfe7398336d6b9164b4d62b6b42b'),
(13, 'rahman', 'Arfifa Rahman', 'Laki-Laki', '8424234', 'rawa lumbu', 'arfifarahman509@gmail.com', '202cb962ac59075b964b07152d234b70'),
(16, 'Anwar', 'Anwar Hanif', 'Laki-Laki', '048382942423', 'Jl. Akun', 'akun@mail.com', 'akun'),
(23, 'rahmanwu', 'Arfifa Rahman', 'Laki-Laki', '081934238829', 'Tangerang Selatan', 'arfifarahman@gmail.com', '$2a$10$THN4y7YEz7tJJ1LhzC5U.OS6uvDt');

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `id_buku` int(5) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `judul_buku` varchar(50) NOT NULL,
  `pengarang` varchar(35) NOT NULL,
  `thn_terbit` date NOT NULL,
  `penerbit` varchar(50) NOT NULL,
  `isbn` varchar(25) NOT NULL,
  `jumlah_buku` int(3) NOT NULL,
  `lokasi` enum('Rak 1','Rak 2','Rak 3') NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `tgl_input` date NOT NULL,
  `status_buku` enum('Tersedia','Tidak Tersedia') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`id_buku`, `id_kategori`, `judul_buku`, `pengarang`, `thn_terbit`, `penerbit`, `isbn`, `jumlah_buku`, `lokasi`, `gambar`, `tgl_input`, `status_buku`) VALUES
(2, 3, 'Mahir Pemrograman Web Dengan PHP1', 'Adri Kusuma Wardana', '2014-03-18', 'Elex Media ', ' 65412345', 37, 'Rak 1', 'gambar1539746444.jpg', '2019-12-15', 'Tersedia'),
(3, 2, 'Mahir  Berhitung dan Mahir Mewarnai', 'Akhmad Rahmat', '2014-03-03', 'CV.Indo Kreasi', '7623447342', 1, 'Rak 3', 'gambar1539746653.jpg', '2019-05-01', 'Tersedia'),
(4, 1, 'Dasar Dasar Fisika', 'Kurnia Sandi', '2013-04-04', 'Wacana Ria', '233214414', -3, 'Rak 2', 'gambar1539746772.jpg', '2018-07-24', 'Tersedia'),
(5, 8, 'Mahir Bahasa Inggris', 'Aliuddin', '2013-05-05', 'CV.Indo Kreasi', '3553234454', 5, 'Rak 1', 'gambar1539746902.jpg', '2018-10-17', 'Tersedia'),
(6, 4, 'Public Speaking', 'Pambudi Prasetyo', '2015-06-06', 'Aldi Pustaka', '843594759', 7, 'Rak 2', 'gambar1539747050.jpg', '2019-01-24', 'Tersedia'),
(7, 3, 'Trik SQL', 'Ahdim Makaren', '2014-07-07', 'Wacana Ria', '54234762', 4, 'Rak 1', 'gambar1539747068.jpg', '2019-05-01', 'Tersedia'),
(8, 6, 'Kemurnian Agama', 'Pambudi Prasetyo', '2014-08-08', 'Aldi Pustaka', '980958607', 2, 'Rak 3', 'gambar1539747079.jpg', '2018-07-24', 'Tersedia'),
(9, 1, 'Mikrokontroler', 'Ahdim Makaren', '2012-09-09', 'Wacana Ria', '12121314', 11, 'Rak 2', 'gambar1539747096.jpg', '2018-04-11', 'Tersedia'),
(10, 1, '24 Jam Belajar FrameWork', 'Rudi Hartono', '2017-03-02', 'Unjung Pena ', ' 12345345', 10, 'Rak 3', 'gambar1539747110.jpg', '2019-12-15', 'Tersedia'),
(11, 2, 'JavaScript uncover', 'Andre Pratama', '2015-03-12', 'DuniaIKomputer ', ' 9087654', 6, 'Rak 1', 'gambar1539747128.jpg', '2019-12-15', 'Tersedia'),
(65, 3, 'Java Script', 'Rahma', '2020-03-01', 'Erasoft', '342425235897', 6, 'Rak 1', 'gambar1584367662437.jpg', '2020-03-16', 'Tersedia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id_pinjam` int(5) NOT NULL,
  `tanggal_input` datetime NOT NULL,
  `id_anggota` int(5) NOT NULL,
  `id_buku` int(5) NOT NULL,
  `tgl_pinjam` date NOT NULL,
  `tgl_kembali` date NOT NULL,
  `denda` double NOT NULL,
  `tgl_pengembalian` date NOT NULL,
  `totaldenda` double NOT NULL DEFAULT '0',
  `status_peminjaman` enum('Sedang Dipinjam','Selesai') DEFAULT NULL,
  `status_pengembalian` enum('Sudah','Belum') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `peminjaman`
--

INSERT INTO `peminjaman` (`id_pinjam`, `tanggal_input`, `id_anggota`, `id_buku`, `tgl_pinjam`, `tgl_kembali`, `denda`, `tgl_pengembalian`, `totaldenda`, `status_peminjaman`, `status_pengembalian`) VALUES
(14, '2020-03-17 20:57:04', 11, 2, '2020-03-10', '2020-03-15', 1000, '0000-00-00', 0, 'Sedang Dipinjam', 'Belum'),
(11, '2020-03-17 17:56:01', 11, 2, '2020-03-17', '2020-03-19', 1000, '2020-03-17', 0, 'Selesai', 'Sudah'),
(12, '2020-03-17 20:55:36', 11, 2, '2020-03-20', '2020-03-20', 1000, '2020-03-17', 0, 'Selesai', 'Sudah'),
(13, '2020-03-17 20:56:22', 11, 2, '2020-03-10', '2020-03-15', 1000, '2020-03-17', 3000, 'Selesai', 'Sudah');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id_anggota`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id_pinjam`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota`
--
ALTER TABLE `anggota`
  MODIFY `id_anggota` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id_buku` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id_pinjam` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
