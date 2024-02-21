export const Filter = ({ text, updateFilter }) => {
  return <div>{text}<input onChange={updateFilter} /></div>;
};
