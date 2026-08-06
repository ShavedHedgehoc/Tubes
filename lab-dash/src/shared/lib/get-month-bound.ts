export const getMonthBounds = () => {
    const now = new Date();
    const startISO = new Date(now.getFullYear(), now.getMonth(), 1);
    const endISO = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const start = formatDate(startISO);
    const end = formatDate(endISO);
    return { start, end };
};