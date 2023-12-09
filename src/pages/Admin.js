// Admin.js
import { Link } from 'react-router-dom';
import '../styles/FeedbackList.css'

const Admin = () => { 

  const isAdmin=true;

  return (
    <div>
    <nav>
      <ul>
        <div>
        <li><Link to="/yllapito/tuoteryhmat">Tuoteryhmien ylläpito</Link></li>
        </div>
        <div>
        <li><Link to="/yllapito/palautteet">Asiakaspalautteet</Link></li>
        </div>
      </ul>
    </nav>
    <div className="empty-space"></div>
    </div>
  );
};

export default Admin;