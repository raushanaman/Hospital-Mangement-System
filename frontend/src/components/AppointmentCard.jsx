const AppointmentCard = ({ appointment }) => {
    return (
        <div className="border p-4 rounded">
            <p>Date: {appointment?.date}</p>
            <p>Status: {appointment?.status}</p>
            <p>Doctor: {appointment?.doctor?.user?.name}</p>
            <p>Patient: {appointment?.patient?.user?.name}</p>
        </div>
    );
};

export default AppointmentCard;
