const router = require('express').Router();
const multer = require('multer');
const ImageStorages = require('../helper/ImageStorages');
const checkFileType = require('../helper/FilterImages');
const BookController = require('../controller/BookController');

const uploadImageBook = multer({
  storage: ImageStorages.storageBooks,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('gambar')

router.get("/", BookController.bookShow)
router.get("/:book_id", BookController.bookById)
router.post("/insert", uploadImageBook, BookController.insertBook)
router.put("/:book_id/update", uploadImageBook, BookController.updateBook)
router.delete("/:book_id/:image/delete", BookController.deleteBook)


module.exports = router;