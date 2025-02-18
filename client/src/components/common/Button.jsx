import React from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

const Button = ({ type, onClick, label, icon, className }) => {
  const getButtonClass = () => {
    switch (type) {
      case "edit":
        return "text-blue-500 hover:text-blue-700";
      case "delete":
        return "text-red-500 hover:text-red-700";
      case "add":
        return "text-green-500 hover:text-green-700";
      default:
        return "text-gray-500 hover:text-gray-700";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getButtonClass()} flex items-center ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export const EditButton = ({ onClick, className }) => (
  <Button
    type="edit"
    onClick={onClick}
    label="Editar"
    icon={<FaEdit />}
    className={className}
  />
);

export const DeleteButton = ({ onClick, className }) => (
  <Button
    type="delete"
    onClick={onClick}
    label="Eliminar"
    icon={<FaTrashAlt />}
    className={className}
  />
);

export const AddButton = ({ onClick, className }) => (
  <Button
    type="add"
    onClick={onClick}
    label="Agregar"
    icon={<FaPlus />}
    className={className}
  />
);

export default Button;
