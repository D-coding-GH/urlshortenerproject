import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home'


function App() {
  return (
<BrowserRouter>
    <div className="App">
     <Route exact path='/' component={Home}/>
    </div>
</BrowserRouter>
  
  );
}

export default App;
