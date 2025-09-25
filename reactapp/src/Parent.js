import React, { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const [value1,setValue]=useState(10);
    const [value2,setValue2]=useState(10);

    function add(){
      setValue(value1+2);
      document.body.style.backgroundColor="red";
      document.getElementById("txt").style.color="white";
    }
    function reduce(){
      setValue2(value2-2);
      document.body.style.backgroundColor="white";
      document.getElementById("txt").style.color="black";
    }
    useEffect(()=>{
      console.log("Hello from No dependency");
    });
    useEffect(()=>{
      console.log("Hello from Empty dependency");
    },[]);
    useEffect(()=>{
      console.log("Hello from Specific dependency");
    },[value1]);
  return (
    <div>
      <h1 id="txt">The value2 is : {value2}</h1>
       <h1 id="txt">The number is: {value1}</h1>
       <button onClick={add}>Click to add</button>
       <button onClick={reduce}>Click to reduce</button>
    </div>
  )
}

export default Parent