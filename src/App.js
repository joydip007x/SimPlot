import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';

import BlockFlow from './components/BlockFlow/BlockFlow.js';
import ChainFlow from './components/ChainFlow/ChainFlow';

function App() {
  return (
    <div className="App">
    
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
