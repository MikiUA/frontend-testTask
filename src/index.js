import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/ApercuArabicPro/stylesheet.css'// a downloaded fonts set with @font-face
import Background from './Background';
import Form from './Form';
const backendlink="https://feedback-form-backend-mikiua.herokuapp.com"//a link to a database

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Background />
    <Form serverLink={backendlink}/>
  </React.StrictMode>
);

