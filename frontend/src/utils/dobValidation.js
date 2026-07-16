const today = new Date();
today.setHours(0, 0, 0, 0);

export const maxDobDate = today.toISOString().split("T")[0];

export const validateDob = (value) => {
    if (!value) return "";
    const selected = new Date(value);
    selected.setHours(0, 0, 0, 0);
    if (selected > today) return "Date of birth cannot be a future date";
    return "";
};
