import { create, defaults, router as createRouter } from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener ruta absoluta (para que funcione en cualquier sistema)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear servidor
const server = create();
const router = createRouter(path.join(__dirname, '../../db/db.json'));
const middlewares = defaults();

server.use(middlewares);
server.use(router);

// Puerto del servidor
const PORT = 4000;

server.listen(PORT, () => {
  console.log(`🚀 Servidor JSON corriendo en http://localhost:${PORT}`);
});
