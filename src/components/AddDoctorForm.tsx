import React, { useState } from 'react';

const AddDoctorForm = ({ onDoctorAdded }: { onDoctorAdded: () => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        location: '',
        fee: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Parse experience and fee as numbers
            const parsedData = {
                ...formData,
                experience: parseInt(formData.experience, 10),
                fee: parseInt(formData.fee, 10),
            };

            const response = await fetch('/api/addDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });

            if (response.ok) {
                alert('Doctor added successfully!');
                setFormData({
                    name: '',
                    specialization: '',
                    experience: '',
                    location: '',
                    fee: '',
                });
                onDoctorAdded(); // Notify parent to refresh the list
            } else {
                alert('Failed to add doctor.');
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('An error occurred while adding the doctor.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-doctor-form">
            <h3>Add Doctor</h3>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="experience"
                placeholder="Experience (in years)"
                value={formData.experience}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="fee"
                placeholder="Fee"
                value={formData.fee}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddDoctorForm;