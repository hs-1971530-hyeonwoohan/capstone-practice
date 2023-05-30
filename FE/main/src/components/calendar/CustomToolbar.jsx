import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather'; // for prev, next icons

const CustomToolbar = ({ calendarApi }) => {
  const goNext = () => {
    calendarApi.next();
  };

  const goPrev = () => {
    calendarApi.prev();
  };

  return (
    <div className="custom-toolbar bg-slate-600 z-100">
      <button onClick={goPrev}><ChevronLeft /></button>
      <h1>{calendarApi?.getView().title}</h1>
      <button onClick={goNext}><ChevronRight /></button>
    </div>
  );
};

export default CustomToolbar;
