import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  crearSolicitud,
  obtenerSolicitudes,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  eliminarSolicitud,
} from "../../controllers/solicitudController.mjs";

const validarSolicitud = [
  body("fechaMontaje")
    .isISO8601()
    .withMessage("La fecha de montaje debe ser válida"),
  body("cliente")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("evento")
    .notEmpty()
    .withMessage("La descripción del evento es obligatoria"),
  body("valorSS")
    .isNumeric()
    .withMessage("El valor del servicio debe ser un número"),
  body("facturaRemision")
    .isIn(["Factura", "Remisión"])
    .withMessage('El tipo debe ser "Factura" o "Remisión"'),
  body("vendedor")
    .notEmpty()
    .withMessage("El nombre del vendedor es obligatorio"),
];

// Rutas
router.post("/", validarSolicitud, crearSolicitud);
router.get("/", obtenerSolicitudes);
router.get("/:id", obtenerSolicitudPorId);
router.put("/:id", validarSolicitud, actualizarSolicitud);
router.delete("/:id", eliminarSolicitud);

export default router;