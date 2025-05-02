import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import DoctorCard from '../components/DoctorCard';
import Pagination from '../components/Pagination';

const Home = () => {
    const [doctors, setDoctors] = useState([]);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Optional: If backend provides total pages

    useEffect(() => {
        const fetchDoctors = async () => {
            const query = new URLSearchParams({ ...filters, page: page.toString(), limit: '10' });
            const response = await fetch(`/api/listDoctor?${query}`);
            const data = await response.json();
            setDoctors(data.doctors);

            // Optional: If backend provides total pages, update it here
            // setTotalPages(data.totalPages);
        };
        fetchDoctors();
    }, [filters, page]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to page 1 when filters change
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                <Filters onFilterChange={handleFilterChange} />
                <div className="doctor-list">
                    {doctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages} // Replace with actual total pages if available
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>
    );
};

export default Home;