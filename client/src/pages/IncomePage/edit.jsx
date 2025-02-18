import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerIngresoPorId,
  actualizarIngreso,
} from "../../services/ingresoServices";
import { obtenerSolicitudes } from "../../services/solicitudServices";
import {
  successDialog,
  errorDialog,
  warningDialog,
} from "../../components/common/SwalDialogs";

const EditIngreso = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    consecutivo: "",
    fecha: "",
    cliente: "",
    codigoSS: "",
    valor: "",
    concepto: "",
    cuentaReceptora: "",
  });
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ingresoResponse = await obtenerIngresoPorId(id);
        if (ingresoResponse.success) {
          const ingreso = ingresoResponse.data;
          setFormData({
            consecutivo: ingreso.consecutivo,
            fecha: ingreso.fecha.split("T")[0],
            cliente: ingreso.cliente,
            codigoSS: ingreso.codigoSS,
            valor: ingreso.valor,
            concepto: ingreso.concepto,
            cuentaReceptora: ingreso.cuentaReceptora,
          });
        } else {
          throw new Error("Error al cargar el ingreso");
        }

        const solicitudesResponse = await obtenerSolicitudes();
        if (solicitudesResponse.success) {
          setSolicitudes(solicitudesResponse.data);
        } else {
          throw new Error("Error al cargar las solicitudes");
        }
      } catch (error) {
        console.error("Error:", error);
        errorDialog({
          text: "Error al cargar los datos. Inténtalo de nuevo.",
        });
      }
    };

    loadData();
  }, [id]);

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
        text: `El código de solicitud ${formData.codigoSS} no existe. Verifica e intenta de nuevo.`,
      });
      return;
    }

    const confirmed = await warningDialog({
      title: "Actualizar Ingreso",
      text: "¿Estás seguro de que deseas actualizar este ingreso?",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      try {
        const dataToSend = {
          ...formData,
          fecha: new Date(formData.fecha), 
        };

        const response = await actualizarIngreso(id, dataToSend);

        if (response.success) {
          successDialog({ text: `${formData.consecutivo} actualizado exitosamente` });
          navigate("/incomes");
        } else {
          throw new Error("Error al actualizar el ingreso");
        }
      } catch (error) {
        console.error("Error:", error);
        errorDialog({
          text: "Hubo un error al actualizar el ingreso. Inténtalo de nuevo.",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/incomes");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Ingreso</h2>
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
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIngreso;
