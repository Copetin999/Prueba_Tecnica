import { useAuthContext } from "../context/AuthContext";

// Hook personalizado para acceder al contexto de autenticación
export default function useAuth() {
  const context = useAuthContext();
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
