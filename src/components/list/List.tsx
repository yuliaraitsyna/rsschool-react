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
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onItemClick: (id: number) => void;
}

const List: React.FC<Props> = ({ result, currentPage, totalPages, onPageChange, onItemClick }) => {
    const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
    console.log("Selected:", selectedCards);
    
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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div> :
            <div>No results found.</div>
    );
};

export default List;
