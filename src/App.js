import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Categories from './components/Categories';
import ProductList from './components/ProductList';

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vaatteet" element={<Categories />} />
            <Route path="/tuotteet/:categoryName" element={<ProductList />} />
          </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
