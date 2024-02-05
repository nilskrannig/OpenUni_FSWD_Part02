import { useState } from 'react'

const Person = ({ name }) => {
  return <div>
    <p>{name}</p>
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const submitName = (event) => {
    event.preventDefault();
    
    const newPerson = {
      name: newName
    };
    
    if (isPersonInThePhonebook(newPerson)) {
      alert(`${newPerson.name} already exists in the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName('');
  }

  const isPersonInThePhonebook = (newPerson) => {
    return persons.find(person => JSON.stringify(person) === JSON.stringify(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} />)}
    </div>
  )
}

export default App