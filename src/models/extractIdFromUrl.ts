const extractIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    const id = parts[parts.length - 2];
    return parseInt(id, 10);
};

export default extractIdFromUrl;