const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const app = express()

// Utilities
const utilities = require("./utilities")

// Routes
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")

// Static assets
app.use(express.static("public"))

// View engine
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout")

// Middleware to load classifications for all views
app.use(async (req, res, next) => {
  res.locals.classifications = await utilities.getClassifications()
  next()
})

// Routes
app.use(staticRoutes)
app.use("/inv", inventoryRoutes)

// Home route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("error/error", { title: "404 Not Found" })
})

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("error/error", { title: "Server Error" })
})

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})
