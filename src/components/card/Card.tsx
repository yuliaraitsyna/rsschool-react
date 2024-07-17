
import { Person } from "../../models/Person";
import "./Card.css"
import extractIdFromUrl from "../../models/extractIdFromUrl";
import { selectCard, unselectCard } from "../../redux/cardsSlice"
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import store from "../../redux/store";

interface Props {
    data: Person;
    onClick: (id: number) => void;
}

const Card: React.FC<Props> = ({ data, onClick }) => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const handleItemClick =  (id: number) => {
        onClick(id);
    };

    const handleSelection = () => {
        setChecked(!checked);

        if(!checked) {
            dispatch(selectCard(data));
        }
        else {
            dispatch(unselectCard(extractIdFromUrl(data.url)));
        }

        console.log(store.getState())
    }

    return (
        <li className='person' onClick={() => handleItemClick(extractIdFromUrl(data.url))}>
            <input type="checkbox" onChange={handleSelection} onClick={(event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation()}></input>
            <h2>{data.name}</h2>
        </li>
    )
}

export default Card;
