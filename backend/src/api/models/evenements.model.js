module.exports = mongoose => {
  const Schema = mongoose.Schema;

  let EvenementSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },

    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },

    lieuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lieu",
      required: true
    },

    image: { type: String },

    statut: {
      type: Boolean,
      enum: [true, false],
      default: true
    }

  }, {
    timestamps: true
  });

  EvenementSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Evenement = mongoose.model("Evenement", EvenementSchema);
  return Evenement;
};