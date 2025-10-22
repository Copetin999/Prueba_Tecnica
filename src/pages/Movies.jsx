import React, { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import MovieCard from "../components/MovieCard";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../services/movieService";
import { searchMovieByTitle } from "../api/omdbApi";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [posters, setPosters] = useState({});

  useEffect(() => {
    const loadMovies = async () => {
      const data = await getMovies();
      setMovies(data);

      const postersData = {};
      for (const movie of data) {
        const movieData = await searchMovieByTitle(movie.title);
        postersData[movie.id] = movieData?.poster || "";
      }
      setPosters(postersData);
    };
    loadMovies();
  }, []);

  const handleAddMovie = async (values, { resetForm }) => {
    if (editingMovie) {
      const updated = await updateMovie(editingMovie.id, values);
      setMovies(movies.map((m) => (m.id === updated.id ? updated : m)));
      setEditingMovie(null);
    } else {
      const newMovie = await addMovie(values);
      setMovies([...movies, newMovie]);
    }
    resetForm();
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <div className="container mx-auto p-4 fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
        🎞️ Mis Películas
      </h2>

      <div className="mb-8">
        <MovieForm
          initialValues={
            editingMovie || {
              title: "",
              year: "",
              director: "",
              genre: "",
            }
          }
          onSubmit={handleAddMovie}
        />
        {editingMovie && (
          <p className="text-center text-yellow-400 mt-2">
            ✏️ Estás editando: <strong>{editingMovie.title}</strong>
          </p>
        )}
      </div>

      {movies.length === 0 ? (
        <p className="text-center text-gray-300">No hay películas registradas</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              poster={posters[movie.id]}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

