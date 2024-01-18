/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        customGreen: '#00FDCF',
        accent: {
          100: '#3C50E0',
        },
        'custom-gray': 'rgba(255, 255, 255, 0.15)', // Ajout de la couleur de fond personnalisée
      },
      boxShadow: {
        custom: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'custom-light': '0 4px 4px rgba(0, 0, 0, 0.25)', // Ajout de l'ombre personnalisée
      },
      borderRadius: {
        'custom': '8px', // Ajout du border-radius personnalisé
      },
      backdropFilter: {
        'blur': 'blur(22px)',
        'custom-blur': 'blur(8px)', // Ajout du flou d'arrière-plan personnalisé
      },
    },
  },
  plugins: [],
}