const {Router} = require("express");
const {allUsers, registerUser} = require("../controllers/UserControllers");
const router = Router();

router.get("/get", allUsers);
router.post("/post", registerUser);

module.exports = router;