import PropTypes from "prop-types";

const PendienteStatus = () => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
      Pendiente
    </span>
  );
};

const PagoParcialStatus = () => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
      Pago Parcial
    </span>
  );
};

// Componente para el estado "Pagado"
const PagadoStatus = () => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
      Pagado
    </span>
  );
};

const Status = ({ estado }) => {
  switch (estado) {
    case "Pendiente":
      return <PendienteStatus />;
    case "Pago Parcial":
      return <PagoParcialStatus />;
    case "Pagado":
      return <PagadoStatus />;
    default:
      return null;
  }
};

Status.propTypes = {
  estado: PropTypes.oneOf(["Pendiente", "Pago Parcial", "Pagado"]).isRequired,
};

export default Status;
