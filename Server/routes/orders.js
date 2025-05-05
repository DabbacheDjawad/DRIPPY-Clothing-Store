
const express = require("express");
const router = express.Router();
const {
    getAllOrders,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orders");
const { authMiddleware, adminAuth } = require("../middleware/authentication");

router.get("/", authMiddleware , getAllOrders)
router.post("/" , authMiddleware , createOrder)
router.route("/:id").patch(updateOrder).delete(deleteOrder , authMiddleware , adminAuth);
router.route("/me").get(getCurrentUserOrders , authMiddleware);

module.exports = router;