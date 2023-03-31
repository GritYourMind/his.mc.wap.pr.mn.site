
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../src/js/Header';
import CheckIdentification from '../src/js/CheckIdentification';
import Submit from './js/Submit';
import PreInterview from '../src/js/PreInterview';
import EmptyPage from '../src/js/EmptyPage';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route path="/ident" element={<CheckIdentification/>}></Route>
        <Route path="/preinterview" element={<PreInterview/>}></Route>
        <Route path="/submit" element={<Submit/>}></Route>
        <Route path="/" element={<EmptyPage/>}></Route>
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
