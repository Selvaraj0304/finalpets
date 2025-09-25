import React from 'react'

const Child = (props) => {
  return (
    <div>
        <h1>Name: {props.name}</h1>
        <h3>Quantity: {props.quantity}</h3>
        <h3>Price: {props.price}</h3>
    </div>
  )
}

export default Child