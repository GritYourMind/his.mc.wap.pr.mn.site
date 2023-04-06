
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../src/js/Header';
import CheckIdentification from '../src/js/CheckIdentification';
import Submit from './js/Submit';
import PreInterview from '../src/js/PreInterview';
import EmptyPage from '../src/js/EmptyPage';
import { BrowserView, MobileView } from 'react-device-detect'
import {useState, useEffect, useRef} from 'react';


function App() {
  return (
    <div className='App'>
      <BrowserView>
        <BrowserRouter>
          <Header/>
          
          <Routes>
            <Route path="/ident" element={<CheckIdentification/>}></Route>
            <Route path="/preinterview" element={<PreInterview/>}></Route>
            <Route path="/submit" element={<Submit/>}></Route>
            <Route path="/*" element={<EmptyPage/>}></Route>
            
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
            <Header/>
            
            <Routes>
              <Route path="/ident" element={<CheckIdentification/>}></Route>
              <Route path="/preinterview" element={<PreInterview/>}></Route>
              <Route path="/submit" element={<Submit/>}></Route>
              <Route path="/*" element={<EmptyPage/>}></Route>
              
            </Routes>
          </BrowserRouter>
      </MobileView>
    </div>
  );
}

export default App;
