import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder }) => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200">
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="
					w-full px-4 py-2 rounded-md text-sm 
					bg-white dark:bg-[#2a2a2a] 
					text-gray-800 dark:text-white
					border border-gray-300 dark:border-[#444]
					shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.02)] 
					focus:outline-none 
				"
			/>
		</div>
	);
};

export default Input;
