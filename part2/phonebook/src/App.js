import { useEffect, useState } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [lastDeleted, setLastDeleted] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  const updateNumber = (name) => {
    if (window.confirm(`${name} is already added to the phonebook. Do you want to update the number with a new one?`)) {
      const person = persons.find(p => p.name === name)
      const updatedPerson = { ...person, number: newNumber }

      personService.update(person.id, updatedPerson).then(returnedPerson => {
        setPersons(persons.map(p => p.name !== name ? p : returnedPerson))
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber
    }

    persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
      ? updateNumber(newName)
      : personService
        .create(nameObj)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNotification(`${newName} was added`)
          setNewName("")
          setNewNumber("")
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(err => {
          setError(err.response.data.substring(104, 218))
          console.log(err.response.data.substring(104, 218))
        })
  }

  const deletePerson = (id) => {
    setLastDeleted(persons.find(p => p.id === id).name)
    personService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
      .catch(err => {
        setError("delete")
        setTimeout(() => {
          setError(null)
          console.log(err.response.data)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorNotification message={error} lastDeleted={lastDeleted} />
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        numberValue={newNumber}
        nameOnChange={handleNameChange}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App