import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [{
    title: 'Cumpleaños del Bisho',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar Torta',
    user: {
      _id: '123',
      name: 'Antonio'
    }
  }],
  activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return{
        ...state,
        activeEvent: action.payload
      };

    default:
      return initialState;
  }
};