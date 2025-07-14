import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";
import ThemeToggle from "../components/ThemeToggle";
import AppointmentModal from "../components/AppointmentModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import YearPickerDropdown from "../components/YearPickerDropdown";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const CalendarPage = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [appointments, setAppointments] = useState(() => {
		try {
			const stored = localStorage.getItem("appointments");
			const parsed = stored ? JSON.parse(stored) : {};
			return parsed;
		} catch (e) {
			console.error("Failed to parse appointments from localStorage", e);
			return {};
		}
	});

	const [showModal, setShowModal] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [editingAppointment, setEditingAppointment] = useState(null);
	const [showYearPicker, setShowYearPicker] = useState(false);

	const isMobile = useMediaQuery({ maxWidth: 768 });
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem("appointments", JSON.stringify(appointments));
	}, [appointments]);

	// const handleDateClick = date => {
	// 	const today = new Date();
	// 	today.setHours(0, 0, 0, 0);

	// 	if (date < today) return;

	// 	setSelectedDate(date);
	// 	setEditingAppointment(null);
	// 	setShowModal(true);
	// };

	const handleDateClick = date => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Prevent clicking days not from the currently visible month
		if (
			date.getMonth() !== currentMonth.getMonth() ||
			date.getFullYear() !== currentMonth.getFullYear()
		) {
			return;
		}

		// Prevent clicking past dates
		if (date < today) return;

		setSelectedDate(date);
		setEditingAppointment(null);
		setShowModal(true);
	};

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn");

		if (!isLoggedIn) {
			navigate("/login");
		}
	}, []);

	// const handlePrevMonth = () => {
	// 	const newDate = new Date(currentMonth);
	// 	newDate.setMonth(newDate.getMonth() - 1);
	// 	setCurrentMonth(newDate);
	// };

	const handlePrevMonth = () => {
		const today = new Date();
		const currentYear = currentMonth.getFullYear();
		const currentMonthIndex = currentMonth.getMonth();

		const isCurrentMonthBeforeToday =
			currentYear < today.getFullYear() ||
			(currentYear === today.getFullYear() &&
				currentMonthIndex <= today.getMonth());

		if (isCurrentMonthBeforeToday) {
			// Prevent navigating to past months
			return;
		}

		const newDate = new Date(currentMonth);
		newDate.setMonth(currentMonth.getMonth() - 1);

		// Only update if newDate is still in or after current month
		if (
			newDate.getFullYear() > today.getFullYear() ||
			(newDate.getFullYear() === today.getFullYear() &&
				newDate.getMonth() >= today.getMonth())
		) {
			setCurrentMonth(newDate);
		}
	};

	const handleNextMonth = () => {
		const newDate = new Date(currentMonth);
		newDate.setMonth(newDate.getMonth() + 1);
		setCurrentMonth(newDate);
	};

	const handleToday = () => {
		setCurrentMonth(new Date());
		setSelectedDate(new Date());
	};

	const saveAppointment = (time, patientName, doctorName) => {
		const dateStr = selectedDate.toDateString();
		setAppointments(prev => {
			const dateAppts = prev[dateStr] || [];
			if (editingAppointment) {
				return {
					...prev,
					[dateStr]: dateAppts.map(appt =>
						appt.id === editingAppointment.id
							? { ...appt, time, patientName, doctorName }
							: appt
					),
				};
			} else {
				const newAppt = {
					id: Date.now(),
					time,
					patientName,
					doctorName,
				};
				return {
					...prev,
					[dateStr]: [...dateAppts, newAppt],
				};
			}
		});
		setShowModal(false);
		setEditingAppointment(null);
	};

	const handleEdit = (appt, date) => {
		setSelectedDate(new Date(date));
		setEditingAppointment(appt);
		setShowModal(true);
	};

	const handleDelete = (id, dateStr) => {
		setAppointments(prev => {
			const dateAppts = prev[dateStr] || [];
			const updatedAppts = dateAppts.filter(appt => appt.id !== id);

			const updated = { ...prev };
			if (updatedAppts.length > 0) {
				updated[dateStr] = updatedAppts;
			} else {
				delete updated[dateStr];
			}
			return updated;
		});
	};

	const monthName = currentMonth.toLocaleString("default", { month: "long" });
	const year = currentMonth.getFullYear();

	const datesInMonth = Array.from({ length: 31 }, (_, i) => {
		const date = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			i + 1
		);
		return date.getMonth() === currentMonth.getMonth() ? date : null;
	}).filter(Boolean);

	return (
		<div className="h-screen bg-white dark:bg-black text-gray-800 dark:text-white">
			<div className="w-full h-full mx-auto">
				<div className="flex-1 overflow-hidden h-full">
					{isMobile ? (
						<div className="p-4 overflow-y-auto h-full relative">
							<div className="w-full fixed top-0 left-0 z-10 bg-white dark:bg-black p-3 ring-0 flex justify-between items-center">
								<div className="flex items-center gap-2 min-w-[214px] max-w-[214px]">
									<button
										onClick={handlePrevMonth}
										className="text-[#0e7a6c] hover:text-[#138d7c]"
									>
										<FaChevronLeft className="w-5 h-5" />
									</button>
									<h2
										className="text-lg font-semibold cursor-pointer"
										onClick={() => setShowYearPicker(prev => !prev)}
									>
										{monthName} {year}
									</h2>
									<button
										onClick={handleNextMonth}
										className="text-[#0e7a6c] hover:text-[#138d7c]"
									>
										<FaChevronRight className="w-5 h-5" />
									</button>

									{showYearPicker && (
										<YearPickerDropdown
											currentYear={year}
											currentMonth={currentMonth}
											onSelectYear={setCurrentMonth}
											onClose={() => setShowYearPicker(false)}
										/>
									)}
								</div>

								<div className="w-fit flex items-center gap-2">
									<ThemeToggle />
									<div className="flex justify-end min-w-fit">
										<Button
											title="Logout"
											onClick={() => {
												localStorage.removeItem("appointments");
												localStorage.removeItem("isLoggedIn");
												navigate("/login");
											}}
										/>
									</div>
								</div>
							</div>

							{datesInMonth.map((date, index) => {
								const dateStr = date.toDateString();
								const dailyAppointments = appointments[dateStr] || [];
								return (
									<div
										key={dateStr}
										className={`mb-2 ${index === 0 ? "mt-14" : "mt-0"}`}
									>
										<div className="flex items-center justify-between border-b-[1px] border-gray-300 dark:border-gray-600 pb-2">
											<h3 className="font-medium mb-2">
												Appointments for{" "}
												{date.toLocaleString("default", { month: "long" })}{" "}
												{date.getDate()}
											</h3>

											{date >= new Date().setHours(0, 0, 0, 0) && (
												<button
													onClick={() => {
														setSelectedDate(date);
														setEditingAppointment(null);
														setShowModal(true);
													}}
													className="p-2 mt-2 bg-[#0e7a6c] text-white rounded hover:bg-[#138d7c]"
												>
													+
												</button>
											)}
										</div>

										{dailyAppointments.map(appt => (
											<div
												key={appt.id}
												className="bg-[#0e7a6c] text-white rounded px-2 py-1 mb-1 text-sm flex justify-between items-center gap-2"
											>
												<div className="truncate w-[80%]">
													{appt.time} - {appt.patientName}
												</div>
												<div className="flex gap-2">
													<button
														onClick={() => handleEdit(appt, dateStr)}
														className="text-xs underline"
													>
														Edit
													</button>
													<button
														onClick={e => {
															e.stopPropagation();
															handleDelete(appt.id, dateStr);
														}}
														className="text-[#f00] underline text-[10px] ml-2"
													>
														Delete
													</button>
												</div>
											</div>
										))}
									</div>
								);
							})}
						</div>
					) : (
						<>
							<div className="flex justify-between items-center p-3 bg-white dark:bg-black">
								<div className="relative min-w-[214px] max-w-[214px] flex flex-col items-center">
									<div className="flex items-center justify-between w-full">
										<button
											onClick={handlePrevMonth}
											className="text-2xl text-[#0e7a6c] hover:text-[#138d7c]"
										>
											<FaChevronLeft className="text-[#0e7a6c] hover:text-[#138d7c] transition-colors w-5 h-5" />
										</button>

										<h2
											className="text-xl font-semibold text-[#0e7a6c] cursor-pointer"
											onClick={() => setShowYearPicker(prev => !prev)}
										>
											{monthName} {year}
										</h2>

										<button
											onClick={handleNextMonth}
											className="text-2xl text-[#0e7a6c] hover:text-[#138d7c]"
										>
											<FaChevronRight className="text-[#0e7a6c] hover:text-[#138d7c] transition-colors w-5 h-5" />
										</button>
									</div>

									{showYearPicker && (
										<YearPickerDropdown
											currentYear={year}
											currentMonth={currentMonth}
											onSelectYear={setCurrentMonth}
											onClose={() => setShowYearPicker(false)}
										/>
									)}
								</div>

								<div className="flex gap-2">
									<button
										onClick={handleToday}
										className="px-4 py-1 rounded bg-[#0e7a6c] text-white hover:bg-[#138d7c]"
									>
										Today
									</button>
									<button
										onClick={() => {
											setEditingAppointment(null);
											setShowModal(true);
										}}
										className="px-4 py-1 rounded border border-[#0e7a6c] text-[#0e7a6c] hover:bg-[#138d7c] hover:text-white"
									>
										+ Add Appointment
									</button>
									<ThemeToggle />
									<div>
										<Button
											title="Logout"
											onClick={() => {
												localStorage.removeItem("appointments");
												localStorage.removeItem("isLoggedIn");
												navigate("/login");
											}}
										/>
									</div>
								</div>
							</div>
							<div className="calendar_container">
								<Calendar
									className="rounded-lg shadow-lg min-w-full overflow-hidden bg-white dark:bg-slate-700 text-black dark:text-white"
									onClickDay={handleDateClick}
									tileClassName={({ date }) => {
										const today = new Date();
										today.setHours(0, 0, 0, 0);

										if (date < today) {
											return "past-day";
										}
										if (date.toDateString() === today.toDateString()) {
											return "today";
										}
										if (date > today) {
											return "future-day";
										}
										return null;
									}}
									showNavigation={false}
									value={selectedDate}
									activeStartDate={currentMonth}
									onActiveStartDateChange={({ activeStartDate }) =>
										setCurrentMonth(activeStartDate)
									}
									tileContent={({ date }) => {
										const dateStr = date.toDateString();
										const events = appointments[dateStr] || [];
										return (
											<div className="flex w-full flex-col gap-1 max-w-[160px] overflow-y-auto px-1">
												{events.map(appt => (
													<div
														key={appt.id}
														className="bg-[#0e7a6c] gap-1 text-white rounded text-xs px-1 py-0.5 flex justify-between items-center"
														title={`${appt.time} - ${appt.patientName}`}
													>
														<div className="truncate w-36 overflow-hidden text-start text-[10px]">
															{appt.time} - {appt.patientName}
														</div>
														<div className="flex gap-2 ml-2">
															<button
																onClick={() => handleEdit(appt, dateStr)}
																className="text-white underline text-[7px]"
															>
																Edit
															</button>
															<button
																onClick={e => {
																	e.stopPropagation();
																	handleDelete(appt.id, dateStr);
																}}
																className="text-[#de6e6e] underline text-[7px] ml-2"
															>
																Delete
															</button>
														</div>
													</div>
												))}
											</div>
										);
									}}
								/>
							</div>
						</>
					)}

					{showModal && (
						<AppointmentModal
							date={selectedDate}
							onClose={() => {
								setShowModal(false);
								setEditingAppointment(null);
							}}
							onSave={saveAppointment}
							editingData={editingAppointment}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default CalendarPage;
