// import React from "react";

// const Button = ({ title = "", type = "green", disabled = false, onClick }) => {
// 	const baseStyle =
// 		"px-4 py-2 rounded-md font-medium text-sm transition duration-200";

// 	const greenStyle = `
// 		bg-[#107a6c] text-white
// 		hover:bg-[#138d7c]
// 	`;

// 	const whiteStyle = `
// 		bg-white text-[#107a6c] border border-gray-300
// 		hover:bg-gray-100
// 	`;

// 	const disabledStyle = "opacity-30 cursor-not-allowed";

// 	return (
// 		<button
// 			onClick={onClick}
// 			disabled={disabled}
// 			className={`${baseStyle} ${type === "green" ? greenStyle : whiteStyle} ${
// 				disabled ? disabledStyle : "cursor-pointer"
// 			}`}
// 		>
// 			{title}
// 		</button>
// 	);
// };

// export default Button;

import React from "react";

const Button = ({ title = "", type = "green", disabled = false, onClick }) => {
	const baseStyle =
		"px-4 py-2 rounded-md font-medium text-sm transition duration-200";

	const greenStyle = `
		bg-[#107a6c] text-white hover:bg-[#138d7c]
		dark:bg-[#222] dark:text-white dark:hover:bg-[#333]
	`;

	const whiteStyle = `
		bg-white text-[#107a6c] border border-gray-300 hover:bg-gray-100
		dark:bg-[#2a2a2a] dark:text-white dark:border-[#444] dark:hover:bg-[#333]
	`;

	const disabledStyle = "opacity-30 cursor-not-allowed";

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyle} ${type === "green" ? greenStyle : whiteStyle} ${
				disabled ? disabledStyle : "cursor-pointer"
			} w-full`}
		>
			{title}
		</button>
	);
};

export default Button;
