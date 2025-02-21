<h3 align="center">Gestor de Solicitudes Tradik</h3>

<div align="center">

[![Estado](https://img.shields.io/badge/estado-activo-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Un sistema de gestión de solicitudes diseñado para optimizar y facilitar la administración de solicitudes en un entorno organizacional.
    <br>
</p>

## 📝 Tabla de Contenidos

- [Acerca del Proyecto](#about)
- [Primeros Pasos](#getting_started)
- [Despliegue](#deployment)
- [Tecnologías Utilizadas](#built_using)

## 🧐 Acerca del Proyecto <a name = "about"></a>

Tradik es un gestor de solicitudes que permite a las organizaciones manejar de manera eficiente diferentes tipos de solicitudes mediante una interfaz web intuitiva y una infraestructura backend robusta. Su arquitectura está basada en tecnologías modernas para garantizar escalabilidad y rendimiento.

## 🏁 Primeros Pasos <a name = "getting_started"></a>

Estas instrucciones te ayudarán a obtener una copia del proyecto en tu máquina local para propósitos de desarrollo y pruebas. Consulta la sección de [despliegue](#deployment) para conocer cómo implementarlo en un entorno productivo.

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Instalación

#### Backend

1. Abre la terminal en la raíz del proyecto.
2. Accede a la carpeta del backend:
   ```sh
   cd ./server
   ```
3. Instala las dependencias necesarias:
   ```sh
   npm install
   ```
4. Configura el archivo `.env` con los siguientes datos:
   ```sh
   PORT=3000
   URL_SERVER=http://localhost:3000
   MONGO_URI=mongodb://127.0.0.1:27017/midb
   CLIENT_URL=http://localhost:8080
   BASE_API_URL=api
   ```
   Puedes copiar el archivo `.EnvExample`, renombrarlo como `.env` y modificarlo según sea necesario.
5. Inicia el backend:
   ```sh
   npm run dev
   ```

#### Frontend

1. Abre la terminal en la raíz del proyecto.
2. Accede a la carpeta del frontend:
   ```sh
   cd ./client
   ```
3. Instala las dependencias necesarias:
   ```sh
   npm install
   ```
4. Configura el archivo `.env` con la siguiente variable:
   ```sh
   VITE_API_URL="ruta/de/la/api"
   ```
   Para pruebas, puedes copiar el archivo `.EnvExample`, renombrarlo como `.env` y modificarlo según sea necesario.
5. Inicia el frontend:
   ```sh
   npm run dev
   ```

⚠ **Nota:** El backend debe estar en ejecución antes de iniciar el frontend.

## 🔧 Pruebas <a name = "tests"></a>

### Pruebas de Estilo de Código

Explicación sobre pruebas de estilo de código y linters.

```sh
# Ejemplo de comando para ejecutar ESLint
npm run lint
```

## 🚀 Despliegue <a name = "deployment"></a>

Pasos adicionales para desplegar el proyecto en un entorno en vivo.

## ⛏️ Tecnologías Utilizadas <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Base de Datos
- [Express](https://expressjs.com/) - Framework del Servidor
- [React](https://reactjs.org/) - Biblioteca de Frontend
- [Node.js](https://nodejs.org/en/) - Entorno de Ejecución del Servidor
- [Vite](https://v5.vite.dev/) - Herramienta ehecucion del frontend

