import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarScreen } from './../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
  calendar: {
    events: []
  },
  auth: {
    checking: false,
    uid: 'TESTING',
    name: 'test'
  },
  ui: {
    openModal: false
  } 
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <CalendarScreen />
  </Provider>
);


describe('Pruebas en el componente <CalendarScreen />', () => {
  
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('pruebas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });
    
    // haciendo de otra forma
    calendar.prop('onSelectEvent')({ start: 'Now' });
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Now' });

    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });
  
});
