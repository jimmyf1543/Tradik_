// src/components/common/SwalDialogs.jsx
import Swal from "sweetalert2";

/**
 * Muestra un diálogo de advertencia con opción de confirmación.
 * @param {Object} options - Opciones para personalizar el diálogo.
 * @param {string} options.title - Título del diálogo (por defecto: "Advertencia").
 * @param {string} options.text - Mensaje del diálogo (por defecto: "¿Estás seguro de realizar esta acción?").
 * @param {string} options.confirmButtonText - Texto del botón de confirmación (por defecto: "Sí, continuar").
 * @param {string} options.cancelButtonText - Texto del botón de cancelación (por defecto: "Cancelar").
 * @param {string} options.confirmButtonColor - Color del botón de confirmación (por defecto: "#3085d6").
 * @param {string} options.cancelButtonColor - Color del botón de cancelación (por defecto: "#d33").
 * @returns {Promise<boolean>} - Devuelve `true` si el usuario confirma, `false` si cancela.
 */
export const warningDialog = async ({
  title = "Advertencia",
  text = "¿Estás seguro de realizar esta acción?",
  confirmButtonText = "Sí, continuar",
  cancelButtonText = "Cancelar",
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed; // Devuelve `true` si el usuario confirma, `false` si cancela
};

/**
 * Muestra un diálogo de éxito.
 * @param {Object} options - Opciones para personalizar el diálogo.
 * @param {string} options.title - Título del diálogo (por defecto: "¡Éxito!").
 * @param {string} options.text - Mensaje del diálogo (por defecto: "La operación se completó correctamente.").
 */
export const successDialog = ({
  title = "¡Éxito!",
  text = "La operación se completó correctamente.",
  timer = 2000,
}) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#3085d6",
    showConfirmButton: false,
    timer,
  });
};

/**
 * Muestra un diálogo de error.
 * @param {Object} options - Opciones para personalizar el diálogo.
 * @param {string} options.title - Título del diálogo (por defecto: "Error").
 * @param {string} options.text - Mensaje del diálogo (por defecto: "Algo salió mal. Inténtalo de nuevo.").
 */
export const errorDialog = ({
  title = "Error",
  text = "Algo salió mal. Inténtalo de nuevo.",
}) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#d33",
  });
};
