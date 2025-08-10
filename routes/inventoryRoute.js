const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")
const validation = require("../middleware/inventoryValidation")

// Management view
router.get("/", invController.buildManagementView)

// Add Classification routes
router.get("/add-classification", invController.buildAddClassificationView)
router.post(
  "/add-classification",
  validation.classificationRules(),
  validation.checkValidation,
  invController.addClassification
)

// Add Vehicle routes
router.get("/add-vehicle", invController.buildAddVehicleView)
router.post(
  "/add-vehicle",
  validation.inventoryRules(),
  validation.checkValidation,
  invController.addVehicle
)

// Vehicle detail route
router.get("/detail/:inv_id", invController.buildDetailView)

// Intentional 500 error
router.get("/trigger-error", (req, res, next) => {
  next(new Error("Intentional 500 Error"))
})

module.exports = router
