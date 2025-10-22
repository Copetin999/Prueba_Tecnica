import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login: guarda usuario en estado y localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout: limpia usuario
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Registro simulado (puedes conectar con userService.js después)
  const register = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto más fácilmente
export function useAuthContext() {
  return useContext(AuthContext);
}
