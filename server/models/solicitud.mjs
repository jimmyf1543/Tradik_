import mongoose from "mongoose";
import Contador from "./contador.mjs";

const solicitudSchema = new mongoose.Schema(
  {
    fechaSolicitud: {
      type: Date,
      required: true,
      default: Date.now,
    },
    fechaMontaje: {
      type: Date,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    evento: {
      type: String,
      required: true,
    },
    codigoSS: {
      type: String,
      unique: true,
      required: true,
    },
    valorSS: {
      type: Number,
      required: true,
    },
    facturaRemision: {
      type: String,
      enum: ["Factura", "Remision"],
      required: true,
    },
    vendedor: {
      type: String,
      required: true,
    },
    nroFactura: {
      type: String,
    },
    saldoPendiente: {
      type: Number,
      required: true,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

solicitudSchema.pre("validate", async function (next) {
  if (!this.codigoSS) {
    const contador = await Contador.findOneAndUpdate(
      { nombre: "solicitud" }, 
      { $inc: { valor: 1 } }, 
      { new: true, upsert: true } 
    );
    this.codigoSS = `SS${String(contador.valor).padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("Solicitud", solicitudSchema);
