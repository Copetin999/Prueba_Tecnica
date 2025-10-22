// src/services/movieService.js

const BASE_URL = "/movies";

// 🔹 Obtener todas las películas
export const getMovies = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    // Validar que sea un array y asegurar que todas tengan un ID
    if (!Array.isArray(data)) return [];

    return data.map((movie) => ({
      ...movie,
      id: movie.id ?? crypto.randomUUID(), // genera un id si no existe
    }));
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
};

// 🔹 Obtener película por ID
export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener película:", error);
    return null;
  }
};

// 🔹 Agregar nueva película
export const addMovie = async (movie) => {
  try {
    const newMovie = { id: crypto.randomUUID(), ...movie };
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al agregar película:", error);
    return null;
  }
};

// 🔹 Actualizar película
export const updateMovie = async (id, updatedMovie) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar película:", error);
    return null;
  }
};

// 🔹 Eliminar película
export const deleteMovie = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar película:", error);
  }
};

