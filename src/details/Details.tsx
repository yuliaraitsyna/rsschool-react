import React, { useState, useEffect } from 'react';
import { Person } from '../models/Person';
import './Details.css';

interface Props {
  id: number;
  onClose: () => void;
}

const Details: React.FC<Props> = ({ id, onClose }) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setPerson(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, [id]);

  const handleCloseClick = () => {
    onClose();
  };

  if (loading) return <div>Loading...</div>;
  if (!person) return <div>No details available</div>;

  return (
    <div className='details'>
      <button className='close-button' onClick={handleCloseClick}>
        Close
      </button>
      <h2 className='person-header'>{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Hair Color: {person.hair_color}</p>
      <p>Skin Color: {person.skin_color}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>
    </div>
  );
};

export default Details;
