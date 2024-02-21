import { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import personService from './services/persons'

const Filter = ({ text, updateFilter }) => {
  return <div>{text}<input onChange={updateFilter} /></div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAllPersons().then(allPersons => {
      setPersons(allPersons)
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
      personService.create(newPerson).then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewNumber('');
      })
    }
  }

  const isPersonInThePhonebook = (newPerson) => {
    return persons.find(person => JSON.stringify(person.name) === JSON.stringify(newPerson.name));
  };

  const filteredPersons = filter ? persons.filter((person) => {
    return person.name.toLowerCase().includes(filter)
  }) : persons;

  const updateFilter = (event) => setFilter(event.target.value);

  const handleDelete = id => {
    personService.deleteEntry(id)
      .then(() => setPersons(persons.filter(person => person.id != id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={"filter with: "} updateFilter={updateFilter} />
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        onSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} buttonText={'delete'} deleteEntry={handleDelete} />
    </div>
  )
}

export default App