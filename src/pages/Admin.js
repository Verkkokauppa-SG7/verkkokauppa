// Admin.js
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/FeedbackList.css'


const Admin = ({isAdmin}) => { 
  console.log({isAdmin});
  return (
    <div>
    {isAdmin && <Navbar />}
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