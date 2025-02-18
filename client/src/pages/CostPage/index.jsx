import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/common/Button";
import {
  warningDialog,
  successDialog,
  errorDialog,
} from "../../components/common/SwalDialogs.jsx";
import SearchBar from "../../components/common/SearchBar";
import ListaCostos from "./list";
import { 
  obtenerCostos,
  eliminarCosto 
} from "../../services/costoServices.jsx";

const IndexCostos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [costos, setCostos] = useState([]);
  const [filteredCostos, setFilteredCostos] = useState([]);

  useState(() => {
    const loadCostos = async () => {
      try {
        const response = await obtenerCostos();
        setCostos(response.data);
        setFilteredCostos(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los costos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    loadCostos();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = costos.filter(
      (costo) =>
        costo.consecutivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        costo.beneficiario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        costo.codigoSS.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCostos(filtered);
  };

  const handleDelete = async (id, consecutivo) => {
    const confirmed = await warningDialog({
      title: "Eliminar costo",
      text: `¿Desea eliminar el costo ${consecutivo}?`,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirmed) {
      try {
        await eliminarCosto(id);
        setFilteredCostos((prevCostos) =>
          prevCostos.filter((costo) => costo._id !== id)
        );
        successDialog({ text: "Costo eliminado" });
      } catch (err) {
        console.error("Error al eliminar el costo:", err);
        errorDialog({ text: "No se pudo eliminar el costo." });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/costs/edit/${id}`);
  };

  return (
    <div className="mx-auto p-6">
      {loading ? (
        <div className="text-center text-lg font-semibold">Cargando...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <AddButton
              className="hover:bg-gray-300 p-2 rounded-lg w-auto"
              onClick={() => navigate("/costs/add")}
            />
            <div className="w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <ListaCostos
            costos={filteredCostos}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default IndexCostos;
