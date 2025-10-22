import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getUserByEmailAndPassword } from "../services/userService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await getUserByEmailAndPassword(
      formData.email,
      formData.password
    );

    if (user) {
      login(user);
      navigate("/movies");
    } else {
      setError("❌ Credenciales incorrectas, intenta nuevamente");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-96 space-y-5 transform hover:scale-[1.02] transition"
      >
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          🎬 Iniciar Sesión
        </h2>

        {error && (
          <div className="text-red-600 text-center bg-red-100 p-2 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
