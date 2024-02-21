import { useEffect, useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import personService from './services/persons'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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

    const alreadyInPhonebookPerson = getPersonFromPhonebookByName(newPerson.name)

    if (!alreadyInPhonebookPerson) {
      personService.create(newPerson).then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNotificationMessage(`Added ${createdPerson.name} successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      resetPersonInputs()
      return;
    }

    if (window.confirm(`${newPerson.name} is already added to the phonebook. Would you like to replace the old number with the new one?`)) {
      const changedPerson = { ...alreadyInPhonebookPerson, number: newPerson.number }
      personService.updatePerson(alreadyInPhonebookPerson.id, changedPerson).then(updatedPerson => {
        setPersons(persons.map(person => person.id != updatedPerson.id ? person : updatedPerson))
        resetPersonInputs()
        setNotificationMessage(`Changed number of ${updatedPerson.name} successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const resetPersonInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const getPersonFromPhonebookByName = (name) => {
    return persons.find(person => JSON.stringify(person.name) === JSON.stringify(name));
  };

  const filteredPersons = filter ? persons.filter((person) => {
    return person.name.toLowerCase().includes(filter)
  }) : persons;

  const updateFilter = (event) => setFilter(event.target.value);

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService.deleteEntry(id)
        .then(() => setPersons(persons.filter(person => person.id != id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
