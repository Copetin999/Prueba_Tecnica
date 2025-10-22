import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth() || {}; // 👈 Previene error si AuthContext no está disponible

  return (
    <div className="container mx-auto text-center py-16">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        🎬 Bienvenido al Catálogo de Películas
      </h1>
      <p className="text-gray-600 mb-8">
        Registra tus películas favoritas y visualiza sus pósters desde OMDb.
      </p>

      {user ? (
        <Link
          to="/movies"
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver mis películas
        </Link>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
}
