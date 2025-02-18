import mongoose from "mongoose";
import Ingreso from "../models/ingreso.mjs";

// Crear un nuevo ingreso
export const crearIngreso = async (req, res) => {
  try {
    const nuevoIngreso = new Ingreso(req.body);
    await nuevoIngreso.save();
    res.status(201).json({ success: true, data: nuevoIngreso });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Obtener todos los ingresos
export const obtenerIngresos = async (req, res) => {
  try {
    const ingresos = await Ingreso.find();
    res.status(200).json({ success: true, data: ingresos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener un ingreso por ID
export const obtenerIngresoPorId = async (req, res) => {
  try {
    const ingreso = await Ingreso.findById(req.params.id);
    if (!ingreso) {
      return res
        .status(404)
        .json({ success: false, message: "Ingreso no encontrado" });
    }
    res.status(200).json({ success: true, data: ingreso });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar un ingreso por ID
export const actualizarIngreso = async (req, res) => {
  try {
    if (req.body.codigoSS) {
      const solicitud = await mongoose.models.Solicitud.findOne({
        codigoSS: req.body.codigoSS,
      });
      if (!solicitud) {
        return res.status(404).json({
          success: false,
          message: "El código SS de la solicitud no existe",
        });
      }
    }

    const ingreso = await Ingreso.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ingreso) {
      return res
        .status(404)
        .json({ success: false, message: "Ingreso no encontrado" });
    }
    res.status(200).json({ success: true, data: ingreso });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar un ingreso por ID
export const eliminarIngreso = async (req, res) => {
  try {
    const ingreso = await Ingreso.findByIdAndDelete(req.params.id);
    if (!ingreso) {
      return res
        .status(404)
        .json({ success: false, message: "Ingreso no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Ingreso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
