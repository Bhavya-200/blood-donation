import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">Blood Kerala</Link>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </div>

                <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search" className="nav-link" onClick={() => setIsOpen(false)}>Find Donor</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/request" className="nav-link" onClick={() => setIsOpen(false)}>Request Blood</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>Register as Donor</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>Admin</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
