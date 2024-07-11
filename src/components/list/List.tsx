import React from "react";
import { Person } from "../../models/Person";
import "./List.css";
import Panigation from "../panigation/Panigation";

interface Props {
    result: Person[];
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const List: React.FC<Props> = ({ result, currentPage, totalPages, onPageChange }) => {

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
        <Panigation currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Panigation>
      </div> :
      <div>No results found.</div>
  );
};

export default List;
