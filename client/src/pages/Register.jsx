import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BloodGroupSelect, DistrictSelect } from '../components/Inputs';
import API_BASE_URL from '../utils/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        blood_group: '',
        phone: '',
        district: '',
        city: '',
        last_donation_date: '',
        availability: 'Available'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/donors/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration Successful! Please login.');
                navigate('/login');
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <div className="page-container">
            <h2>Register as a Donor</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Blood Group</label>
                    <div style={{ marginBottom: '10px' }}>
                        <BloodGroupSelect value={formData.blood_group} onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>District</label>
                    <div style={{ marginBottom: '10px' }}>
                        <DistrictSelect value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>City / Locality</label>
                    <input type="text" name="city" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Last Donation Date (Optional)</label>
                    <input type="date" name="last_donation_date" className="form-input" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register</button>
            </form>
        </div>
    );
};

export default Register;
