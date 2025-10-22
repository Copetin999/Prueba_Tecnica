import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, poster, onDelete, onEdit }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition text-gray-100">
      <div className="h-56 flex items-center justify-center mb-4 overflow-hidden rounded-lg">
        {poster ? (
          <img
            src={poster}
            alt={`Poster de ${movie.title}`}
            className="max-h-56 object-contain rounded-lg"
          />
        ) : (
          <div className="text-sm text-gray-400">🎬 Sin póster disponible</div>
        )}
      </div>

      <h3 className="font-semibold text-lg">{movie.title}</h3>
      <p className="text-sm text-gray-400">
        {movie.year} • {movie.genre}
      </p>
      <p className="text-sm text-gray-400 mb-3">Dirigida por {movie.director}</p>

      <div className="mt-auto flex gap-2">
        <Link
          to={`/movies/${movie.id}`}
          className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Ver
        </Link>
        <button
          onClick={() => onEdit(movie)}
          className="px-3 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
