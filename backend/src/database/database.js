const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

db.evenements = require("../api/models/evenements.model.js")(mongoose);
db.lieux = require("../api/models/lieux.model.js")(mongoose);
db.participants = require("../api/models/participants.model.js")(mongoose);

module.exports = db; 
  
