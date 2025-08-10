const pool = require("../database") // make sure this points to your DB connection

function formatPrice(price) {
  if (!price) return "N/A"
  return `$${Number(price).toLocaleString("en-US")}`
}

function formatMileage(miles) {
  if (!miles) return "N/A"
  return `${Number(miles).toLocaleString("en-US")} miles`
}

function buildVehicleDetailHTML(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-image" />
      <div class="vehicle-info">
        <h2>${vehicle.inv_year ? vehicle.inv_year : ""} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">${formatPrice(vehicle.inv_price)}</p>
        <p><strong>Mileage:</strong> ${formatMileage(vehicle.inv_miles)}</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `
}

// Fetch all classifications from DB
async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT classification_name FROM public.classification ORDER BY classification_name"
    )
    return data.rows
  } catch (err) {
    console.error("Error fetching classifications:", err)
    return []
  }
}

module.exports = {
  formatPrice,
  formatMileage,
  buildVehicleDetailHTML,
  getClassifications
}
