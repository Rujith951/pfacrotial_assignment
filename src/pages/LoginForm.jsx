import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import ThemeToggle from "../components/ThemeToggle";

const validEmail = "staff@clinic.com";
const validPassword = "123456";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const validate = () => {
		const newErrors = { email: "", password: "" };

		if (!email) {
			newErrors.email = "Email is required.";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Enter a valid email.";
		}

		if (!password) {
			newErrors.password = "Password is required.";
		} else if (password.length < 6) {
			newErrors.password = "Minimum 6 characters required.";
		}

		setErrors(newErrors);
		return !newErrors.email && !newErrors.password;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (validate()) {
			if (email === validEmail && password === validPassword) {
				navigate("/", { replace: true });
			} else {
				setErrors(prev => ({
					...prev,
					password: "Incorrect email or password.",
				}));
			}
		}
	};

	return (
		<div className="min-h-screen relative flex items-center justify-center bg-gray-100 dark:bg-[#121212] p-4">
			<div className="w-full max-w-sm p-6 rounded-xl shadow-xl bg-white dark:bg-[#1e1e1e]">
				<h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
					Login
				</h2>

				<form onSubmit={handleSubmit} className="flex flex-col gap-1">
					<div>
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Enter your email"
						/>
						<span
							className={`text-xs text-red-500 transition-opacity duration-300 ${
								errors.email ? "opacity-100 visible" : "opacity-0 invisible"
							}`}
						>
							{errors.email || "placeholder"}
						</span>
					</div>

					<div>
						<Input
							label="Password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="Enter your password"
						/>
						<span
							className={`text-xs text-red-500 transition-opacity duration-300 ${
								errors.password ? "opacity-100 visible" : "opacity-0 invisible"
							}`}
						>
							{errors.password || "placeholder"}
						</span>
					</div>

					<Button type="green" title="Login" />
				</form>
			</div>
			<div className="absolute top-4 right-4">
				<div className="relative">
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
