import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import DoctorCard from '../components/DoctorCard';
import Pagination from '../components/Pagination';
import AddDoctorForm from '../components/AddDoctorForm';

const Home = () => {
    const [doctors, setDoctors] = useState([]);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const fetchDoctors = async () => {
        const query = new URLSearchParams({ ...filters, page: page.toString(), limit: '10' });
        const response = await fetch(`/api/listDoctor?${query}`);
        const data = await response.json();
        setDoctors(data.doctors);
    };

    useEffect(() => {
        fetchDoctors();
    }, [filters, page]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const handleDoctorAdded = () => {
        setShowForm(false);
        fetchDoctors(); 
    };

    return (
        <div className="container">
            <Header />
            <button onClick={toggleForm} className="add-doctor-button">
                Add Doctor
            </button>
            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={toggleForm} className="close-button">
                            &times;
                        </button>
                        <AddDoctorForm onDoctorAdded={handleDoctorAdded} />
                    </div>
                </div>
            )}
            <div className="content">
                <Filters onFilterChange={handleFilterChange} />
                <div className="doctor-list">
                    {doctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>
    );
};

export default Home;