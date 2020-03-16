const checkFileType = (file, cb) => {
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //check mime
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only')
  }
}

module.exports = checkFileType;