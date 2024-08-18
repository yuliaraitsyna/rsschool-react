import { useSelector } from 'react-redux';
import './App.css';
import { Link } from 'react-router-dom';
import { RootState } from './components/redux/store';

const App: React.FC = () => {
  const data = useSelector((state: RootState) => state.form.data);
  const updatedFields = useSelector((state: RootState) => state.form.updatedFields);

  return (
    <>
    <nav className='navigation'>
      <ul>
        <li><Link to={'/uncontrolled_form'} className='link'>Uncontrolled Form</Link></li>
        <li><Link to={'/react_hook_form'} className='link'>React Hook Form</Link></li>
      </ul>
    </nav>
      <div className='info'>
        <h1 className={`name ${updatedFields.includes('name') ? 'highlight' : ''} `}>{`Name: ${data.name}`}</h1>
        <img className={`profile-img ${updatedFields.includes('profile-img') ? 'highlight' : ''} `} src={data.img}></img>
        <div className='info-text'>
          <span className={`age ${updatedFields.includes('age') ? 'highlight' : ''} `}>{`Age: ${data.age}`}</span>
          <p className={`gender ${updatedFields.includes('gender') ? 'highlight' : ''} `}>{`Gender: ${data.gender}`}</p>
          <p className={`country ${updatedFields.includes('country') ? 'highlight' : ''} `}>{`Country: ${data.country}`}</p>
          <p className={`email ${updatedFields.includes('email') ? 'highlight' : ''} `}>{`Email:`}
            <Link to={`mailto:${data.email}`} className='link'>{data.email}</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
