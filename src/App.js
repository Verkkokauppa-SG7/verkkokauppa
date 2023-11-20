import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ProductList from './components/ProductList';
import PresetCategories from './pages/PresetCategories';
import MenComponent from './components/MenComponent';
import WomenComponent from './components/WomenComponent';
import UnisexComponent from './components/UnisexComponent';
import FrontPage from './pages/FrontPage';

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/vaatteet" element={<PresetCategories />} />
            <Route path="/tuotteet/:categoryName" element={<ProductList />} />
            <Route path="vaatteet/miehet" element={<MenComponent />} />
            <Route path="/vaatteet/naiset" element={<WomenComponent />} />
            <Route path="/unisex" element={<UnisexComponent />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
