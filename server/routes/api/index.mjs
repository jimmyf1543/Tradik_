import express from "express";
const router = express.Router();

import ingresoRoutes from "./ingreso.mjs";
import solicitudRoutes from "./solicitud.mjs";
import costoRoutes from "./costo.mjs"
import pagoRoutes from "./pago.mjs";

router.use("/ingreso", ingresoRoutes);
router.use("/solicitud", solicitudRoutes);
router.use("/costo",costoRoutes)
router.use("/pago", pagoRoutes);

router.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Ruta no encontrada dentro de la API" });
});

export default router;
