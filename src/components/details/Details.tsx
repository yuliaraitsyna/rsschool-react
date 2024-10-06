import React from 'react';
import { useGetDetailsByIdQuery } from '../redux/starWarsAPI';
import styles from './Details.module.css';

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
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error fetching details</div>;
  }

  if (!person) {
    return <div className={styles.empty}>No details available</div>;
  }

  return (
    <div className={styles.details}>
      <button className={styles.closeButton} onClick={handleCloseClick}>
        Close
      </button>
      <h2 className={styles.personHeader}>{person.name}</h2>
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
