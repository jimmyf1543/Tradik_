import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearSolicitud } from "../../services/solicitudServices";

const AddSolicitud = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fechaMontaje: "",
    cliente: "",
    evento: "",
    valorSS: "",
    facturaRemision: "Factura", // Valor por defecto
    vendedor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await crearSolicitud(formData);


      if (!response.success) {
        throw new Error("Error al registrar la solicitud");
      }
      navigate("/requests");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrar la solicitud. Inténtalo de nuevo.");
    }
  };

  const handleCancel = () => {
    navigate("/requests");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Nueva Solicitud</h2>
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
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSolicitud;
