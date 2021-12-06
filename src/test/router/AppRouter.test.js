import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { AppRouter } from './../../router/AppRouter';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe('Pruebas en <AppRouter />', () => {
  
  test('debe de mostrar el Espere...', () => {
    const initState = {
      auth: {
        checking: true
      }
    };
    
    const store = mockStore( initState );
    
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    ); 
    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBeTruthy();
  });
  
});
