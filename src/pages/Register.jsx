import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { registerUser } from "../services/userService";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const newUser = await registerUser(formData);
    if (newUser) {
      register(newUser);
      navigate("/movies");
    } else {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Crear cuenta
        </h2>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div>
          <label className="block text-gray-700 text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Correo</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
