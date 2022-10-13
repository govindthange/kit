import {parseISO, formatDistanceToNow} from 'date-fns';
import {removeItem} from '../../dummyDataSlice';
import {useDispatch} from 'react-redux';

import React from 'react';

const DummyDataPoint = ({id, title, date}) => {
  const dispatch = useDispatch();

  let timeAgo = '';
  if (date) {
    const date2 = parseISO(date);
    const timePeriod = formatDistanceToNow(date2);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <div>
      <span className="dummy-seq">{id}.</span>
      <span className="dummy-title">{title.substring(0, 25)}...</span>
      <span className="dummy-time">{timeAgo}</span>
      <button onClick={() => dispatch(removeItem(id))}>x</button>
    </div>
  );
};

export default DummyDataPoint;
