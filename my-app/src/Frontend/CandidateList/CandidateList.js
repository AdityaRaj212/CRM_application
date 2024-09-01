import React, { useState, useEffect } from 'react';
import './CandidateList.css'; // Import the CSS file

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('list'); // New state for switching views
    const [companyFilter, setCompanyFilter] = useState(''); // For filtering by company
    const [jobFilter, setJobFilter] = useState(''); // For filtering by job
    const [activeTab, setActiveTab] = useState('Sourced'); // Active tab state
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
    
    useEffect(() => {
        // Fetch candidate data from the backend
        fetch('http://localhost:5000/candidates')
            .then(response => response.json())
            .then(data => {
                setCandidates(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching candidate data:', error);
                setError('Failed to load candidates');
                setLoading(false);
            });
    }, []);

    // Filter candidates based on search term, selected company, and job title
    const filteredCandidates = candidates.filter(candidate => 
        (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.companyName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (companyFilter === '' || candidate.companyName === companyFilter) &&
        (jobFilter === '' || candidate.jobTitle === jobFilter)
    );

    // Get unique companies and job titles for dropdown options
    const uniqueCompanies = [...new Set(candidates.map(candidate => candidate.companyName))];
    const uniqueJobs = [...new Set(candidates.map(candidate => candidate.jobTitle))];

    // Pagination variables
    const totalItems = filteredCandidates.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCandidates = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when items per page changes
    };
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // You may want to filter candidates based on the selected tab here
    };
    
    return (
        <div className="candidate-list-container">
            <div className="navbar">
                <div className="logo">
                    <img src="https://i.postimg.cc/qvj9xnhX/medium-fdcf543bf705ba87d62ffca3726a8baa.png" alt="Corecruiter Logo" className="logo-img" />
                    <h2><b>Corecruiter</b></h2>
                </div>
                
                <input
                        type="text"
                        placeholder="Search candidates,jobs,companies"
                        className="searchbar_1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                   
                <div className="profile-notifications">
                    <div className="notification-icon">
                        <span className="bell">&#128276;</span>
                    </div>
                    <div className="profile-pic">
                        <img src="https://i.postimg.cc/FHzhSk0M/145857007-307ce493-b254-4b2d-8ba4-d12c080d6651.jpg" alt="Profile" className="profile-img" />
                    </div>
                </div>
            </div>
            <div className="navbar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search candidate name, email"
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                        className="dropdown" 
                        value={companyFilter} 
                        onChange={(e) => setCompanyFilter(e.target.value)}
                    >
                        <option value="">Select Company</option>
                        {uniqueCompanies.map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    <select 
                        className="dropdown" 
                        value={jobFilter} 
                        onChange={(e) => setJobFilter(e.target.value)}
                    >
                        <option value="">Select Job</option>
                        {uniqueJobs.map((job, index) => (
                            <option key={index} value={job}>{job}</option>
                        ))}
                    </select>
                </div>

                <div className="actions-container">
                    <button
                        className={`view-toggle ${view === 'list' ? 'active' : ''}`}
                        onClick={() => setView('list')}
                    >
                        List
                    </button>
                    <button
                        className={`view-toggle ${view === 'board' ? 'active' : ''}`}
                        onClick={() => setView('board')}
                    >
                        Board
                    </button>
                    <button className="add-candidate">+ Add candidate</button>
                </div>
                
            </div>
            <div className="tabs-container">
                {['Sourced', 'Applied', 'Sent to AM', 'Sent to Client', 'Screening', 'Phone interview', 'On-site Interview Round 1', 'On-site Interview'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active-tab' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab} <span>{candidates.filter(candidate => candidate.status === tab).length}</span>
                    </button>
                ))}
            </div>
            <div className="pagination-tab">
            <div className="pagination-info">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} out of {totalItems} candidates
            </div>
            <div className="pagination-container">
                
                <div className="items-per-page">
                    <label htmlFor="itemsPerPage">Items/Page</label>
                    <select 
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <button 
                    className="pagination-button" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                <button 
                    className="pagination-button" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="error-message">{error}</div>}

            {view === 'list' && (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Social</th>
                                <th>City</th>
                                <th>Company</th>
                                <th>Job Title</th>
                                <th>Status</th>
                                <th>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCandidates.map(candidate => (
                                <tr key={candidate._id}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.phoneNumber}</td>
                                    <td>
                                        <a href={candidate.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                                        <a href={candidate.socialLinks.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                                        <a href={candidate.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                                        <a href={candidate.socialLinks.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                                    </td>
                                    <td>{candidate.city}</td>
                                    <td>{candidate.companyName}</td>
                                    <td>{candidate.jobTitle}</td>
                                    <td>{candidate.status}</td>
                                    <td>{candidate.owner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === 'board' && (
                <div className="board-view">
                    {/* Add board view layout here */}
                    <p>Board view coming soon...</p>
                </div>
            )}

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`pagination-button ${currentPage === pageNumber ? 'active-page' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CandidateList;
