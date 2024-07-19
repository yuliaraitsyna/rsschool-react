import React from 'react';
import './Details.css';
import { useGetDetailsByIdQuery } from '../redux/starWarsAPI';

interface Props {
  id: number;
  onClose: () => void;
}

const Details: React.FC<Props> = ({ id, onClose }) => {
  const { data: person, error, isLoading } = useGetDetailsByIdQuery(id);

  const handleCloseClick = () => {
    onClose();
  };

  if (isLoading) {
    return <div className='details-loading'>Loading...</div>;
  }

  if (error) {
    return <div className='details-error'>Error fetching details</div>;
  }

  if (!person) {
    return <div className='details-empty'>No details available</div>;
  }

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
