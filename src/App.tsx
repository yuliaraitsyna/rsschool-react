import { useSelector } from 'react-redux';
import './App.css';
import { Link } from 'react-router-dom';
import { RootState } from './components/redux/store';

const App: React.FC = () => {
  const data = useSelector((state: RootState) => state.form.data);
  return (
    <>
    <nav className='navigation'>
      <ul>
        <li><Link to={'/uncontrolled_form'} className='link'>Uncontrolled Form</Link></li>
        <li><Link to={'/react_hook_form'} className='link'>React Hook Form</Link></li>
      </ul>
    </nav>
      <div className='info'>
        <h1 className='name'>{`Name: ${data.name}`}</h1>
        <img className='profile-img' src={data.img}></img>
        <div className='info-text'>
          <span className='age'>{`Age: ${data.age}`}</span>
          <p className='gender'>{`Gender: ${data.gender}`}</p>
          <p className='email'>{`Email:`}
            <Link to={`mailto:${data.email}`} className='link'>{data.email}</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
