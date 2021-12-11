import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchDay, newMemory} from './actions';


export function Toolbar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const dispatch = useDispatch();

  return (
    <div className="toolbar">
      <button
        onClick={() => dispatch(newMemory(today.getFullYear(), month, day))}
      >New Memory</button>
      <div className="month-day-picker">
        <select
          value={month}
          onChange={event => setMonth(parseInt(event.target.value))}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <input
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={event => setDay(parseInt(event.target.value))}
        />
        <button
            onClick={() => dispatch(fetchDay(month, day))}>Remember</button>
      </div>
    </div>
  );
}