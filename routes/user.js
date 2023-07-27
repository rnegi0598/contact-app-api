const express = require("express");

const { registerUser, loginUser, currentUser } = require("../controllers/user");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
