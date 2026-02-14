import API_BASE_URL from '../utils/api';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [donors, setDonors] = useState([]);
    const [filters, setFilters] = useState({
        group: searchParams.get('group') || '',
        district: searchParams.get('district') || ''
    });

    useEffect(() => {
        fetchDonors();
    }, [filters]);

    // Also fetch on mount if params exist
    useEffect(() => {
        setFilters({
            group: searchParams.get('group') || '',
            district: searchParams.get('district') || ''
        });
    }, [searchParams]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchDonors = async () => {
        setLoading(true);
        setError('');
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await fetch(`${API_BASE_URL}/api/donors?${query}`);
            if (res.ok) {
                const data = await res.json();
                setDonors(data);
            } else {
                setError('Failed to fetch donors');
            }
        } catch (error) {
            console.error("Failed to fetch donors", error);
            setError('Network error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="page-container">
            <h2>Find Blood Donors</h2>
            <div className="search-filters">
                <BloodGroupSelect value={filters.group} onChange={(e) => handleFilterChange('group', e.target.value)} />
                <DistrictSelect value={filters.district} onChange={(e) => handleFilterChange('district', e.target.value)} />
                <button onClick={fetchDonors} className="btn btn-secondary">Search</button>
            </div>

            <div className="donors-grid">
                {loading && <p>Loading donors...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && donors.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p>No donors found.</p>
                        <p><strong>Note:</strong> Since this is a demo, the database resets on every update.</p>
                        <p>Please <a href="/register">Register</a> yourself first.</p>
                    </div>
                )}

                {!loading && !error && donors.length > 0 && (
                    donors.map(donor => (
                        <div key={donor.id} className="donor-card">
                            <h3>{donor.name}</h3>
                            <p><strong>Group:</strong> {donor.blood_group}</p>
                            <p><strong>Location:</strong> {donor.city}, {donor.district}</p>
                            <p><strong>Age:</strong> {donor.age}</p>
                            <div className="donor-status">
                                {donor.availability === 'Available' ?
                                    <span className="status-badge available"><CheckCircle size={16} /> Available</span> :
                                    <span className="status-badge unavailable"><XCircle size={16} /> Not Available</span>
                                }
                            </div>
                            <a href={`tel:${donor.phone}`} className="btn btn-primary contact-btn">
                                <Phone size={16} /> Call {donor.phone}
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;
