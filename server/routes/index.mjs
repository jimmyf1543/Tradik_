import express from "express";
const router = express.Router();

import apiRoutes from "./api/index.mjs";
import keys from "../config/keys.mjs";

const apiURL = keys.apiURL || "api";

const api = `/${apiURL}`;

//Rutas de la api
router.use(api, apiRoutes);

router.use(api, (req, res) =>
  res.status(404).json({
    sucess: false,
    message: "Ruta de la api no encontrada",
  })
);

export default router;
