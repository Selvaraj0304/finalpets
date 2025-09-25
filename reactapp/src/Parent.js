import React, { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const [value,setValue]=useState(10);
    function add(){
      setValue(value+2);
      document.body.style.backgroundColor="red";
    }
    function reduce(){
      setValue(value-2);
      document.body.style.backgroundColor="white";

    }
  return (
    <div>
       <h1>The number is: {value}</h1>
       <button onClick={add}>Click to add</button>
       <button onClick={reduce}>Click to reduce</button>
    </div>
  )
}

export default Parent