import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
  checking: true
};

describe('Pruebas en el authReducer', () => {
  
  test('debe de retornar el estado por defecto', () => {
    const state = authReducer( initState, {} );

    expect(state).toEqual(initState);
  });
  
  test('debe de realizar el login', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'TESTING',
        name: 'test'
      }
    };

    const state = authReducer({}, action);

    expect(state).toEqual({
      checking: false,
      uid: 'TESTING',
      name: 'test'
    });
  });
  
});
