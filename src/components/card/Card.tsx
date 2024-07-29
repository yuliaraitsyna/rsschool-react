import { Person } from "../../models/Person";
import extractIdFromUrl from "../../models/extractIdFromUrl";
import { selectCard, unselectCard } from "../redux/cardsSlice"
import { useDispatch } from "react-redux";
import React from "react";
import styles from './Card.module.css'

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
    }

    return (
        <li className={styles.person} onClick={() => handleItemClick(extractIdFromUrl(data.url))}>
            <input className={styles.checkbox} checked={isSelected} type="checkbox" onChange={handleSelection} onClick={(event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation()}></input>
            <h2>{data.name}</h2>
        </li>
    )
}

export default Card;
