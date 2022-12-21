import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ptBR from 'date-fns/locale/pt-BR';
import App from './App';

registerLocale('pt-BR', ptBR);
const element = document.getElementById('root');
const root = createRoot(element);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);