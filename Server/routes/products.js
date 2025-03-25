const { singleUpload, arrayUpload } = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products");

router.route("/").get(getAllProducts)
// Change from single to array upload
router.post("/", arrayUpload, createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;