import React from 'react';
import ReactDOM from 'react-dom/client';
import Parent from './Parent';
import Child from './Child';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Parent/>
  //   {/* <Child/> */}
  // </React.StrictMode>
);
