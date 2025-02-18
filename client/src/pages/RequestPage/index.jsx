import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListaSolicitudes from "./list";
import { AddButton } from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar.jsx";
import {
  warningDialog,
  successDialog,
  errorDialog,
} from "../../components/common/SwalDialogs.jsx";
import {
  obtenerSolicitudes,
  eliminarSolicitud,
} from "../../services/solicitudServices.jsx";

const IndexSolicitudes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);

  useState(() => {
    const loadSolicitudes = async () => {
      try {
        const response = await obtenerSolicitudes();
        setSolicitudes(response.data);
        setFilteredSolicitudes(response.data);
      } catch (err) {
        console.log(err);
        setError(
          "Error al cargar las solicitudes. Inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSolicitudes();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = solicitudes.filter(
      (solicitud) =>
        solicitud.cliente
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        solicitud.vendedor
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        solicitud.codigoSS.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSolicitudes(filtered);
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
        await eliminarSolicitud(id);
        setFilteredSolicitudes((prevSolicitudes) =>
          prevSolicitudes.filter((solicitud) => solicitud._id !== id)
        );
        successDialog({ text: "Solicitud eliminada" });
      } catch (err) {
        console.error("Error al eliminar la solicitud:", err);
        errorDialog({ text: "No se pudo eliminar la solicitud." });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/requests/edit/${id}`);
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
              onClick={() => navigate("/requests/add")}
            />

            <div className="w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <ListaSolicitudes
            solicitudes={filteredSolicitudes}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default IndexSolicitudes;
