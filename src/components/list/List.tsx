import React from "react";
import { Person } from "../../models/Person";
import "./List.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import extractIdFromUrl from "../../models/extractIdFromUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
    result: Person[];
    onItemClick: (id: number) => void;
}

const List: React.FC<Props> = ({ result, onItemClick }) => {
    const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
    
    return (
        result.length > 0 ?
            <div className="result-list">
                <ul>
                    {result.map((person) => {
                        const selected = selectedCards.some(card => extractIdFromUrl(card.url) === extractIdFromUrl(person.url));
                        return (
                            <Card key={extractIdFromUrl(person.url)} data={person} onClick={onItemClick} isSelected={selected}></Card>
                        )
                    })}
                </ul>
                <Pagination />
            </div> :
            <div>No results found.</div>
    );
};

export default List;
