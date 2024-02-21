import { Person } from './Person';

export const Persons = ({ persons, deleteEntry: handleDelete, buttonText }) => {
  return <div>
    {persons.map(person => {
      return <Person key={person.id} name={person.name} number={person.number} id={person.id} buttonText={buttonText} deleteEntry={handleDelete}/>
    })}
  </div>;
};
