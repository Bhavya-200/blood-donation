import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../utils/api';

const Admin = () => {
    const [donors, setDonors] = useState([]);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUnverifiedDonors();
        }
    }, [isAuthenticated]);

    const fetchUnverifiedDonors = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/donors`);
            if (res.ok) {
                const data = await res.json();
                setDonors(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerify = async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/verify/${id}`, { method: 'POST' });
            if (res.ok) {
                setDonors(donors.filter(d => d.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="page-container" style={{ maxWidth: '400px', textAlign: 'center' }}>
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Admin Dashboard - Verify Donors</h2>
            {donors.length === 0 ? <p>No pending verifications.</p> : (
                <div className="donors-grid">
                    {donors.map(donor => (
                        <div key={donor.id} className="donor-card">
                            <h3>{donor.name}</h3>
                            <p><strong>Group:</strong> {donor.blood_group}</p>
                            <p><strong>District:</strong> {donor.district}</p>
                            <p><strong>Phone:</strong> {donor.phone}</p>
                            <button onClick={() => handleVerify(donor.id)} className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>Verify Donor</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;
