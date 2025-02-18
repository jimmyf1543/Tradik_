import Solicitud from "../models/solicitud.mjs";

// Crear una nueva solicitud
export const crearSolicitud = async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ success: true, data: nuevaSolicitud });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Obtener todas las solicitudes
export const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json({ success: true, data: solicitudes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener una solicitud por ID
export const obtenerSolicitudPorId = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) {
      return res
        .status(404)
        .json({ success: false, message: "Solicitud no encontrada" });
    }
    res.status(200).json({ success: true, data: solicitud });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar una solicitud por ID
export const actualizarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!solicitud) {
      return res
        .status(404)
        .json({ success: false, message: "Solicitud no encontrada" });
    }
    res.status(200).json({ success: true, data: solicitud });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar una solicitud por ID
export const eliminarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndAndUpdate(req.params.id, {
      deleted: true,
    });
    if (!solicitud) {
      return res
        .status(404)
        .json({ success: false, message: "Solicitud no encontrada" });
    }
    res
      .status(200)
      .json({ success: true, message: "Solicitud eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};