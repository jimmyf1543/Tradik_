import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  successDialog,
  warningDialog,
} from "../../components/common/SwalDialogs";
import {
  obtenerSolicitudPorId,
  actualizarSolicitud,
} from "../../services/solicitudServices";

const EditSolicitud = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    codigoSS: "",
    fechaSolicitud: "",
    fechaMontaje: "",
    cliente: "",
    evento: "",
    valorSS: "",
    facturaRemision: "Factura",
    vendedor: "",
    NroFactura: "",
  });

  useEffect(() => {
    const loadSolicitud = async () => {
      try {
        const response = await obtenerSolicitudPorId(id);
        if (response.success) {
          console.log(response.data);
          const solicitud = response.data;
          setFormData({
            codigoSS: solicitud.codigoSS,
            fechaSolicitud: solicitud.fechaSolicitud.split("T")[0],
            fechaMontaje: solicitud.fechaMontaje.split("T")[0],
            cliente: solicitud.cliente,
            evento: solicitud.evento,
            valorSS: solicitud.valorSS,
            facturaRemision: solicitud.facturaRemision,
            vendedor: solicitud.vendedor,
            NroFactura: solicitud.NroFactura,
          });
        } else {
          throw new Error("Error al cargar la solicitud");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al cargar la solicitud. Inténtalo de nuevo.");
      }
    };

    loadSolicitud();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await warningDialog({
      title: "Actualizar solicitud",
      text: "¿Estás seguro de que deseas actualizar esta solicitud?",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      try {
        const response = await actualizarSolicitud(id, formData);

        if (!response.success) {
          throw new Error("Error al actualizar la solicitud");
        }

        successDialog({ text: `${formData.codigoSS} actualizada` });
        navigate("/requests");
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al actualizar la solicitud. Inténtalo de nuevo.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/requests");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Solicitud</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Fecha de Solicitud
          </label>
          <input
            type="date"
            name="fechaSolicitud"
            value={formData.fechaSolicitud}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha de Montaje</label>
          <input
            type="date"
            name="fechaMontaje"
            value={formData.fechaMontaje}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Cliente</label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Evento</label>
          <input
            type="text"
            name="evento"
            value={formData.evento}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor SS</label>
          <input
            type="number"
            name="valorSS"
            value={formData.valorSS}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Factura/Remisión</label>
          <select
            name="facturaRemision"
            value={formData.facturaRemision}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="Factura">Factura</option>
            <option value="Remision">Remisión</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Vendedor</label>
          <input
            type="text"
            name="vendedor"
            value={formData.vendedor}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Número de Factura</label>
          <input
            type="text"
            name="NroFactura"
            value={formData.NroFactura}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-500 hover:bg-gray-700 text-white py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSolicitud;
