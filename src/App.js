import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./components/CalendarPage";
import LoginForm from "./pages/LoginForm";

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
