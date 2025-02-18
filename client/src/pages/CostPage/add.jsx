import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCosto } from "../../services/costoServices"; 
import { obtenerSolicitudes } from "../../services/solicitudServices";
import {
  successDialog,
  errorDialog,
  warningDialog,
} from "../../components/common/SwalDialogs";

const AddCost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fechaObligacion: "", 
    beneficiario: "",
    concepto: "",
    codigoSS: "", 
    valorObligacion: "", 
    valorPagado: "", 
    fechaPago: "", 
    cuentaGiradora: "", 
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
      title: "Registrar Costo",
      text: "¿Estás seguro de que deseas registrar este costo?",
      confirmButtonText: "Sí, registrar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      try {
        const dataToSend = {
          ...formData,
          fechaObligacion: new Date(formData.fechaObligacion),
          fechaPago: formData.fechaPago ? new Date(formData.fechaPago) : null,
        };

        const response = await crearCosto(dataToSend);

        if (response.success) {
          successDialog({ text: "Costo registrado exitosamente." });
          navigate("/costs"); 
        } else {
          throw new Error("Error al registrar el costo");
        }
      } catch (error) {
        console.error("Error:", error);
        errorDialog({
          text: "Hubo un error al registrar el costo. Inténtalo de nuevo.",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/costs");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Costo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Fecha de la Obligación
          </label>
          <input
            type="date"
            name="fechaObligacion"
            value={formData.fechaObligacion}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Beneficiario</label>
          <input
            type="text"
            name="beneficiario"
            value={formData.beneficiario}
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
          <label className="block text-sm font-medium">
            Valor de la Obligación
          </label>
          <input
            type="number"
            name="valorObligacion"
            value={formData.valorObligacion}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Valor Pagado</label>
          <input
            type="number"
            name="valorPagado"
            value={formData.valorPagado}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha del Pago</label>
          <input
            type="date"
            name="fechaPago"
            value={formData.fechaPago}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cuenta Giradora</label>
          <input
            type="text"
            name="cuentaGiradora"
            value={formData.cuentaGiradora}
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

export default AddCost;
