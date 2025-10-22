const BASE_URL = "http://localhost:4001/users"; // 🔹 Asegúrate que coincida con tu json-server

// 🔹 Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return await res.json();
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};

// 🔹 Buscar usuario por email y contraseña (login)
export const getUserByEmailAndPassword = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}?email=${email}&password=${password}`);
    if (!res.ok) throw new Error("Error en la solicitud de login");

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

    if (existing.length > 0) {
      console.warn("Correo ya registrado");
      return null; // correo ya existe
    }

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error("Error al registrar usuario");

    return await res.json();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
};
