const DoctorCard = ({ doctor }) => {
    return (
        <div className="border p-4 rounded">
            <h3 className="font-bold">{doctor?.user?.name}</h3>
            <p>{doctor?.specialization}</p>
            <p>Experience: {doctor?.experience} years</p>
            <p>Fee: {doctor?.consultationFee}</p>
        </div>
    );
};

export default DoctorCard;
