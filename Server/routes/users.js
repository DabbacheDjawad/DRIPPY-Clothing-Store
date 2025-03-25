
const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUser,
    createAdmin,
    deleteUser
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createAdmin);
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;