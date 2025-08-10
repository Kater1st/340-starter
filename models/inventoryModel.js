const db = require("../database")

async function getVehicleById(inv_id) {
  const sql = "SELECT * FROM public.inventory WHERE inv_id = $1"
  const result = await db.query(sql, [inv_id])
  return result.rows[0]
}

async function getClassifications() {
  const sql = "SELECT classification_id, classification_name FROM public.classification ORDER BY classification_name"
  const result = await db.query(sql)
  return result.rows
}

async function addClassification(classification_name) {
  const sql = `
    INSERT INTO public.classification (classification_name)
    VALUES ($1)
    RETURNING classification_id
  `
  const result = await db.query(sql, [classification_name])
  return result.rows[0]
}

async function addVehicle(vehicle) {
  const sql = `
    INSERT INTO public.inventory
    (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING inv_id
  `
  const values = [
    vehicle.classification_id,
    vehicle.inv_make,
    vehicle.inv_model,
    vehicle.inv_year,
    vehicle.inv_description,
    vehicle.inv_image,
    vehicle.inv_thumbnail,
    vehicle.inv_price,
    vehicle.inv_miles,
    vehicle.inv_color
  ]
  const result = await db.query(sql, values)
  return result.rows[0]
}

module.exports = {
  getVehicleById,
  getClassifications,
  addClassification,
  addVehicle
}
