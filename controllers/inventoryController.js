const invModel = require("../models/inventoryModel")
const utilities = require("../utilities")

// Management view
async function buildManagementView(req, res, next) {
  try {
    res.render("inventory/management", {
      title: "Vehicle Management",
      message: "Choose an option below to manage inventory"
    })
  } catch (err) {
    next(err)
  }
}

// Add Classification view
async function buildAddClassificationView(req, res, next) {
  try {
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      errors: null,
      classification_name: ''
    })
  } catch (err) {
    next(err)
  }
}

// Handle Add Classification POST
async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body
    // We assume server-side validation middleware handles errors.
    // But fallback check here just in case.
    if (!classification_name || classification_name.trim() === "") {
      return res.status(400).render("inventory/add-classification", {
        title: "Add New Classification",
        errors: ["Classification name is required"],
        classification_name: ''
      })
    }
    await invModel.addClassification(classification_name.trim())
    res.redirect("/inv")
  } catch (err) {
    next(err)
  }
}

// Add Vehicle view
async function buildAddVehicleView(req, res, next) {
  try {
    const classifications = await invModel.getClassifications()
    res.render("inventory/add-vehicle", {
      title: "Add New Vehicle",
      classifications,
      errors: null,
      data: {}  // for sticky form fields
    })
  } catch (err) {
    next(err)
  }
}

// Handle Add Vehicle POST
async function addVehicle(req, res, next) {
  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    } = req.body

    // Assume validation middleware populates errors or continues

    // In case of error, the middleware should short-circuit.
    // So here, just add the vehicle if all good:
    await invModel.addVehicle({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    })

    res.redirect("/inv")
  } catch (err) {
    // In case of DB error, re-render form with sticky data and error
    try {
      const classifications = await invModel.getClassifications()
      res.status(500).render("inventory/add-vehicle", {
        title: "Add New Vehicle",
        classifications,
        errors: [err.message],
        data: req.body
      })
    } catch (error) {
      next(err)
    }
  }
}

async function buildDetailView(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)
    const data = await invModel.getVehicleById(inv_id)

    if (!data) {
      return res.status(404).render("error/error", { title: "Vehicle Not Found" })
    }

    const vehicleHTML = utilities.buildVehicleDetailHTML(data)

    res.render("inventory/vehicle-detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      vehicleHTML
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { 
  buildDetailView,
  buildManagementView,
  buildAddClassificationView,
  addClassification,
  buildAddVehicleView,
  addVehicle
}
