import React from 'react';
import { BrowserRouter,Route, Routes,Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import BlockFlow from './components/BlockFlow/BlockFlow.js';
import ChainFlow from './components/ChainFlow/ChainFlow';
import Navbar from './components/Navbar/Navbar.js';
import Homepage from './components/Homepage/Homepage.js';
import ConnectionTable from './components/ConnectionTable/ConnectionTable';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
        <BrowserRouter>
            <Routes>
              
                <Route path="/" element={<Navigate replace to="/homepage"/>} />

                <Route path='/homepage'  element={<Homepage/>} />
                <Route path='/blockflow'  element={<BlockFlow/>} />
                <Route path='/chainflow'  element={<ChainFlow/>} />
                <Route path='/table'  element={<ConnectionTable/>} />

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
