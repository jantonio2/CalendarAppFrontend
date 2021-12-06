import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { startLogin } from './../../actions/auth';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones del auth', () => {

  beforeEach(() => {
    store = mockStore( initState );
    jest.clearAllMocks();
  });

  test('startLogin debe funcionar correctamente', async() => {
    await store.dispatch( startLogin( 'test@test.com', 'testing' ) );
    
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String) );
    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );

    // Extrayendo informacion de una función Jest
    // const token = localStorage.setItem.mock.calls[0][1]
  });
  
});
