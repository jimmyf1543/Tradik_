// Dependencias de node
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";
import listEndpoints from "express-list-endpoints";

// Dependencias propias
import { setupDB } from "./utils/db.mjs";
import { port } from "./config/keys.mjs";
import router from "./routes/index.mjs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors()); 

setupDB()
  .then(() => {

    app.use(router);

    const server = app.listen(port, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          `Escuchando el puerto ${port}. Visita http://localhost:${port}/ en tu navegador.`
        )}`
      );
      /*
      console.log(chalk.yellow("\nEndpoints disponibles:"));
      console.log(listEndpoints(app));*/
    });

    server.on("error", (error) => {
      console.error(
        `${chalk.red("✗ Error en el servidor:")} ${chalk.red(error.message)}`
      );
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error(
      `${chalk.red("✗ Error al conectar a la base de datos:")} ${chalk.red(
        error.message
      )}`
    );
    process.exit(1);
  });
