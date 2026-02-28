/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1e3a5f',
                accent: '#00b4d8',
                'accent-light': '#90e0ef',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
