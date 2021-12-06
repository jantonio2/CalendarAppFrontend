import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { types } from '../../types/types';
import { startLogin } from './../../actions/auth';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

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
  
  test('startLogin debe ser incorrecto', async() => {
    await store.dispatch( startLogin( 'test@test.com', 'testingtest' ) );
    let actions = store.getActions();

    expect( actions ).toEqual( [] );
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');
    
    await store.dispatch( startLogin( 'test@testing.com', 'testingtest' ) );
    actions = store.getActions();

    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'El usuario no existe', 'error');
  });

});
