const pool = require("../database")

async function getVehicleById(inv_id) {
  try {
    const sql = `
      SELECT inv_id, inv_make, inv_model, inv_description, inv_image,
             inv_price, inv_miles, classification_id
      FROM public.inventory
      WHERE inv_id = $1
    `
    const result = await pool.query(sql, [inv_id])
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

module.exports = { getVehicleById }
