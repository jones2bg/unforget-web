import React, {Fragment, useState} from 'react';
import {useDispatch} from 'react-redux';
import {startMemoryEdit,
        cancelMemoryEdit,
        saveMemoryEdit,
        deleteMemory,
    } from './actions';

export function Memory(props) {
  const {memory} = props;
  const dispatch = useDispatch();
  const [entry, setEntry] = useState(memory.entry);

  const day = new Date(memory.year, memory.month - 1, memory.day);

  const monthDay = day.toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const weekday = day.toLocaleString('default', {
    weekday: 'long'
  });

  if (memory.isEditing) {
     return (
      <Fragment>
        <div className="memory-left memory-cell">
          <span className="year">{memory.year}</span>
          <span className="month-day">{monthDay}</span>
          <span className="weekday">{weekday}</span>
          <button onClick={() => dispatch(saveMemoryEdit({...memory, entry}))}>Save</button>
          <button onClick={() => dispatch(cancelMemoryEdit(memory.id))}>Cancel</button>
          <button onClick={() => dispatch(deleteMemory(memory.id))}>Delete</button>
        </div>
        <div className="memory-right memory-cell">
          <textarea  value={entry}
        onChange={event => setEntry(event.target.value)} />
        </div>
      </Fragment>
    );
  }
  else {
    return (
      <Fragment>
        <div className="memory-left memory-cell">
          <span className="year">{memory.year}</span>
          <span className="month-day">{monthDay}</span>
          <span className="weekday">{weekday}</span>
          <button onClick={() => dispatch(startMemoryEdit(memory.id))}>Edit</button>
        </div>
        <div className="memory-right memory-cell">{memory.entry}</div>
      </Fragment>
    );
  }
}