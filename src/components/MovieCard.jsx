import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, poster, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition">
      <div className="h-56 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-100">
        {poster ? (
          <img
            src={poster}
            alt={`Poster de ${movie.title}`}
            className="max-h-56 object-contain"
          />
        ) : (
          <div className="text-sm text-gray-500">Sin póster disponible</div>
        )}
      </div>

      <h3 className="font-semibold text-lg text-gray-800">{movie.title}</h3>
      <p className="text-sm text-gray-600">
        {movie.year} • {movie.genre}
      </p>
      <p className="text-sm text-gray-500 mb-3">
        Dirigida por {movie.director}
      </p>

      <div className="mt-auto flex gap-2">
        <Link
          to={`/movies/${movie.id}`}
          className="px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          Ver
        </Link>
        <button
          onClick={() => onEdit(movie)}
          className="px-3 py-1 rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="px-3 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
