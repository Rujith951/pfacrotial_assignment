/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	colors: {
		primary: {
			light: "#0e7a6c",
			dark: "#000000",
		},
		background: {
			light: "#ffffff",
			dark: "#0f172a",
		},
		text: {
			light: "#1f2937",
			dark: "#f8fafc",
		},
	},
	plugins: [],
};
