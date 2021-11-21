import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router';

moment.locale('es');

const localizer = momentLocalizer(moment) ;

const events = [{
  title: 'Cumpleaños del Bisho',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa'
}];

export const CalendarScreen = () => {
  
  const eventStyleGetter = (event, start, end , isSelected) => {
    
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      color: 'white',
      display: 'block',
      opacity: 0.8
    };

    return {
      style
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};
