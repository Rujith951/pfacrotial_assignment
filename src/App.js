import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import CalendarPage from "./pages/CalendarPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CalendarPage />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
