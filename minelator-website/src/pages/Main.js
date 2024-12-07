import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileUploader from '../components/FileUploader';


function Main() {
    const dispatch = useDispatch();
    
    return (
      <div className="">


        Главная страница!!!
        <FileUploader/>


        
      </div>
    );
  }
  
export default Main;