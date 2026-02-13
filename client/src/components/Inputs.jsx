import React from 'react';

export const BloodGroupSelect = ({ value, onChange, required = false }) => {
    return (
        <select value={value} onChange={onChange} required={required} className="form-select">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
        </select>
    );
};

export const DistrictSelect = ({ value, onChange, required = false }) => {
    const districts = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam",
        "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
    ];

    return (
        <select value={value} onChange={onChange} required={required} className="form-select">
            <option value="">Select District</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
    );
};
