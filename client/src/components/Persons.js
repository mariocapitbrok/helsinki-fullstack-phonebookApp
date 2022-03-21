import React from 'react'
import Person from './Person'

const Persons = ({ persons, newFilter, handleDelete }) => {
  // Filter required by the exercise
  const personsToShowA = persons.filter(
    (person) => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) > -1
  )

  // Filter alternative
  const personsToShowB = persons.filter((person) =>
    person.name.toLowerCase().startsWith(newFilter.toLowerCase())
  )

  return (
    <>
      {personsToShowA.map((person) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          handleDelete={handleDelete}
        />
      ))}
    </>
  )
}

export default Persons
