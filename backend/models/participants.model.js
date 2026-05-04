module.exports = mongoose => {
  const Schema = mongoose.Schema;

  let ParticipantSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },

    telephone: { type: String },

    evenementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evenement",
      required: true
    },

    present: {
      type: Boolean,
      enum: [true, false],
      default: true
    }

  }, {
    timestamps: true
  });

  ParticipantSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Participant = mongoose.model("Participant", ParticipantSchema);
  return Participant;
};
