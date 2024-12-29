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

//TODO: Ver alguna forma de mejorar la performance de la página.
//TODO: Mejorar el tema de las evoluciones cuando son diferentes opciones.
//TODO: Agregar un filtro por tipo.
//TODO: Agregar un filtro por generación.
//TODO: Agregar a la tarjeta del Pokemon detallada formas y megas.
//TODO: Agregar a la tarjeta del Pokemon detallada habilidades.
//TODO: Mejorar el botón de regreso de la página de la carta para que regrese a la página anterior tal cual estaba, y no al inicio.

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
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
