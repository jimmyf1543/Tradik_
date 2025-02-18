import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  crearIngreso,
  obtenerIngresos,
  obtenerIngresoPorId,
  actualizarIngreso,
  eliminarIngreso,
} from "../../controllers/ingresoController.mjs";

const validarIngreso = [
  body("fecha").isISO8601().withMessage("La fecha debe ser válida"),
  body("cliente")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("codigoSS").notEmpty().withMessage("El código SS es obligatorio"),
  body("valor").isNumeric().withMessage("El valor debe ser un número"),
  body("concepto").notEmpty().withMessage("El concepto es obligatorio"),
  body("cuentaReceptora")
    .notEmpty()
    .withMessage("La cuenta receptora es obligatoria"),
];

// Rutas 
router.post("/", validarIngreso, crearIngreso);
router.get("/", obtenerIngresos);
router.get("/:id", obtenerIngresoPorId);
router.put("/:id", validarIngreso, actualizarIngreso);
router.delete("/:id", eliminarIngreso);

export default router;
