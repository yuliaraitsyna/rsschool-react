import { Person } from "./Person";

const downloadCSV = (data: Person[], filename: string = "data.csv") => {
    filename = `${data.length}_people.csv`;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(person => {
        return Object.values(person).join(',');
    });

    const result = [headers, ...rows].join('\n');
    const blob = new Blob([result], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default downloadCSV;