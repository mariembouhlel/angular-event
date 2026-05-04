const db = require('../config/db.js');
const Participant = db.participants;

// Create participant
exports.create = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, evenementId } = req.body;

    // validation complète
    if (!nom || !prenom || !email || !evenementId) {
      return res.status(400).send({
        message: 'nom, prenom, email and evenementId are required'
      });
    }

    const participant = new Participant({
      nom,
      prenom,
      email,
      telephone,
      evenementId
    });

    const savedParticipant = await participant.save();

    res.status(201).send(savedParticipant);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while creating participant'
    });
  }
};

// Get all participants
exports.findAll = async (req, res) => {
  try {
    const { search, evenement } = req.query;

    let condition = {};

    if (evenement) {
      condition.evenementId = evenement;
    }

    if (search) {
      condition.nom = { $regex: search, $options: 'i' };
    }

    const participants = await Participant.find(condition)
      .populate('evenementId');

    res.send(participants);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving participants'
    });
  }
};

// Get one participant
exports.findOne = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id)
      .populate('evenementId');

    if (!participant) {
      return res.status(404).send({
        message: 'Participant not found'
      });
    }

    res.send(participant);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving participant'
    });
  }
};

// Update participant
exports.update = async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedParticipant) {
      return res.status(404).send({
        message: 'Participant not found'
      });
    }

    res.send(updatedParticipant);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while updating participant'
    });
  }
};

// Delete participant
exports.delete = async (req, res) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);

    if (!deletedParticipant) {
      return res.status(404).send({
        message: 'Participant not found'
      });
    }

    res.send({
      message: 'Participant deleted successfully'
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while deleting participant'
    });
  }
};
