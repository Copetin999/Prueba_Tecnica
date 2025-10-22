import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Pie de página */}
      <footer className="text-center text-gray-500 py-4 text-sm border-t">
        © {new Date().getFullYear()} Catálogo de Películas 🎬
      </footer>
    </div>
  );
}

