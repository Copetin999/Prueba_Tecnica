const BASE_URL = "http://localhost:4000/users";

// 🔹 Obtener todos los usuarios
export const getUsers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// 🔹 Buscar usuario por email y contraseña (login)
export const getUserByEmailAndPassword = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}?email=${email}&password=${password}`);
    const users = await res.json();
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return null;
  }
};

// 🔹 Registrar un nuevo usuario
export const registerUser = async (newUser) => {
  try {
    // Verificar si ya existe el correo
    const existingRes = await fetch(`${BASE_URL}?email=${newUser.email}`);
    const existing = await existingRes.json();
    if (existing.length > 0) return null; // ya existe

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    return await res.json();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
};
