const invModel = require("../models/inventoryModel")
const utilities = require("../utilities")

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

module.exports = { buildDetailView }
