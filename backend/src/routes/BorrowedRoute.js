const router = require('express').Router();
const BorrowedController = require('../controller/BorrowedController');

router.get("/", BorrowedController.borrowedShow)
router.get("/:borrowed_id", BorrowedController.borrowedById)
router.post("/insert", BorrowedController.insertBorrowed)
router.put("/:borrowed_id/update", BorrowedController.updateBorrowed)
router.delete("/:borrowed_id/delete", BorrowedController.deleteBorrowed)

module.exports = router;
