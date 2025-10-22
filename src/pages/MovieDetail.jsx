import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import { fetchPoster } from "../api/omdbApi";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      const data = await getMovieById(id);
      setMovie(data);
      if (data) {
        const posterUrl = await fetchPoster(data.title);
        setPoster(posterUrl);
      }
    };
    loadMovie();
  }, [id]);

  if (!movie) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-xl shadow-md">
      <div className="text-center">
        {poster && <img src={poster} alt={movie.title} className="mx-auto rounded-lg" />}
        <h2 className="text-2xl font-bold mt-4">{movie.title}</h2>
        <p className="text-gray-600">{movie.year}</p>
        <p className="text-gray-600 mt-2">{movie.genre}</p>
        <p className="text-gray-600 mt-2">Dirigida por {movie.director}</p>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/movies"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
