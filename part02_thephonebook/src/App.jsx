import { useState } from 'react'

const Person = ({ name, number }) => {
  return <div>
    <p>{name} {number}</p>
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (isPersonInThePhonebook(newPerson)) {
      alert(`${newPerson.name} already exists in the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName('');
    setNewNumber('');
  }

  const isPersonInThePhonebook = (newPerson) => {
    return persons.find(person => JSON.stringify(person) === JSON.stringify(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App