const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

db.evenements = require("../models/evenements.model.js")(mongoose);
db.lieux = require("../models/lieux.model.js")(mongoose);
db.participants = require("../models/participants.model.js")(mongoose);

module.exports = db;
