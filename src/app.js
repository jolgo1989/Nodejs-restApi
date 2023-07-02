import express from "express";

//Importanto los mosulos routers
import employesRoutes from "./routers/employes.routes.js";
import indexRoutes from "./routers/index.routes.js";

const app = express();

app.use(express.json());

app.use("/api", indexRoutes);

app.use("/api", employesRoutes);

//Middleware para cuando no exista una ruta
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
