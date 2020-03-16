const multer = require('multer');
path = require('path');

module.exports = {
  storageBooks: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/ImagesBook')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
  }),
}