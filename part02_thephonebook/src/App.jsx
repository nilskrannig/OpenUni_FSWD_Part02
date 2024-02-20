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
  const [filter, setFilter] = useState('')

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

  const filteredPersons = filter ? persons.filter((person) => {
    return person.name.toLowerCase().includes(filter)
  }) : persons;

  const updateFilter = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter with<input onChange={updateFilter} /></div>
      <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App