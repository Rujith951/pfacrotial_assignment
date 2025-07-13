import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

const doctorsList = [
	"Dr. Smith",
	"Dr. Johnson",
	"Dr. Patel",
	"Dr. Lee",
	"Dr. Brown",
	"Dr. Rujith",
];

const AppointmentModal = ({ date, onClose, onSave, editingData }) => {
	const [patientName, setPatientName] = useState("");
	const [doctorName, setDoctorName] = useState("");
	const [time, setTime] = useState("");

	useEffect(() => {
		if (editingData) {
			setTime(editingData.time || "");
			setPatientName(editingData.patientName || "");
			setDoctorName(editingData.doctorName || "");
		} else {
			setTime("");
			setPatientName("");
			setDoctorName("");
		}
	}, [editingData]);

	const handleSubmit = () => {
		if (time && patientName && doctorName) {
			onSave(time, patientName, doctorName);
			setPatientName("");
			setDoctorName("");
			setTime("");
		}
	};

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-slate-800 md:w-[350px] p-6 rounded shadow-md relative">
				<h2 className="text-lg font-semibold mb-4 text-[#0e7a6c] dark:text-white">
					{editingData ? "Edit" : "Add"} Appointment – {date.toDateString()}
				</h2>

				<Input
					placeholder="Patient Name"
					value={patientName}
					onChange={e => setPatientName(e.target.value)}
				/>

				<select
					value={doctorName}
					onChange={e => setDoctorName(e.target.value)}
					className="
						w-full px-4 py-2 rounded-md text-sm 
						bg-white dark:bg-[#2a2a2a] 
						text-gray-800 dark:text-white
						border border-gray-300 dark:border-[#444]
						shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.02)] 
						focus:outline-none my-5
					"
				>
					<option value="">Select a doctor</option>
					{doctorsList.map((doctor, index) => (
						<option key={index} value={doctor}>
							{doctor}
						</option>
					))}
				</select>

				<input
					type="time"
					value={time}
					onChange={e => setTime(e.target.value)}
					className="
						w-full px-4 py-2 rounded-md text-sm 
						bg-white dark:bg-[#2a2a2a] 
						text-gray-800 dark:text-white
						border border-gray-300 dark:border-[#444]
						shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.02)] 
						focus:outline-none my-5 
					"
				/>

				<div className="flex justify-end gap-2">
					<Button onClick={onClose} title="Close" />
					<Button onClick={handleSubmit} type="green" title="Save" />
				</div>
			</div>
		</div>
	);
};

export default AppointmentModal;
