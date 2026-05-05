module.exports = mongoose => {
  const Schema = mongoose.Schema;

  let LieuSchema = new Schema({
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    ville: { type: String, required: true },
    capacite: { type: Number },
    description: { type: String },

  }, {
    timestamps: true 
  });

  LieuSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id; 
    return object;
  }); 
  

  const Lieu = mongoose.model("Lieu", LieuSchema);
  return Lieu;
};
