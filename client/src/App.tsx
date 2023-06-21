import { Route, Routes } from "react-router-dom";
import Layout from "./components/molecules/Layout";
import RequireAuth from "./components/molecules/RequireAuth";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ikan from "./pages/Ikan";
import Produksi from "./pages/Produksi";
import TambahIkan from "./pages/TambahIkan";
import TambahProduksi from "./pages/TambahProduksi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/dataproduksi" element={<Produksi />}>
            <Route path="tambahproduksi" element={<TambahProduksi />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dataikan" element={<Ikan />}>
            <Route path="tambahikan" element={<TambahIkan />} />
          </Route>
        </Route>
        {/* Error Routes */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
