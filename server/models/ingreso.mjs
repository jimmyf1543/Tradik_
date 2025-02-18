import mongoose from "mongoose";
import Contador from "./contador.mjs";

const ingresoSchema = new mongoose.Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      unique: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    codigoSS: {
      type: String,
      required: true,
    },
    valor: {
      type: Number,
      required: true,
    },
    concepto: {
      type: String,
      required: true,
    },
    cuentaReceptora: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

//Para el consecutivo
ingresoSchema.pre("validate", async function (next) {
  if (!this.consecutivo) {
    const contador = await Contador.findOneAndUpdate(
      { nombre: "ingreso" },
      { $inc: { valor: 1 } },
      { new: true, upsert: true }
    );
    this.consecutivo = `ING${String(contador.valor).padStart(3, "0")}`;
  }

  const solicitud = await mongoose.models.Solicitud.findOne({
    codigoSS: this.codigoSS,
  });
  if (!solicitud) {
    return next(new Error("El código SS de la solicitud no existe"));
  }

  next();
});

export default mongoose.model("Ingreso", ingresoSchema);
