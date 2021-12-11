import React, {Fragment} from 'react';

export function Memory(props) {
  const {memory} = props;

  const day = new Date(memory.year, memory.month - 1, memory.day);

  const monthDay = day.toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const weekday = day.toLocaleString('default', {
    weekday: 'long'
  });

  return (
    <Fragment>
      <div className="memory-left memory-cell">
        <span className="year">{memory.year}</span>
        <span className="month-day">{monthDay}</span>
        <span className="weekday">{weekday}</span>
      </div>
      <div className="memory-right memory-cell">{memory.entry}</div>
    </Fragment>
  );
}