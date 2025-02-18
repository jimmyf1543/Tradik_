import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los costos
export const obtenerCostos = async () => {
  try {
    const response = await axios.get(`${API_URL}/costo`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los costos:", error);
    throw error;
  }
};

// Obtener un costo por ID
export const obtenerCostoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/costo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el costo:", error);
    throw error;
  }
};

// Crear un nuevo costo
export const crearCosto = async (costo) => {
  try {
    const response = await axios.post(`${API_URL}/costo`, costo);
    return response.data;
  } catch (error) {
    console.error("Error al crear el costo:", error);
    throw error;
  }
};

// Actualizar un costo por ID
export const actualizarCosto = async (id, costo) => {
  try {
    const response = await axios.put(`${API_URL}/costo/${id}`, costo);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el costo:", error);
    throw error;
  }
};

// Eliminar un costo por ID
export const eliminarCosto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/costo/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el costo:", error);
    throw error;
  }
};
