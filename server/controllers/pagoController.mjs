import mongoose from "mongoose";
import Pago from "../models/pagos.mjs"; 

// Crear un nuevo pago
export const crearPago = async (req, res) => {
  try {
    const nuevoPago = new Pago(req.body);
    await nuevoPago.save();
    res.status(201).json({ success: true, data: nuevoPago });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Obtener todos los pagos
export const obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.find();
    res.status(200).json({ success: true, data: pagos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener un pago por ID
export const obtenerPagoPorId = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id);
    if (!pago) {
      return res
        .status(404)
        .json({ success: false, message: "Pago no encontrado" });
    }
    res.status(200).json({ success: true, data: pago });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar un pago por ID
export const actualizarPago = async (req, res) => {
  try {
    // Validar que el costo asociado exista
    if (req.body.codigoCOS) {
      const costo = await mongoose.models.Costo.findOne({
        consecutivo: req.body.codigoCOS,
      });
      if (!costo) {
        return res.status(404).json({
          success: false,
          message: "El código COS del costo no existe",
        });
      }
    }

    // Validar que el valor pagado no exceda el saldo restante del costo
    if (req.body.valorPagado) {
      const costo = await mongoose.models.Costo.findOne({
        consecutivo: req.body.codigoCOS,
      });
      if (req.body.valorPagado > costo.saldoRestante) {
        return res.status(400).json({
          success: false,
          message: "El valor pagado excede el saldo restante del costo",
        });
      }
    }

    const pago = await Pago.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pago) {
      return res
        .status(404)
        .json({ success: false, message: "Pago no encontrado" });
    }
    res.status(200).json({ success: true, data: pago });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar un pago por ID
export const eliminarPago = async (req, res) => {
  try {
    const pago = await Pago.findByIdAndUpdate(req.params.id, { deleted: true });
    if (!pago) {
      return res
        .status(404)
        .json({ success: false, message: "Pago no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
