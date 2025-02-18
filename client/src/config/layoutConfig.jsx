import { LuListChecks, LuCircleMinus, LuBadgeDollarSign } from "react-icons/lu";

const layoutConfig = [
  {
    title: "Solicitudes",
    path: "/requests",
    icon: <LuListChecks className="text-xl" />,
    pageTitle: "Gestión de Solicitudes",
  },
  {
    title: "Costos",
    path: "/costs",
    icon: <LuCircleMinus className="text-xl" />,
    pageTitle: "Gestión de Costos",
  },
  {
    title: "Ingresos",
    path: "/incomes",
    icon: <LuBadgeDollarSign className="text-xl" />,
    pageTitle: "Gestión de Ingresos",
  },
];

export default layoutConfig;
