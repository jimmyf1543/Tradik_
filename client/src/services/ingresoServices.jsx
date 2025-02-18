import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los ingresos
export const obtenerIngresos = async () => {
  try {
    const response = await axios.get(`${API_URL}/ingreso`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los ingresos:", error);
    throw error;
  }
};

// Obtener un ingreso por ID
export const obtenerIngresoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/ingreso/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el ingreso:", error);
    throw error;
  }
};

// Crear un nuevo ingreso
export const crearIngreso = async (ingreso) => {
  try {
    const response = await axios.post(`${API_URL}/ingreso`, ingreso);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el ingreso:", error);
    throw error;
  }
};

// Actualizar un ingreso por ID
export const actualizarIngreso = async (id, ingreso) => {
  try {
    const response = await axios.put(`${API_URL}/ingreso/${id}`, ingreso);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el ingreso:", error);
    throw error;
  }
};

// Eliminar un ingreso por ID
export const eliminarIngreso = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ingreso/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el ingreso:", error);
    throw error;
  }
};
