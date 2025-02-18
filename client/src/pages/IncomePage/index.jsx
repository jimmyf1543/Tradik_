import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/common/Button";
import {
  warningDialog,
  successDialog,
  errorDialog,
} from "../../components/common/SwalDialogs.jsx";
import SearchBar from "../../components/common/SearchBar";
import ListaIngresos from "./list";
import {
  obtenerIngresos,
  eliminarIngreso,
} from "../../services/ingresoServices.jsx";

const IndexIngresos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ingresos, setIngresos] = useState([]);
  const [filteredIngresos, setFilteredIngresos] = useState([]);

  useState(() => {
    const loadIngresos = async () => {
      try {
        const response = await obtenerIngresos();
        setIngresos(response.data);
        setFilteredIngresos(response.data);
      } catch (err) {
        console.log(err);
        setError("Error al cargar los ingresos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadIngresos();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = ingresos.filter(
      (ingreso) =>
        ingreso.consecutivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingreso.cuentaReceptora.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingreso.codigoSS.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngresos(filtered);
  };

  const handleDelete = async (id, ss) => {
    const confirmed = await warningDialog({
      title: "Eliminar ingreso",
      text: `¿Desea eliminar la solicitud ${ss}?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirmed) {
      try {
        await eliminarIngreso(id);
        setFilteredIngresos((prevIngresos) =>
          prevIngresos.filter((ingreso) => ingreso._id !== id)
        );
        successDialog({ text: "Solicitud eliminada" });
      } catch (err) {
        console.error("Error al eliminar la solicitud:", err);
        errorDialog({ text: "No se pudo eliminar la solicitud." });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/incomes/edit/${id}`);
  };

  return (
    <div className="mx-auto p-6">
      {loading ? (
        <div className="text-center text-lg font-semibold">Cargando...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <>
          <div className="flex justify-start">
            <AddButton
              className="mb-4 hover:bg-gray-300 p-2 rounded-lg w-auto"
              onClick={() => navigate("/incomes/add")}
            />
            <div className="w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <ListaIngresos
            ingresos={filteredIngresos}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default IndexIngresos;
