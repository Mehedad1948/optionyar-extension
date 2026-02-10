/* --- START FILE: index.jsx --- */
import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
// 1. Load Tailwind FIRST
import '../../assets/styles/tailwind.css';
// 2. Load Your Custom CSS (with Fonts) SECOND
import './index.css';

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
/* --- END FILE: index.jsx --- */
