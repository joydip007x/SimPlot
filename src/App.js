import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';

import BlockFlow from './components/BlockFlow.js';

function App() {
  return (
    <div className="App">
    
        <BrowserRouter>
            <Routes>
                <Route path='/'  element={<BlockFlow/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
