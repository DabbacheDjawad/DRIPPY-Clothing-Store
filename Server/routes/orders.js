
const express = require("express");
const router = express.Router();
const {
    getAllOrders,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orders");

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").patch(updateOrder).delete(deleteOrder);
router.route("/me").get(getCurrentUserOrders);

module.exports = router;