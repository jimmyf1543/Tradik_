import mongoose from "mongoose";
import Contador from "./contador.mjs";

const costoSchema = new mongoose.Schema(
  {
    consecutivo: {
      type: String,
      required: true,
      unique: true,
    },
    fechaObligacion: {
      type: Date,
      required: true,
    },
    beneficiario: {
      type: String,
      required: true,
    },
    concepto: {
      type: String,
      required: true,
    },
    codigoSS: {
      type: String,
      required: true,
    },
    valorObligacion: {
      type: Number,
      required: true,
    },
    saldoRestante: {
      type: Number,
      default: function () {
        return this.valorObligacion;
      },
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

//Para el consecutivo
costoSchema.pre("validate", async function (next) {
  if (!this.consecutivo) {
    const contador = await Contador.findOneAndUpdate(
      { nombre: "costo" },
      { $inc: { valor: 1 } },
      { new: true, upsert: true }
    );
    this.consecutivo = `COS${String(contador.valor).padStart(3, "0")}`;
  }

  //Validar solicitud existente
  const solicitud = await mongoose.models.Solicitud.findOne({
    codigoSS: this.codigoSS,
  });
  if (!solicitud) {
    return next(new Error("El código SS de la solicitud no existe"));
  }

  next();
});

//Para el saldo restante
costoSchema.pre("save", function (next) {
  this.saldoRestante = this.valorObligacion - this.valorPagado;
  next();
});

export default mongoose.model("Costo", costoSchema);
