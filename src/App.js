import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
