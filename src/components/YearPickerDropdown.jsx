import React from "react";

const YearPickerDropdown = ({
	currentYear,
	currentMonth,
	onSelectYear,
	onClose,
}) => {
	const years = Array.from({ length: 25 }, (_, i) => currentYear - 10 + i);

	return (
		<div className="absolute top-full mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg z-50 max-h-60 overflow-y-auto w-full scrollbar-thin">
			{years.map(y => (
				<div
					key={y}
					onClick={() => {
						const updated = new Date(currentMonth);
						updated.setFullYear(y);
						onSelectYear(updated);
						onClose();
					}}
					className={`px-4 py-1 cursor-pointer text-sm hover:bg-[#138d7c] hover:text-white ${
						y === currentYear
							? "font-semibold text-[#0e7a6c] dark:text-white"
							: ""
					}`}
				>
					{y}
				</div>
			))}
		</div>
	);
};

export default YearPickerDropdown;
