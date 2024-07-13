import React from "react";
import { Person } from "../../models/Person";
import "./Card.css"

interface Props {
    data: Person;
    onClick: (id: number) => void;
}

const Card: React.FC<Props> = ({ data, onClick }) => {

    const extractIdFromUrl = (url: string): number => {
        const parts = url.split('/');
        const id = parts[parts.length - 2];
        return parseInt(id, 10);
    };

    const handleItemClick = (id: number) => {
        onClick(id);
    };

    return (
        <li key={extractIdFromUrl(data.url)} className='person' onClick={() => handleItemClick(extractIdFromUrl(data.url))}>
            <h2>{data.name}</h2>
        </li>
    )
}

export default Card;
