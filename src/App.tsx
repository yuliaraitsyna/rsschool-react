import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
    <nav className='navigation'>
      <ul>
        <li><Link to={'/uncontrolled_form'} className='link'>Uncontrolled Form</Link></li>
        <li><Link to={'/react_hook_form'} className='link'>React Hook Form</Link></li>
      </ul>
    </nav>
      <div className='info'>
        <h1 className='name'>{`Name: `}</h1>
        <img className='profile-img'></img>
        <div className='info-text'>
          <span className='age'>{`Age: `}</span>
          <p className='gender'>{`Gender: `}</p>
          <p className='email'>{`Email: `}
            <Link to={`mailto:`} className='link'>{}</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
