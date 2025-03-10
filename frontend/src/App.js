import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import CatrbonFootprintTrackingPage from './pages/CorbonFootprintSystem/CatrbonFootprintTrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/carbon-footprint-tracking' element={<CatrbonFootprintTrackingPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
