// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Catálogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dados">Novo</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<LivroLista />} />
            <Route path="/dados" element={<LivroDados />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
