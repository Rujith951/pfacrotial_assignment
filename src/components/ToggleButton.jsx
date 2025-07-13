import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

const ToggleButton = ({ checked, setChecked, toggleTheme }) => {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	const sizeClass = isMobile
		? {
				label: "w-14 h-8",
				iconWrapper: "w-8 h-8 scale-90",
				leftChecked: "left-6",
				leftUnchecked: "left-0",
				iconSize: "text-base",
		  }
		: {
				label: "w-20 h-10",
				iconWrapper: "w-10 h-10 scale-90",
				leftChecked: "left-10",
				leftUnchecked: "left-0",
				iconSize: "text-lg",
		  };

	return (
		<label
			className={`relative flex items-center cursor-pointer ${sizeClass.label}`}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={() => {
					setChecked(!checked);
					toggleTheme();
				}}
				className="sr-only peer"
			/>

			<span
				className={`absolute inset-0 rounded-full transition-colors duration-300 ${
					checked ? "bg-[#222]" : "bg-neutral-200"
				}`}
			></span>

			<i
				className={`absolute rounded-full transform transition-all duration-500
					flex items-center justify-center
					bg-gradient-to-b
					${sizeClass.iconWrapper} 
					${
						checked
							? `from-[#444] to-[#222] ${sizeClass.leftChecked}`
							: `from-[#ddd] to-[#bbb] ${sizeClass.leftUnchecked}`
					}
				`}
			>
				{checked ? (
					<FiMoon className={`text-white ${sizeClass.iconSize}`} />
				) : (
					<FiSun className={`text-white ${sizeClass.iconSize}`} />
				)}
			</i>
		</label>
	);
};

export default ToggleButton;
