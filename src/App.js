import React from 'react';
import { BrowserRouter,Route, Routes,Navigate } from 'react-router-dom';
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
              
                <Route path="/" element={<Navigate replace to="/blockflow"/>} />


                <Route path='/blockflow'  element={<BlockFlow/>} />
                <Route path='/chainflow'  element={<ChainFlow/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
