import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarScreen } from './../../../components/calendar/CalendarScreen';

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

});
