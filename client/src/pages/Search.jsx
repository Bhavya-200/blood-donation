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

    const fetchDonors = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await fetch(`${API_BASE_URL}/api/donors?${query}`);
            if (res.ok) {
                const data = await res.json();
                setDonors(data);
            }
        } catch (error) {
            console.error("Failed to fetch donors", error);
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
                {donors.length > 0 ? (
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
                ) : (
                    <p>No donors found. Try adjusting filters.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
