import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearIngreso } from "../../services/ingresoServices";
import { obtenerSolicitudes } from "../../services/solicitudServices";
import {
  successDialog,
  errorDialog,
  warningDialog,
} from "../../components/common/SwalDialogs";

const AddIngreso = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: "",
    cliente: "",
    codigoSS: "",
    valor: "",
    concepto: "",
    cuentaReceptora: "",
  });

  const [solicitudes, setSolicitudes] = useState([]);

  useState(() => {
    const loadSolicitudes = async () => {
      try {
        const response = await obtenerSolicitudes();
        if (response.success) {
          setSolicitudes(response.data);
        } else {
          throw new Error("Error al cargar las solicitudes");
        }
      } catch (error) {
        console.error("Error:", error);
        errorDialog({
          text: "Error al cargar las solicitudes. Inténtalo de nuevo.",
        });
      }
    };

    loadSolicitudes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const solicitudExistente = solicitudes.find(
      (solicitud) => solicitud.codigoSS === formData.codigoSS
    );

    if (!solicitudExistente) {
      errorDialog({
        text: "El código de solicitud (SS) no existe. Verifica e intenta de nuevo.",
      });
      return;
    }

    const confirmed = await warningDialog({
      title: "Registrar Ingreso",
      text: "¿Estás seguro de que deseas registrar este ingreso?",
      confirmButtonText: "Sí, registrar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      try {
        const dataToSend = {
          ...formData,
          fecha: new Date(formData.fecha), // Convertir fecha a formato Date
        };

        const response = await crearIngreso(dataToSend);

        if (response.success) {
          successDialog({ text: "Ingreso registrado exitosamente." });
          navigate("/incomes");
        } else {
          throw new Error("Error al registrar el ingreso");
        }
      } catch (error) {
        console.error("Error:", error);
        errorDialog({
          text: "Hubo un error al registrar el ingreso. Inténtalo de nuevo.",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/incomes");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Ingreso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
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
          <label className="block text-sm font-medium">
            Código de Solicitud (SS)
          </label>
          <input
            type="text"
            name="codigoSS"
            value={formData.codigoSS}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Valor</label>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Concepto</label>
          <input
            type="text"
            name="concepto"
            value={formData.concepto}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cuenta Receptora</label>
          <input
            type="text"
            name="cuentaReceptora"
            value={formData.cuentaReceptora}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
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

export default AddIngreso;
