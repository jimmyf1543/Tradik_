import mongoose from "mongoose";
import Contador from "./contador.mjs";

const pagoSchema = new mongoose.Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      unique: true,
    },
    codigoCOS: {
      type: String,
      required: true,
    },
    valorPagado: {
      type: Number,
      required: false,
    },
    fechaPago: {
      type: Date,
      required: false,
    },
    cuentaGiradora: {
      type: String,
      required: false,
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

pagoSchema.pre("validate", async function (next) {

  if (this.valorPagado < 0) {
    return next(new Error("El valor pagado debe ser positivo"));
  }

  if (!this.consecutivo) {
    const contador = await Contador.findOneAndUpdate(
      { nombre: "pago" },
      { $inc: { valor: 1 } },
      { new: true, upsert: true }
    );
    this.consecutivo = `PAG${String(contador.valor).padStart(3, "0")}`;
  }
  const costo = await mongoose.models.Costo.findOne({
    consecutivo: this.codigoCOS,
  });
  
  if (!costo) {
    return next(new Error("El código COS del costo no existe"));
  }

  if (this.valorPagado > costo.saldoRestante) {
    return next(new Error("El valor pagado excede el saldo restante"));
  }

  next();
});

pagoSchema.post("save", async function (doc, next) {
  const costo = await mongoose
    .model("Costo")
    .findOne({ consecutivo: doc.codigoCOS });
  costo.saldoRestante -= doc.valorPagado;
  await costo.save();
  next();
});

export default mongoose.model("Pago", pagoSchema);