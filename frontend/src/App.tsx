import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarList } from './components/CarList/CarList';
import { Navigation } from './components/Navigation/Navigation';
import { CarDetails } from './components/CarDetails/CarDetails';
import { ReviewsList } from './components/ReviewsList/ReviewsList';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/reviews" element={<ReviewsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
