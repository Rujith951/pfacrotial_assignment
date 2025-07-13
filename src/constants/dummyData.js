export const dummyAppointments = {
	[new Date().toDateString()]: [
		{
			id: 1,
			time: "09:00 AM",
			patientName: "John Doe",
			doctorName: "Dr. Smith",
		},
		{
			id: 2,
			time: "10:30 AM",
			patientName: "Jane Roe",
			doctorName: "Dr. Taylor",
		},
		{
			id: 3,
			time: "02:00 PM",
			patientName: "Alice Brown",
			doctorName: "Dr. Morgan",
		},
	],

	[new Date(Date.now() + 86400000).toDateString()]: [
		{
			id: 4,
			time: "11:00 AM",
			patientName: "Tom Wilson",
			doctorName: "Dr. Adams",
		},
		{
			id: 5,
			time: "01:30 PM",
			patientName: "Lucy Green",
			doctorName: "Dr. Blake",
		},
	],

	[new Date(Date.now() + 2 * 86400000).toDateString()]: [
		{
			id: 6,
			time: "09:45 AM",
			patientName: "Mark Lee",
			doctorName: "Dr. Carter",
		},
		{
			id: 7,
			time: "03:15 PM",
			patientName: "Eva White",
			doctorName: "Dr. Moore",
		},
	],

	[new Date(Date.now() + 3 * 86400000).toDateString()]: [
		{
			id: 8,
			time: "10:00 AM",
			patientName: "Nathan Fox",
			doctorName: "Dr. Miller",
		},
		{
			id: 9,
			time: "04:00 PM",
			patientName: "Olivia King",
			doctorName: "Dr. Brooks",
		},
	],

	[new Date(Date.now() + 4 * 86400000).toDateString()]: [
		{
			id: 10,
			time: "08:30 AM",
			patientName: "Grace Hall",
			doctorName: "Dr. Evans",
		},
		{
			id: 11,
			time: "01:00 PM",
			patientName: "Liam Scott",
			doctorName: "Dr. Lewis",
		},
	],

	[new Date(Date.now() + 5 * 86400000).toDateString()]: [
		{
			id: 12,
			time: "11:30 AM",
			patientName: "Sophia Young",
			doctorName: "Dr. Perry",
		},
	],
};
