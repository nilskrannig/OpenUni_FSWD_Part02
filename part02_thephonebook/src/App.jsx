import { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import axios from 'axios'

const Filter = ({ text, updateFilter }) => {
  return <div>{text}<input onChange={updateFilter} /></div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

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
      axios.post('http://localhost:3001/persons', newPerson).then(response => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      })
    }
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
      {/* <div>filter with<input onChange={updateFilter} /></div> */}
      <Filter text={"filter with: "} updateFilter={updateFilter} />
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        onSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App