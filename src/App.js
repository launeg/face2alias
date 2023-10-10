import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./component/Home/Home" 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SignUp from './component/Home/SignUp'; 
import Output from './component/Home/Output'; 


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/image/:imag" component={Output} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


