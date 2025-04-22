import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard"; // Asegúrate de crear este componente
import ErrorPage from "./pages/ErrorPage"; // Crea un componente de error personalizado

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<Layout />} 
      errorElement={<ErrorPage />}
    >
      <Route index element={<Home />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);