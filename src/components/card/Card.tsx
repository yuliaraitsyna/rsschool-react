import React from "react";
import { Person } from "../../models/Person";
import "./Card.css"
import extractIdFromUrl from "../../models/extractIdFromUrl";

interface Props {
    data: Person;
    onClick: (id: number) => void;
}

const Card: React.FC<Props> = ({ data, onClick }) => {

    const handleItemClick = (id: number) => {
        onClick(id);
    };

    return (
        <li className='person' onClick={() => handleItemClick(extractIdFromUrl(data.url))}>
            <h2>{data.name}</h2>
        </li>
    )
}

export default Card;
