import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');

const localizer = momentLocalizer(moment) ;

const events = [{
  title: 'Cumpleaños del Bisho',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Comprar Torta',
  user: {
    _id: '123',
    name: 'Antonio'
  }
}];

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(uiOpenModal());
    dispatch(eventSetActive(e));
  };
  
  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e);
  };

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
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view= {lastView}
        components={{
          event: CalendarEvent
        }}
      />
        <AddNewFab />
      <CalendarModal />
    </div>
  );
};
