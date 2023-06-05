export const getFullDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    } catch (error) {
        return '';
    }
}