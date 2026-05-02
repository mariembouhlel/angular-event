const db = require('../database/database.js');
const Lieu = db.lieux; // ⚠️ ici on change

// Create lieu
exports.create = async (req, res) => {
  try {
    const { nom, adresse, capacite, description } = req.body;

    if (!nom || !adresse) {
      return res.status(400).send({
        message: 'nom and adresse are required'
      });
    }

    const lieu = new Lieu({
      nom,
      adresse,
      capacite,
      description
    });

    const savedLieu = await lieu.save();

    res.status(201).send(savedLieu);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while creating lieu'
    });
  }
};

// Get all lieux
exports.findAll = async (req, res) => {
  try {
    const { search } = req.query;

    let condition = {};

    // recherche par nom
    if (search) {
      condition.nom = { $regex: search, $options: 'i' };
    }

    const lieux = await Lieu.find(condition);

    res.send(lieux);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving lieux'
    });
  }
};

// Get one lieu
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const lieu = await Lieu.findById(id);

    if (!lieu) {
      return res.status(404).send({
        message: 'Lieu not found'
      });
    }

    res.send(lieu);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving lieu'
    });
  }
};

// Update lieu
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedLieu = await Lieu.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLieu) {
      return res.status(404).send({
        message: 'Lieu not found'
      });
    }

    res.send(updatedLieu);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while updating lieu'
    });
  }
};

// Delete lieu
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedLieu = await Lieu.findByIdAndDelete(id);

    if (!deletedLieu) {
      return res.status(404).send({
        message: 'Lieu not found'
      });
    }

    res.send({
      message: 'Lieu deleted successfully'
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while deleting lieu'
    });
  }
};