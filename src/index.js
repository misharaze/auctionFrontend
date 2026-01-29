import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// ✅ MSW (только в dev)
//if (process.env.NODE_ENV === "development") {
  //const { worker } = require("./mock/browser");
 /// worker.start({
  // onUnhandledRequest: "bypass",
 // });
//}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

