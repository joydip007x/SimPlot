import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import BlockFlow from './components/BlockFlow/BlockFlow.js';
import ChainFlow from './components/ChainFlow/ChainFlow';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path='/'  element={<BlockFlow/>} />
                <Route path='/1'  element={<ChainFlow/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
