const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventoryModel")

// Validation rules for adding a classification
function classificationRules() {
  return [
    body("classification_name")
      .trim()
      .notEmpty().withMessage("Classification name is required.")
      .matches(/^[A-Za-z]+$/).withMessage("Classification name must contain only letters, no spaces or special characters."),
  ]
}

// Validation rules for adding a vehicle
function inventoryRules() {
  return [
    body("classification_id")
      .notEmpty().withMessage("Classification is required.")
      .custom(async (value) => {
        const classifications = await invModel.getClassifications()
        const validIds = classifications.map(c => c.classification_id.toString())
        if (!validIds.includes(value)) {
          throw new Error("Invalid classification selected.")
        }
        return true
      }),

    body("inv_make")
      .trim()
      .notEmpty().withMessage("Make is required."),

    body("inv_model")
      .trim()
      .notEmpty().withMessage("Model is required."),

    body("inv_year")
      .notEmpty().withMessage("Year is required.")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage("Year must be a valid year."),

    body("inv_price")
      .notEmpty().withMessage("Price is required.")
      .isFloat({ gt: 0 }).withMessage("Price must be a positive number."),

    body("inv_miles")
      .notEmpty().withMessage("Miles is required.")
      .isInt({ min: 0 }).withMessage("Miles must be zero or more."),

    body("inv_color")
      .trim()
      .notEmpty().withMessage("Color is required."),

    // Optional fields can be sanitized but no validation needed
    body("inv_description").trim().escape(),
    body("inv_image").optional({ checkFalsy: true }).trim(),
    body("inv_thumbnail").optional({ checkFalsy: true }).trim(),
  ]
}

// Middleware to check validation result and handle errors
function checkValidation(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(e => e.msg)

    if (req.path === "/add-classification") {
      return res.status(400).render("inventory/add-classification", {
        title: "Add New Classification",
        errors: errorMessages,
        classification_name: req.body.classification_name,
      })
    }

    if (req.path === "/add-vehicle") {
      invModel.getClassifications()
        .then(classifications => {
          return res.status(400).render("inventory/add-vehicle", {
            title: "Add New Vehicle",
            errors: errorMessages,
            classifications,
            data: req.body,
          })
        })
        .catch(err => next(err))
      return
    }
  }
  next()
}

module.exports = {
  classificationRules,
  inventoryRules,
  checkValidation,
}
