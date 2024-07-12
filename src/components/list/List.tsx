import React from "react";
import { Person } from "../../models/Person";
import "./List.css";
import Pagination from "../pagination/Pagination";

interface Props {
    result: Person[];
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onItemClick: (id: number) => void;
}

const List: React.FC<Props> = ({ result, currentPage, totalPages, onPageChange, onItemClick }) => {

    const extractIdFromUrl = (url: string): number => {
        const parts = url.split('/');
        const id = parts[parts.length - 2];
        return parseInt(id, 10);
    };

    const handleItemClick = (id: number) => {
        onItemClick(id);
    };

    return (
        result.length > 0 ?
            <div className="result-list">
                <ul>
                    {result.map((person) => (
                        <li key={extractIdFromUrl(person.url)} className='person' onClick={() => handleItemClick(extractIdFromUrl(person.url))}>
                            <h2>{person.name}</h2>
                        </li>
                    ))}
                </ul>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div> :
            <div>No results found.</div>
    );
};

export default List;
