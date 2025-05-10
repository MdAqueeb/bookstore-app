import React, {useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
        }

        const payload = {
        email,
        password,
        confirmPassword,
        };

        try {
        const response = await fetch(`http://localhost:8080/ForgotPassword`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            navigate('/signin');
            alert("Password reset successful!");
            
        } else {
            throw new Error("Reset failed");
        }
        } catch (err) {
        console.error(err);
        alert("Something went wrong!");
        navigate('/')
        }
    };

    return (
    <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>

        <input
            type="password"
            placeholder="New Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded">
            Submit
        </button>
        </form>
    </div>
    );
};

export default ResetPassword;