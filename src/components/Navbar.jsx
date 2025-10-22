import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-blue-600">
          🎬 Catálogo Películas
        </Link>

        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-500">
            Inicio
          </Link>

          {user ? (
            <>
              <Link to="/movies" className="hover:text-blue-500">
                Mis Películas
              </Link>
              <button
                onClick={logout}
                className="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}