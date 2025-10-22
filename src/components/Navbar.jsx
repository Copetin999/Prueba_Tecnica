import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-600 shadow-lg text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🎬 Catálogo <span className="text-yellow-300">de Películas</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm opacity-90">Hola, {user.name || user.email}</span>
            <Link
              to="/movies"
              className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition"
            >
              Mis Películas
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
