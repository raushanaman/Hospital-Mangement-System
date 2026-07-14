const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="flex justify-center items-center p-10">
            <p>{message}</p>
        </div>
    );
};

export default Loader;
