/*
* Creada por si se requiere a futuro tener un seguimiento en lo que debe una persona o empresa.
* (No mencionada en requerimientos funcionales).
*/


import mongoose from "mongoose";
import { TIPOSDOCUMENTOS } from "../constants/index.mjs";

const personaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    tipoDocumento: {
      type: String,
      enum: [
        TIPOSDOCUMENTOS.RC,
        TIPOSDOCUMENTOS.TI,
        TIPOSDOCUMENTOS.CC,
        TIPOSDOCUMENTOS.TE,
        TIPOSDOCUMENTOS.CE,
        TIPOSDOCUMENTOS.NIT,
        TIPOSDOCUMENTOS.PP,
        TIPOSDOCUMENTOS.PEP,
        TIPOSDOCUMENTOS.DIE,
        TIPOSDOCUMENTOS.NUIP,
        TIPOSDOCUMENTOS.FOREIGN_NIT,
      ],
    },
    documento: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
);

module.export = mongoose.model("Persona",personaSchema)