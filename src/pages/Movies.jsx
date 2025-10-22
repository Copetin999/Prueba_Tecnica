import React, { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import MovieCard from "../components/MovieCard";
import { fetchPoster } from "../api/omdbApi";
import { getMovies, addMovie, deleteMovie } from "../services/movieService";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [posters, setPosters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();

        // Filtramos solo películas válidas
        const validMovies = Array.isArray(data)
          ? data.filter((m) => m && m.id && m.title)
          : [];

        setMovies(validMovies);

        // Obtener pósters de OMDb de forma segura
        const postersData = {};
        for (const movie of validMovies) {
          const poster = await fetchPoster(movie.title);
          postersData[movie.id] = poster || "";
        }
        setPosters(postersData);
      } catch (error) {
        console.error("Error cargando películas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleAddMovie = async (values, { resetForm }) => {
    try {
      const newMovie = await addMovie(values);
      if (newMovie && newMovie.id) {
        const poster = await fetchPoster(newMovie.title);
        setMovies([...movies, newMovie]);
        setPosters({ ...posters, [newMovie.id]: poster });
        resetForm();
      }
    } catch (error) {
      console.error("Error al agregar película:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((m) => m.id !== id));
      const updatedPosters = { ...posters };
      delete updatedPosters[id];
      setPosters(updatedPosters);
    } catch (error) {
      console.error("Error al eliminar película:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Cargando películas...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        🎞️ Mis Películas
      </h2>

      <div className="mb-8">
        <MovieForm
          initialValues={{
            title: "",
            year: "",
            director: "",
            genre: "",
          }}
          onSubmit={handleAddMovie}
        />
      </div>

      {movies.length === 0 ? (
        <p className="text-center text-gray-600">No hay películas registradas</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) =>
            movie && movie.id ? (
              <MovieCard
                key={movie.id}
                movie={movie}
                poster={posters[movie.id]}
                onDelete={handleDelete}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

