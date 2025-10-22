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
    const user = await getUserByEmailAndPassword(formData.email, formData.password);
    if (user) {
      login(user);
      navigate("/movies");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Iniciar Sesión</h2>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

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
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
