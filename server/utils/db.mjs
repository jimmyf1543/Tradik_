// Dependencias de node
import "dotenv/config";
import chalk from "chalk";
import mongoose from "mongoose";

// Dependencias propias
import { database } from "../config/keys.mjs";

export const setupDB = async () => {
  try {
    await mongoose.connect(database.url);
    console.log(
      `${chalk.green("✓")} ${chalk.blue("Conectado a la base de datos!")}`
    );
  } catch (error) {
    console.error(
      `${chalk.red("✗ Error al conectar a la base de datos:")} ${chalk.red(
        error.message
      )}`
    );
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      "Mongoose conectado a la base de datos!"
    )}`
  );
});

mongoose.connection.on("error", (err) => {
  console.error(
    `${chalk.red("✗ Error en la conexión de Mongoose:")} ${chalk.red(
      err.message
    )}`
  );
});

mongoose.connection.on("disconnected", () => {
  console.log(
    `${chalk.yellow("⚠ Mongoose desconectado de la base de datos.")}`
  );
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log(
    `${chalk.yellow(
      "⚠ Conexión a la base de datos cerrada debido a la terminación de la aplicación."
    )}`
  );
  process.exit(0);
});
