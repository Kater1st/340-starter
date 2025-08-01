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

module.exports = {
  formatPrice,
  formatMileage,
  buildVehicleDetailHTML
}
