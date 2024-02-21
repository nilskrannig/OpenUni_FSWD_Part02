export const Person = ({ name, number, id, deleteEntry, buttonText }) => {
  return <div>
    <p>
      {name} {number}
      <button onClick={() => deleteEntry(id)}>{buttonText}</button></p>
  </div>
};
