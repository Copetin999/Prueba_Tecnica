// src/api/omdbApi.js

const API_KEY = "tu_api_key_de_omdb"; // 🔹 Reemplaza con tu API key real de https://www.omdbapi.com/apikey.aspx
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Busca una película en la API de OMDb por título.
 * Devuelve los datos principales (título, año, director, género y póster).
 */
export const searchMovieByTitle = async (title) => {
  try {
    const res = await fetch(`${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === "True") {
      return {
        title: data.Title,
        year: data.Year,
        director: data.Director,
        genre: data.Genre,
        poster: data.Poster !== "N/A" ? data.Poster : "",
      };
    } else {
      console.warn(`No se encontró la película "${title}".`);
      return null;
    }
  } catch (error) {
    console.error("Error al consultar OMDb API:", error);
    return null;
  }
};

/**
 * Devuelve solo el póster de una película por título.
 * (Esta función se usa en Movies.jsx)
 */
export const fetchPoster = async (title) => {
  const movie = await searchMovieByTitle(title);
  return movie ? movie.poster : "";
};
