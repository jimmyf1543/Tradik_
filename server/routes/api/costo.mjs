import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  crearCosto,
  obtenerCostos,
  obtenerCostoPorId,
  actualizarCosto,
  eliminarCosto,
} from "../../controllers/costoController.mjs";

const validarCosto = [
  body("fechaObligacion")
    .isISO8601()
    .withMessage("La fecha de la obligación debe ser válida"),
  body("beneficiario")
    .notEmpty()
    .withMessage("El nombre del beneficiario es obligatorio"),
  body("concepto").notEmpty().withMessage("El concepto es obligatorio"),
  body("codigoSS").notEmpty().withMessage("El código SS es obligatorio"),
  body("valorObligacion")
    .isNumeric()
    .withMessage("El valor de la obligación debe ser un número"),
  body("valorPagado")
    .isNumeric()
    .withMessage("El valor pagado debe ser un número"),
  body("cuentaGiradora")
    .notEmpty()
    .withMessage("La cuenta giradora es obligatoria"),
];

router.post("/", validarCosto, crearCosto);
router.get("/", obtenerCostos);
router.get("/:id", obtenerCostoPorId);
router.put("/:id", validarCosto, actualizarCosto);
router.delete("/:id", eliminarCosto);

export default router;
