import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { types } from '../../types/types';
import { startChecking, startLogin, startRegister } from './../../actions/auth';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

// let token = '';

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
    // token = localStorage.setItem.mock.calls[0][1];
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

  test('startRegister debe funcionar correctamente', async() => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123456789',
          name: 'Testing',
          token: 'abc123456xyz'
        }
      }
    }));
    
    await store.dispatch( startRegister( 'testing@testing.com', 'testingtesting', 'TEST' ) );
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123456789',
        name: 'Testing',
      }
    });
    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'abc123456xyz' );
    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );
  });
  
  test('startChecking deve funcionar correctamente', async() => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123456789',
          name: 'Testing',
          token: 'abc123456xyz'
        }
      }
    }));

    await store.dispatch( startChecking() );
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123456789',
        name: 'Testing',
      }
    });
    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'abc123456xyz' );
    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );
  });
  
});
