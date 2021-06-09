const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const {routesConfig} = require("./src/routes/routesConfig.js")

const app = express();
app.use(express.json());
app.use(cors({origin: true}));
routesConfig(app);

exports.api = functions.https.onRequest(app);