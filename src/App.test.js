import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoveLetter from './Components/LoveLetter/OldLoveLetter';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});