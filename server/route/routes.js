const express = require("express");
const swaggerUi = require("swagger-ui-express");

const demoAppRoutes = require("./demoAppRoutes");
const apiRouter = express.Router();


module.exports = (app) =>
  apiRouter
    .get("/healthcheck", (req, res) => {
      res.send("Demo Server is up and running");
    })
    .use("/demoApp", demoAppRoutes())
    