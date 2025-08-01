const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

// Vehicle detail route
router.get("/detail/:inv_id", invController.buildDetailView)

// Intentional 500 error
router.get("/trigger-error", (req, res, next) => {
  next(new Error("Intentional 500 Error"))
})

module.exports = router
