import React, { useState, useEffect } from "react";
import ToggleButton from "./ToggleButton";

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(
		localStorage.getItem("theme") === "dark" ? true : false
	);

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
		setIsDark(!isDark);
	};

	useEffect(() => {
		const isDarkStored = localStorage.getItem("theme") === "dark";
		if (isDarkStored) {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	return (
		<ToggleButton
			checked={isDark}
			setChecked={setIsDark}
			toggleTheme={toggleTheme}
		/>
	);
};

export default ThemeToggle;
