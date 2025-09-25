import React, { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const [value,seValue]=useState(10);
  return (
    <div>
       <h1>The number is: {value}</h1>
    </div>
  )
}

export default Parent