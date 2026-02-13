import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../utils/api';

const Login = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        // Simulate OTP sending
        if (phone.length >= 10) {
            setStep(2);
            alert('OTP sent: 1234'); // Simulation
        } else {
            setError('Please enter a valid phone number');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp === '1234') {
            try {
                const res = await fetch(`${API_BASE_URL}/api/donors/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Login Successful!');
                    navigate('/'); // In a real app, save token/user state here
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Login failed');
            }
        } else {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '400px' }}>
            <h2>Donor Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send OTP</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <div className="form-group">
                        <label>Enter OTP</label>
                        <input type="text" className="form-input" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Verify & Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;
