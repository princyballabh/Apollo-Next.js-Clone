import React from 'react';

const DoctorCard = ({ doctor }: { doctor: any }) => {
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