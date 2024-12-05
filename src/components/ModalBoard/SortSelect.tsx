import React, { useContext } from 'react';
// contexts
import { navContext } from '@/context/homeContext';

const SortSelect = () => {
  const context = useContext(navContext);

  const { sortValues, sortingBoards } = context;
  return (
    <select
      name="sortValue"
      id="sortValue"
      onChange={(e) => sortingBoards(e.target.value)}
    >
      {sortValues.map((value, index) => (
        <option className="sortButton" key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
