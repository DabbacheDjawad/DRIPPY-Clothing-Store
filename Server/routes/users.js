
const express = require("express");
const router = express.Router();
const {singleUpload} = require("../middleware/upload")
const {
    getAllUsers,
    getUser,
    deleteUser,
    BlockUser,
    switchToAdmin,
    getCurrentUser,
    uploadAvatar,
    updateUser
} = require("../controllers/users");

router.route("/").get(getAllUsers)
router.route("/me").get(getCurrentUser);
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser)
router.route("/block/:id").patch(BlockUser);
router.route("/switch/:id").patch(switchToAdmin);
router.post("/avatar" , singleUpload , uploadAvatar);

module.exports = router;