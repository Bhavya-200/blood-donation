import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Search from './pages/Search';
import RequestBlood from './pages/RequestBlood';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/request" element={<RequestBlood />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}

export default App;
