const router = require("express").Router();
const {create, getAll, getGender, getStyle, getSize} = require("../controllers/usersCtrl");

// All route must be /api before
router.post("/user", create);
// Get all data with page and per_page
router.get("/user/getdata", getAll);
// Get data by gender men or women
router.get("/user/getgender/:gender", getGender);
// Get data by style ex. blue polka dot or spiderman
router.get("/user/getstyle/:style", getStyle);
// Get data by size x, xs, m, l or xl
router.get("/user/getsize/:size", getSize);

module.exports = router;