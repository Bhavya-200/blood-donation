import React, { useState } from 'react';
import { BloodGroupSelect, DistrictSelect } from '../components/Inputs';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../utils/api';

const RequestBlood = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patient_name: '',
        blood_group: '',
        district: '',
        location: '',
        urgency: 'Normal',
        contact_number: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Blood request submitted successfully!');
                navigate('/');
            } else {
                alert('Failed to submit request');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '600px' }}>
            <h2>Request Blood</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Patient Name</label>
                    <input type="text" name="patient_name" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Blood Group Required</label>
                    <div style={{ marginBottom: '10px' }}>
                        <BloodGroupSelect value={formData.blood_group} onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>District</label>
                    <div style={{ marginBottom: '10px' }}>
                        <DistrictSelect value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Hospital / Location</label>
                    <input type="text" name="location" className="form-input" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Urgency Level</label>
                    <select name="urgency" className="form-select" onChange={handleChange}>
                        <option value="Normal">Normal</option>
                        <option value="Critical">Critical / Emergency</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Contact Number (Bystander)</label>
                    <input type="tel" name="contact_number" className="form-input" required onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', backgroundColor: '#d32f2f' }}>Submit Request</button>
            </form>
        </div>
    );
};

export default RequestBlood;
