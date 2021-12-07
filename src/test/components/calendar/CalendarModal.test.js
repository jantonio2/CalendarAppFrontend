import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarModal } from './../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventClearActiveEvent, eventStartUpdate } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOneHour = now.clone().add(1, 'hours');
const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hello World',
      notes: 'Some notes',
      start: now.toDate(),
      end: nowPlusOneHour.toDate()
    }
  },
  auth: {
    checking: false,
    uid: 'TESTING',
    name: 'test'
  },
  ui: {
    modalOpen: true
  } 
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <CalendarModal />
  </Provider>
);

describe('Pruebas en el componente <CalendarModal />', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrar el modal correctamente', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy();
  });
  
  test('debe de llamar la acción de actualizar y cerra el modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });
  
  test('debe de mostrar error si falta el title', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBeTruthy();
  });
  
});
