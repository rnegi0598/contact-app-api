const express = require("express");
const {
  getContact,
  getContacts,
  postContacts,
  updateContact,
  deleteContacts,
} = require("../controllers/contact");

const router = express.Router();

router.get("/", getContacts);
router.post("/", postContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContacts);

module.exports = router;
