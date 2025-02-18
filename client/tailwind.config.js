// tailwind.config.js
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Asegúrate de que las rutas estén correctas
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "#005c8a", // Color de fondo del sidebar
        "sidebar-text": "#c9dbe6", // Color del texto e iconos en el sidebar
        "titlebar-bg": "#f3f7fc", // Color de fondo del titlebar
      },
    },
  },
  plugins: [],
};
