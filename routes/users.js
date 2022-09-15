const router = require("express").Router();
const {create, getAll, getGender, getStyle, getSize} = require("../controllers/usersCtrl");

router.post("/user", create);
router.get("/user/getdata", getAll);
router.get("/user/getgender/:gender", getGender);
router.get("/user/getstyle/:style", getStyle);
router.get("/user/getsize/:size", getSize);

module.exports = router;