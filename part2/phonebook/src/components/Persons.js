import Person from "./Person"

const Persons = ({ persons, deletePerson }) => {
    return (
        <>
            {persons.map(
                person => <Person key={person.id} person={person} deletePerson={() => {
                    if (window.confirm(`Delete ${person.name}?`))
                        deletePerson(person.id)
                }} />)}
        </>
    )
}

export default Persons