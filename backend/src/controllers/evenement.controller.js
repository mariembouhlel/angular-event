const db = require('../database/database.js');
const Evenement = db.evenements;

// Create evenement
exports.create = async (req, res) => {
  try {
    const { titre, description, dateDebut, dateFin, lieuId, image, statut } = req.body;

    if (!titre || !description || !dateDebut || !dateFin || !lieuId) {
      return res.status(400).send({
        message: 'titre, description, dateDebut, dateFin and lieuId are required'
      });
    }

    const evenement = new Evenement({
      titre,
      description,
      dateDebut,
      dateFin,
      lieuId,
      image,
      statut
    });

    const savedEvenement = await evenement.save();
    res.status(201).send(savedEvenement);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while creating evenement'
    });
  }
};

// Get all evenements (search + filter)
exports.findAll = async (req, res) => {
  try {
    const { date, lieu, search } = req.query;

    let condition = {};

    // filter by date
    if (date) {
      condition.dateDebut = { $gte: new Date(date) };
    }

    // filter by lieu
    if (lieu) {
      condition.lieuId = lieu;
    }

    // search by title
    if (search) {
      condition.titre = { $regex: search, $options: 'i' };
    }

    const evenements = await Evenement.find(condition)
      .populate('lieuId')
      .sort({ dateDebut: 1 }); // bonus: sort by date

    res.send(evenements);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving evenements'
    });
  }
};

// Get one evenement by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const evenement = await Evenement.findById(id)
      .populate('lieuId');

    if (!evenement) {
      return res.status(404).send({
        message: 'Evenement not found'
      });
    }

    res.send(evenement);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving evenement'
    });
  }
};

// Update evenement
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedEvenement = await Evenement.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvenement) {
      return res.status(404).send({
        message: 'Evenement not found'
      });
    }

    res.send(updatedEvenement);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while updating evenement'
    });
  }
};

// Delete evenement
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedEvenement = await Evenement.findByIdAndDelete(id);

    if (!deletedEvenement) {
      return res.status(404).send({
        message: 'Evenement not found'
      });
    }

    res.send({
      message: 'Evenement deleted successfully'
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while deleting evenement'
    });
  }
};