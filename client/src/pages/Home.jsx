import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BloodGroupSelect, DistrictSelect } from '../components/Inputs';

const Home = () => {
    const navigate = useNavigate();
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?group=${encodeURIComponent(bloodGroup)}&district=${encodeURIComponent(district)}`);
    };

    return (
        <div className="home-container">
            <header className="hero">
                <h1>Donate Blood, Save Lives</h1>
                <p>Connect with blood donors in Kerala instantly during emergencies.</p>

                <div className="hero-search">
                    <form onSubmit={handleSearch} className="search-form">
                        <BloodGroupSelect value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
                        <DistrictSelect value={district} onChange={(e) => setDistrict(e.target.value)} required />
                        <button type="submit" className="btn btn-primary">Find Donors</button>
                    </form>
                </div>
            </header>

            <section className="features">
                <div className="feature-card">
                    <h2>Find Donors</h2>
                    <p>Search by blood group and location to find available donors near you.</p>
                </div>
                <div className="feature-card">
                    <h2>Register as Donor</h2>
                    <p>Join our community of lifesavers. Your donation can save a life.</p>
                </div>
                <div className="feature-card">
                    <h2>Request Blood</h2>
                    <p>Post a blood request in case of emergency to notify nearby donors.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
