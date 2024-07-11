import React from "react";
import { Person } from "../../models/Person";
import "./List.css";

interface Props {
  result: Person[];
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const List: React.FC<Props> = ({ result, currentPage, totalPages, onPageChange }) => {

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    result.length > 0 ?
      <div className="result-list">
        <ul>
          {result.map((person, index) => (
            <li key={index} className="person">
              <h2>{person.name}</h2>
              <p>Height: {person.height}</p>
              <p>Mass: {person.mass}</p>
              <p>Hair Color: {person.hair_color}</p>
              <p>Skin Color: {person.skin_color}</p>
              <p>Eye Color: {person.eye_color}</p>
              <p>Birth Year: {person.birth_year}</p>
              <p>Gender: {person.gender}</p>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button className="previous" onClick={handlePreviousPage} disabled={currentPage === 1}>{`<`}</button>
          <span>{currentPage} / {totalPages}</span>
          <button className="next" onClick={handleNextPage} disabled={currentPage === totalPages}>{`>`}</button>
        </div>
      </div> :
      <div>No results found.</div>
  );
};

export default List;
