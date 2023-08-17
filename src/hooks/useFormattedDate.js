import { useState, useEffect } from 'react';

const useFormattedDate = (inputDateString) => {
    const formatDate = (inputDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const year = inputDate.getFullYear();
        const month = months[inputDate.getMonth()];
        const day = inputDate.getDate();
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        const timezone = inputDate.toString().match(/\(([^)]+)\)/)[1];

        return `${month} ${day}, ${year} ${hours12}:${minutes} ${ampm} ${timezone}`;
    };

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const inputDate = new Date(inputDateString);
        const formatted = formatDate(inputDate);
        setFormattedDate(formatted);
    }, [inputDateString]);

    return formattedDate;
};

export default useFormattedDate;
