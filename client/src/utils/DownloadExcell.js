import * as XLSX from "xlsx";
import { obtenerIngresos } from "../services/ingresoServices";
import { obtenerSolicitudes } from "../services/solicitudServices";
import { obtenerCostos } from "../services/costoServices";

const generateExcel = async () => {
  try {
    const costosResponse = await obtenerCostos();
    const solicitudesResponse = await obtenerSolicitudes();
    const ingresosResponse = await obtenerIngresos();

    const costos = costosResponse.data;
    const solicitudes = solicitudesResponse.data;
    const ingresos = ingresosResponse.data;

    const workbook = XLSX.utils.book_new();

    const costosSheet = XLSX.utils.json_to_sheet(costos);
    const solicitudesSheet = XLSX.utils.json_to_sheet(solicitudes);
    const ingresosSheet = XLSX.utils.json_to_sheet(ingresos);

    XLSX.utils.book_append_sheet(workbook, costosSheet, "Costos");
    XLSX.utils.book_append_sheet(workbook, solicitudesSheet, "Solicitudes");
    XLSX.utils.book_append_sheet(workbook, ingresosSheet, "Ingresos");

    XLSX.writeFile(workbook, "Reporte.xlsx");
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
    alert("Hubo un error al generar el archivo Excel. Inténtalo de nuevo.");
  }
};

export default generateExcel;
