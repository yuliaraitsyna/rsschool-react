
import { Person } from "../../models/Person";
import "./Card.css"
import extractIdFromUrl from "../../models/extractIdFromUrl";
import { selectCard, unselectCard } from "../../redux/cardsSlice"
import { useDispatch } from "react-redux";
import React from "react";
import store from "../../redux/store";

interface Props {
    data: Person;
    onClick: (id: number) => void;
    isSelected: boolean;
}

const Card: React.FC<Props> = ({ data, onClick, isSelected }) => {
    const dispatch = useDispatch();

    const handleItemClick =  (id: number) => {
        onClick(id);
    };

    const handleSelection = () => {
        if(!isSelected) {
            dispatch(selectCard(data));
        }
        else {
            dispatch(unselectCard(extractIdFromUrl(data.url)));
        }

        console.log(store.getState())
    }

    return (
        <li className='person' onClick={() => handleItemClick(extractIdFromUrl(data.url))}>
            <input className='checkbox' checked={isSelected} type="checkbox" onChange={handleSelection} onClick={(event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation()}></input>
            <h2>{data.name}</h2>
        </li>
    )
}

export default Card;
