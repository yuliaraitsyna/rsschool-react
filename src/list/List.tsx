import React from "react";
import { Person } from "../models/Person";

interface Props {
    result: Person[]
}

class List extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const data = this.props.result;
        if (data.length === 0) {
            return <></>
        }

        return (
            <div className="result-list">
                <ul>    
                    {data.map((person, index) => (
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
            </div>
        )
    }
}

export default List;