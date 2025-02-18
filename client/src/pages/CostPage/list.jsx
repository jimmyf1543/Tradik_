import PropTypes from "prop-types";
import { EditButton, DeleteButton } from "../../components/common/Button";
import Status from "../../components/common/Status.jsx";
import { formatDate, formatCurrency } from "../../utils/format";

const ListaCostos = ({ costos, onDelete, onEdit }) => {
  return (
    <div className={`overflow-x-auto `}>
      <table className="hidden lg:table min-w-[800px] md:min-w-full table-auto text-center border-collapse border border-gray-300 text-gray-800">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Cod.</th>
            <th className="border-b px-4 py-2">Fecha de Obligación</th>
            <th className="border-b px-4 py-2">Beneficiario</th>
            <th className="border-b px-4 py-2">Concepto</th>
            <th className="border-b px-4 py-2">Valor de la Obligación</th>
            <th className="border-b px-4 py-2">Valor Pagado</th>
            <th className="border-b px-4 py-2">Fecha de Pago</th>
            <th className="border-b px-4 py-2">Cuenta de Giro</th>
            <th className="border-b px-4 py-2">Estado</th>
            <th className="border-b px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {costos.map((costo) => (
            <CostoRow
              key={costo._id}
              costo={costo}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <table className="hidden md:table lg:hidden min-w-[600px] md:min-w-full table-auto text-center border-collapse border border-gray-300 text-gray-800">
        <thead>
          <tr>
            <th className="border-b px-2 py-1">Fecha</th>
            <th className="border-b px-2 py-1">Beneficiario</th>
            <th className="border-b px-2 py-1">Concepto</th>
            <th className="border-b px-2 py-1">Valor</th>
            <th className="border-b px-2 py-1">Pagado</th>
            <th className="border-b px-2 py-1">Estado</th>
            <th className="border-b px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {costos.map((costo) => (
            <CostoRowMedium
              key={costo._id}
              costo={costo}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {costos.map((costo) => (
          <CostoCard
            key={costo._id}
            costo={costo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

const CostoRow = ({ costo, onEdit, onDelete }) => {
  const estado =
    costo.valorPagado === costo.valorObligacion
      ? "Pagado"
      : costo.valorPagado > 0
      ? "Pago Parcial"
      : "Pendiente";

  return (
    <tr>
      <td className="border-b px-4 py-2">{costo.consecutivo}</td>
      <td className="border-b px-4 py-2">
        {formatDate(costo.fechaObligacion)}
      </td>
      <td className="border-b px-4 py-2">{costo.beneficiario}</td>
      <td className="border-b px-4 py-2">{costo.concepto}</td>
      <td className="border-b px-4 py-2">
        {formatCurrency(costo.valorObligacion)}
      </td>
      <td className="border-b px-4 py-2">
        {formatCurrency(costo.valorPagado)}
      </td>
      <td className="border-b px-4 py-2">{formatDate(costo.fechaPago)}</td>
      <td className="border-b px-4 py-2">{costo.cuentaGiradora}</td>
      <td className="border-b px-4 py-2">
        <Status estado={estado} />
      </td>
      <td className="border-b px-4 py-2">
        <div className="flex flex-col space-y-2 w-full">
          <EditButton className="w-full" onClick={() => onEdit(costo._id)} />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(costo._id, costo.consecutivo)}
          />
        </div>
      </td>
    </tr>
  );
};

const CostoRowMedium = ({ costo, onEdit, onDelete }) => {
  const estado =
    costo.valorPagado === costo.valorObligacion
      ? "Pagado"
      : costo.valorPagado > 0
      ? "Pago Parcial"
      : "Pendiente";

  return (
    <tr>
      <td className="border-b px-2 py-1">{costo.consecutivo}</td>
      <td className="border-b px-2 py-1">
        {formatDate(costo.fechaObligacion)}
      </td>
      <td className="border-b px-2 py-1">{costo.beneficiario}</td>
      <td className="border-b px-2 py-1">{costo.concepto}</td>
      <td className="border-b px-2 py-1">
        {formatCurrency(costo.valorObligacion)}
      </td>
      <td className="border-b px-2 py-1">
        {formatCurrency(costo.valorPagado)}
      </td>
      <td className="border-b px-2 py-1">
        <Status estado={estado} />
      </td>
      <td className="border-b px-2 py-1">
        <div className="flex flex-col space-y-2 w-full">
          <EditButton className="w-full" onClick={() => onEdit(costo._id)} />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(costo._id,costo.consecutivo)}
          />
        </div>
      </td>
    </tr>
  );
};

const CostoCard = ({ costo, onEdit, onDelete }) => {
  const estado =
    costo.valorPagado === costo.valorObligacion
      ? "Pagado"
      : costo.valorPagado > 0
      ? "Pago Parcial"
      : "Pendiente";

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-lg">
      <div className="space-y-2">
        <div>
          <strong>Consecutivo:</strong> {costo.consecutivo}
        </div>
        <div>
          <strong>Fecha de Obligación:</strong>{" "}
          {formatDate(costo.fechaObligacion)}
        </div>
        <div>
          <strong>Beneficiario:</strong> {costo.beneficiario}
        </div>
        <div>
          <strong>Concepto:</strong> {costo.concepto}
        </div>
        <div>
          <strong>Valor de la Obligación:</strong>{" "}
          {formatCurrency(costo.valorObligacion)}
        </div>
        <div>
          <strong>Valor Pagado:</strong> {formatCurrency(costo.valorPagado)}
        </div>
        <div>
          <strong>Fecha de Pago:</strong> {formatDate(costo.fechaPago)}
        </div>
        <div>
          <strong>Cuenta de Giro:</strong> {costo.cuentaGiradora}
        </div>
        <div>
          <strong>Estado:</strong>
          <Status estado={estado} />
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <EditButton className="w-full" onClick={() => onEdit(costo._id)} />
          <DeleteButton
            className="w-full"
            onClick={() => onDelete(costo._id, costo.consecutivo)}
          />
        </div>
      </div>
    </div>
  );
};
ListaCostos.propTypes = {
  costos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      consecutivo: PropTypes.string.isRequired,
      fechaObligacion: PropTypes.string.isRequired,
      beneficiario: PropTypes.string.isRequired,
      concepto: PropTypes.string.isRequired,
      valorObligacion: PropTypes.number.isRequired,
      valorPagado: PropTypes.number,
      fechaPago: PropTypes.string,
      cuentaGiradora: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

CostoRow.propTypes = {
  costo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    consecutivo: PropTypes.string.isRequiered,
    fechaObligacion: PropTypes.string.isRequired,
    beneficiario: PropTypes.string.isRequired,
    concepto: PropTypes.string.isRequired,
    valorObligacion: PropTypes.number.isRequired,
    valorPagado: PropTypes.number,
    fechaPago: PropTypes.string,
    cuentaGiradora: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CostoRowMedium.propTypes = {
  costo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    consecutivo: PropTypes.string.isRequiered,
    fechaObligacion: PropTypes.string.isRequired,
    beneficiario: PropTypes.string.isRequired,
    concepto: PropTypes.string.isRequired,
    valorObligacion: PropTypes.number.isRequired,
    valorPagado: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CostoCard.propTypes = {
  costo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    consecutivo: PropTypes.string.isRequiered,
    fechaObligacion: PropTypes.string.isRequired,
    beneficiario: PropTypes.string.isRequired,
    concepto: PropTypes.string.isRequired,
    valorObligacion: PropTypes.number.isRequired,
    valorPagado: PropTypes.number,
    fechaPago: PropTypes.string,
    cuentaGiradora: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListaCostos;
