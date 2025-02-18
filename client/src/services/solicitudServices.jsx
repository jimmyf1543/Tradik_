import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las solicitudes
export const obtenerSolicitudes = async () => {
  try {
    const response = await axios.get(`${API_URL}/solicitud`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    throw error;
  }
};

// Obtener una solicitud por ID
export const obtenerSolicitudPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/solicitud/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la solicitud:", error);
    throw error;
  }
};

// Crear una nueva solicitud
export const crearSolicitud = async (solicitud) => {
  try {
    const response = await axios.post(`${API_URL}/solicitud`, solicitud);
    return response.data;
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    throw error;
  }
};

// Actualizar una solicitud por ID
export const actualizarSolicitud = async (id, solicitud) => {
  try {
    const response = await axios.put(`${API_URL}/solicitud/${id}`, solicitud);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la solicitud:", error);
    throw error;
  }
};

// Eliminar una solicitud por ID
export const eliminarSolicitud = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/solicitud/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la solicitud:", error);
    throw error;
  }
};