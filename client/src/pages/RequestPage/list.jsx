import PropTypes from "prop-types";
import { formatDate, formatCurrency } from "../../utils/format";
import { EditButton, DeleteButton } from "../../components/common/Button";

const ListaSolicitudes = ({ solicitudes, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="hidden lg:table min-w-[800px] md:min-w-full table-auto text-center border-collapse border border-gray-300 text-gray-800">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Cod.</th>
            <th className="border-b px-4 py-2">Fecha de Solicitud</th>
            <th className="border-b px-4 py-2">Fecha de Montaje</th>
            <th className="border-b px-4 py-2">Cliente</th>
            <th className="border-b px-4 py-2">Evento</th>
            <th className="border-b px-4 py-2">Valor SS</th>
            <th className="border-b px-4 py-2">Factura</th>
            <th className="border-b px-4 py-2">Vendedor</th>
            <th className="border-b px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <SolicitudRow
              key={solicitud._id}
              solicitud={solicitud}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <table className="hidden md:table lg:hidden min-w-[600px] md:min-w-full table-auto text-center border-collapse border border-gray-300 text-gray-800">
        <thead>
          <tr>
            <th className="border-b px-2 py-1">Fecha Solicitud</th>
            <th className="border-b px-2 py-1">Cliente</th>
            <th className="border-b px-2 py-1">Evento</th>
            <th className="border-b px-2 py-1">Valor SS</th>
            <th className="border-b px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <SolicitudRowMedium
              key={solicitud._id}
              solicitud={solicitud}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {solicitudes.map((solicitud) => (
          <SolicitudCard
            key={solicitud._id}
            solicitud={solicitud}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

const SolicitudRow = ({ solicitud, onDelete, onEdit }) => {
  return (
    <tr>
      <td className="border-b px-4 py-2">{solicitud.codigoSS}</td>
      <td className="border-b px-4 py-2">
        {formatDate(solicitud.fechaSolicitud)}
      </td>
      <td className="border-b px-4 py-2">
        {formatDate(solicitud.fechaMontaje)}
      </td>
      <td className="border-b px-4 py-2">{solicitud.cliente}</td>
      <td className="border-b px-4 py-2">{solicitud.evento}</td>
      <td className="border-b px-4 py-2">
        {formatCurrency(solicitud.valorSS)}
      </td>
      <td className="border-b px-4 py-2">{solicitud.facturaRemision}</td>
      <td className="border-b px-4 py-2">{solicitud.vendedor}</td>
      <td className="border-b px-4 py-2">
        <div className="flex flex-col space-y-2 w-full">
          <EditButton
            className="w-full"
            onClick={() => onEdit(solicitud._id)}
          />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(solicitud._id, solicitud.codigoSS)}
          />
        </div>
      </td>
    </tr>
  );
};

const SolicitudRowMedium = ({ solicitud, onDelete, onEdit }) => {
  return (
    <tr>
      <td className="border-b px-2 py-1">
        {formatDate(solicitud.fechaSolicitud)}
      </td>
      <td className="border-b px-2 py-1">{solicitud.cliente}</td>
      <td className="border-b px-2 py-1">{solicitud.evento}</td>
      <td className="border-b px-2 py-1">
        {formatCurrency(solicitud.valorSS)}
      </td>
      <td className="border-b px-2 py-1">
        <div className="flex flex-col space-y-2 w-full">
          <EditButton
            className="w-full"
            onClick={() => onEdit(solicitud._id)}
          />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(solicitud._id, solicitud.codigoSS)}
          />
        </div>
      </td>
    </tr>
  );
};

const SolicitudCard = ({ solicitud, onDelete, onEdit }) => {
  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-lg">
      <div className="space-y-2">
        <div>
          <strong>Consecutivo:</strong> {solicitud.codigoSS}
        </div>
        <div>
          <strong>Fecha de Solicitud:</strong>{" "}
          {formatDate(solicitud.fechaSolicitud)}
        </div>
        <div>
          <strong>Fecha de Montaje:</strong>{" "}
          {formatDate(solicitud.fechaMontaje)}
        </div>
        <div>
          <strong>Cliente:</strong> {solicitud.cliente}
        </div>
        <div>
          <strong>Evento:</strong> {solicitud.evento}
        </div>
        <div>
          <strong>Valor SS:</strong> {formatCurrency(solicitud.valorSS)}
        </div>
        <div>
          <strong>Factura:</strong> {solicitud.facturaRemision}
        </div>
        <div>
          <strong>Vendedor:</strong> {solicitud.vendedor}
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <EditButton
            className="w-full"
            onClick={() => onEdit(solicitud._id)}
          />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(solicitud._id, solicitud.codigoSS)}
          />
        </div>
      </div>
    </div>
  );
};

ListaSolicitudes.propTypes = {
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fechaSolicitud: PropTypes.string.isRequired,
      fechaMontaje: PropTypes.string.isRequired,
      cliente: PropTypes.string.isRequired,
      evento: PropTypes.string.isRequired,
      codigoSS: PropTypes.string.isRequired,
      valorSS: PropTypes.number.isRequired,
      facturaRemision: PropTypes.string,
      vendedor: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

SolicitudRow.propTypes = {
  solicitud: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fechaSolicitud: PropTypes.string.isRequired,
    fechaMontaje: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    evento: PropTypes.string.isRequired,
    codigoSS: PropTypes.string.isRequired,
    valorSS: PropTypes.number.isRequired,
    facturaRemision: PropTypes.string,
    vendedor: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

SolicitudRowMedium.propTypes = {
  solicitud: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    codigoSS: PropTypes.string.isRequired,
    fechaSolicitud: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    evento: PropTypes.string.isRequired,
    valorSS: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

SolicitudCard.propTypes = {
  solicitud: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fechaSolicitud: PropTypes.string.isRequired,
    fechaMontaje: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    evento: PropTypes.string.isRequired,
    codigoSS: PropTypes.string.isRequired,
    valorSS: PropTypes.number.isRequired,
    facturaRemision: PropTypes.string,
    vendedor: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListaSolicitudes;
