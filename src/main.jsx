import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CardPage from "./pages/cards/CardPage.jsx";
import TypesList from "./pages/type/TypesList.jsx";

//TODO: Mejorar el tema de las evoluciones cuando son diferentes opciones.
//TODO: Arreglar el filtro por tipo, imágenes que no aparecen, pokemones que se repiten cuando debería aparecer otra forma, y paginación.
//TODO: Agregar a la tarjeta del Pokemon detallada formas y megas.

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "pokemon/:id",
    element: <CardPage />,
  },
  {
    path: "type/:type",
    element: <TypesList />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
