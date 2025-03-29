/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background-gradient)",
                card: "var(--card-gradient)",
                button: "var(--button-gradient)",
                navFooter: "var(--nav-footer-gradient)",
            },
            textColor: {
                gradient: "var(--text-gradient)",
            },
        },
    },
    plugins: [],
};
