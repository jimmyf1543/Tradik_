import mongoose from "mongoose";
import Costo from "../models/costo.mjs";

// Crear un nuevo costo
export const crearCosto = async (req, res) => {
  try {
    const nuevoCosto = new Costo(req.body);
    await nuevoCosto.save();
    res.status(201).json({ success: true, data: nuevoCosto });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Obtener todos los costos
export const obtenerCostos = async (req, res) => {
  try {
    const costos = await Costo.find();
    res.status(200).json({ success: true, data: costos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener un costo por ID
export const obtenerCostoPorId = async (req, res) => {
  try {
    const costo = await Costo.findById(req.params.id);
    if (!costo) {
      return res
        .status(404)
        .json({ success: false, message: "Costo no encontrado" });
    }
    res.status(200).json({ success: true, data: costo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar un costo por ID
export const actualizarCosto = async (req, res) => {
  try {
    if (req.body.codigoSS) {
      const solicitud = await mongoose.models.Solicitud.findOne({
        codigoSS: req.body.codigoSS,
      });
      if (!solicitud) {
        return res
          .status(404)
          .json({
            success: false,
            message: "El código SS de la solicitud no existe",
          });
      }
    }

    const costo = await Costo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!costo) {
      return res
        .status(404)
        .json({ success: false, message: "Costo no encontrado" });
    }
    res.status(200).json({ success: true, data: costo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar un costo por ID
export const eliminarCosto = async (req, res) => {
  try {
    const costo = await Costo.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });
    if (!costo) {
      return res
        .status(404)
        .json({ success: false, message: "Costo no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Costo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};