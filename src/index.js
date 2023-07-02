import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`Servidor concetado en el el puerto: ${PORT}`);
});
