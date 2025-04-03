
const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUser,
    createAdmin,
    deleteUser,
    BlockUser
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createAdmin);
router.route("/:id").get(getUser).delete(deleteUser)
router.route("/block/:id").patch(BlockUser);

module.exports = router;