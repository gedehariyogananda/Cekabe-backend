export const formatDate = (date, format) => {
    const map = {
        YYYY: date.getFullYear(),
        YY: String(date.getFullYear()).slice(-2),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        DD: String(date.getDate()).padStart(2, '0'),
    };

    return format
        .replace(/YYYY|YY|MM|DD/g, matched => map[matched]);
};

export const isValidDateFormat = (format) => {
    return /YYYY|YY/.test(format) && /MM/.test(format) && /DD/.test(format);
};