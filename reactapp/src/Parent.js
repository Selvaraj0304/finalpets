import React from 'react'
import Child from './Child'

const Parent = () => {
  return (
    <div>
        <Child name="Mobile" price="100$" quantity="3"/>
        <Child name="Laptop" price="200$" quantity="2"/>
        <Child name="Mobile" price="100$" quantity="3"/>
        <Child name="Laptop" price="200$" quantity="2"/>
    </div>
  )
}

export default Parent