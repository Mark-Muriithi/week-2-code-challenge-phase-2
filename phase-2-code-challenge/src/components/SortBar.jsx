import React from 'react'

const SortBar = ({ onSortChange }) => {

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    onSortChange(sortBy);
  };

  return (
    <div>SortBar
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" onChange={handleSortChange}>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  )
}

export default SortBar;