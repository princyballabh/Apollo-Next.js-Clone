import React from 'react';

type Doctor = {
    name: string;
    specialization: string;
    experience: number;
    location: string;
    fee: number;
};

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
    return (
        <div className="doctor-card">
            <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <p>{doctor.experience} years • {doctor.location}</p>
                <p>₹{doctor.fee}</p>
            </div>
            <div className="consult">
                <button>Consult Online</button>
            </div>
        </div>
    );
};

export default DoctorCard;