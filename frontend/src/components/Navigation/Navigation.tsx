import './navigation.css';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <Link to="/" className="navigation-logo">
          <span>TecnoCar.lt</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Pagrindinis</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
