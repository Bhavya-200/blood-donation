import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../utils/api';

const Dashboard = () => {
    // In a real app, user data would come from context/auth state
    // simulating logged in user
    const [donor, setDonor] = useState({
        id: 1,
        name: 'John Doe',
        availability: 'Available',
        last_donation_date: '2023-01-01'
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/donors/${donor.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    availability: donor.availability,
                    last_donation_date: donor.last_donation_date
                })
            });
            if (res.ok) {
                alert('Profile Updated Successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '500px' }}>
            <h2>Donor Dashboard</h2>
            <div className="donor-card" style={{ marginBottom: '20px' }}>
                <h3>Welcome, {donor.name}</h3>
                <p>Manage your availability and donation status.</p>
            </div>

            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Availability Status</label>
                    <select
                        className="form-select"
                        value={donor.availability}
                        onChange={(e) => setDonor({ ...donor, availability: e.target.value })}
                    >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Last Donation Date</label>
                    <input
                        type="date"
                        className="form-input"
                        value={donor.last_donation_date}
                        onChange={(e) => setDonor({ ...donor, last_donation_date: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
};

export default Dashboard;
