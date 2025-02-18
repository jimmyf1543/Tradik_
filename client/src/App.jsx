import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout"
import IndexSolicitudes from "./pages/RequestPage";
import AddSolicitud from "./pages/RequestPage/add";
import EditSolicitud from "./pages/RequestPage/edit";
import IndexCostos from "./pages/CostPage";
import AddCost from "./pages/CostPage/add";
import EditCosto from "./pages/CostPage/edit";
import IndexIngresos from "./pages/IncomePage";
import AddIngreso from "./pages/IncomePage/add";
import EditIngreso from "./pages/IncomePage/edit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="costs" element={<IndexCostos />} />
          <Route path="costs/add" element={<AddCost />} />
          <Route path="costs/edit/:id" element={<EditCosto />} />
          <Route path="requests" element={<IndexSolicitudes />} />
          <Route path="requests/add" element={<AddSolicitud />} />
          <Route path="requests/edit/:id" element={<EditSolicitud />} />
          <Route path="incomes" element={<IndexIngresos />} />
          <Route path="incomes/add" element={<AddIngreso />} />
          <Route path="incomes/edit/:id" element={<EditIngreso/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
