import mongoose from "mongoose";

const contadorSchema = mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  valor: { type: Number, default: 0 },
});

export default mongoose.model("Contador",contadorSchema)
