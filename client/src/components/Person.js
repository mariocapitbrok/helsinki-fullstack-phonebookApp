import React from 'react'

const Person = ({ id, name, number, handleDelete }) => (
  <>
    <div>
      {name} {number} {` `}
      <button onClick={() => handleDelete(id, name)}>delete</button>
    </div>
  </>
)

export default Person
