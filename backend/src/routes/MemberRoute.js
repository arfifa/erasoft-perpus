const router = require('express').Router();
const MemberController = require('../controller/MemberController');

router.get("/", MemberController.memberShow)
router.get("/:member_id", MemberController.memberById)
router.post("/insert", MemberController.insertMember)
router.put("/:member_id/update", MemberController.updateMember)
router.delete("/:member_id/delete", MemberController.deleteMember)


module.exports = router;