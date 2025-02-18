import PropTypes from "prop-types";
import { EditButton, DeleteButton } from "../../components/common/Button";
import { formatDate, formatCurrency } from "../../utils/format";

const ListaIngresos = ({ ingresos, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="hidden lg:table min-w-[800px] md:min-w-full table-auto text-center border-collapse border border-gray-300 text-gray-800">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Cod.</th>
            <th className="border-b px-4 py-2">Fecha</th>
            <th className="border-b px-4 py-2">Cliente</th>
            <th className="border-b px-4 py-2">Cod. Solicitud (SS)</th>
            <th className="border-b px-4 py-2">Valor</th>
            <th className="border-b px-4 py-2">Concepto</th>
            <th className="border-b px-4 py-2">Cuenta Receptora</th>
            <th className="border-b px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <IngresoRow
              key={ingreso._id}
              ingreso={ingreso}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <table className="hidden md:table lg:hidden min-w-[600px] md:min-w-full table-auto text-center border-collapse border border-gray-300 text-gray-800">
        <thead>
          <tr>
            <th className="border-b px-2 py-2">Cod.</th>
            <th className="border-b px-2 py-1">Fecha</th>
            <th className="border-b px-2 py-1">Cliente</th>
            <th className="border-b px-2 py-1">Valor</th>
            <th className="border-b px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <IngresoRowMedium
              key={ingreso._id}
              ingreso={ingreso}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {ingresos.map((ingreso) => (
          <IngresoCard
            key={ingreso._id}
            ingreso={ingreso}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

const IngresoRow = ({ ingreso, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="border-b px-4 py-2">{ingreso.consecutivo}</td>
      <td className="border-b px-4 py-2">{formatDate(ingreso.fecha)}</td>
      <td className="border-b px-4 py-2">{ingreso.cliente}</td>
      <td className="border-b px-4 py-2">{ingreso.codigoSS}</td>
      <td className="border-b px-4 py-2">{formatCurrency(ingreso.valor)}</td>
      <td className="border-b px-4 py-2">{ingreso.concepto}</td>
      <td className="border-b px-4 py-2">{ingreso.cuentaReceptora}</td>
      <td className="border-b px-4 py-2">
        <div className="flex flex-col space-y-2 w-full">
          <EditButton className="w-full" onClick={() => onEdit(ingreso._id)} />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(ingreso._id, ingreso.consecutivo)}
          />
        </div>
      </td>
    </tr>
  );
};

const IngresoRowMedium = ({ ingreso, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="border-b px-2 py-1">{ingreso.consecutivo}</td>
      <td className="border-b px-2 py-1">{formatDate(ingreso.fecha)}</td>
      <td className="border-b px-2 py-1">{ingreso.cliente}</td>
      <td className="border-b px-2 py-1">{formatCurrency(ingreso.valor)}</td>
      <td className="border-b px-2 py-1">
        <div className="flex flex-col space-y-2 w-full">
          <EditButton className="w-full" onClick={() => onEdit(ingreso._id)} />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(ingreso._id, ingreso.consecutivo)}
          />
        </div>
      </td>
    </tr>
  );
};

const IngresoCard = ({ ingreso, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-lg">
      <div className="space-y-2">
        <div>
          <strong>Consecutivo:</strong> {ingreso.consecutivo}
        </div>
        <div>
          <strong>Fecha:</strong> {formatDate(ingreso.fecha)}
        </div>
        <div>
          <strong>Cliente:</strong> {ingreso.cliente}
        </div>
        <div>
          <strong>Código de Solicitud (SS):</strong> {ingreso.codigoSS}
        </div>
        <div>
          <strong>Valor:</strong> {formatCurrency(ingreso.valor)}
        </div>
        <div>
          <strong>Concepto:</strong> {ingreso.concepto}
        </div>
        <div>
          <strong>Cuenta Receptora:</strong> {ingreso.cuentaReceptora}
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <EditButton className="w-full" onClick={() => onEdit(ingreso._id)} />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(ingreso._id, ingreso.consecutivo)}
          />
        </div>
      </div>
    </div>
  );
};

ListaIngresos.propTypes = {
  ingresos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      consecutivo: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
      cliente: PropTypes.string.isRequired,
      codigoSS: PropTypes.string.isRequired,
      valor: PropTypes.number.isRequired,
      concepto: PropTypes.string.isRequired,
      cuentaReceptora: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

IngresoRow.propTypes = {
  ingreso: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    consecutivo: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    codigoSS: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
    concepto: PropTypes.string.isRequired,
    cuentaReceptora: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

IngresoRowMedium.propTypes = {
  ingreso: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    consecutivo: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

IngresoCard.propTypes = {
  ingreso: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    consecutivo: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    codigoSS: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
    concepto: PropTypes.string.isRequired,
    cuentaReceptora: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListaIngresos;
