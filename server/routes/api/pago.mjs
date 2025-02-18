import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  crearPago,
  obtenerPagos,
  obtenerPagoPorId,
  actualizarPago,
  eliminarPago,
} from "../../controllers/pagoController.mjs";

const validarPago = [
  body("fechaPago")
    .isISO8601()
    .withMessage("La fecha del pago debe ser válida"),
  body("valorPago")
    .isNumeric()
    .withMessage("El valor del pago debe ser un número"),
  body("codigoCOS").notEmpty().withMessage("El código SS es obligatorio"),
  body("cuentaGiradora")
    .notEmpty()
    .withMessage("La cuenta giradora es obligatoria"),
];

router.post("/", validarPago, crearPago);
router.get("/", obtenerPagos);
router.get("/:id", obtenerPagoPorId);
router.put("/:id", validarPago, actualizarPago);
router.delete("/:id", eliminarPago);

export default router;