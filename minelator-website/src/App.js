import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}>
            <Route path="*" element={<div>такой страницы нет</div>} />
          </Route>
        </Routes>
      </BrowserRouter>

      
    </div>
    </Provider>
  );
}

export default App;
