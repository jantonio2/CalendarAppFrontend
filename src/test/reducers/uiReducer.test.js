import { uiReducer } from './../../reducers/uiReducer';
import { uiCloseModal, uiOpenModal } from './../../actions/ui';

const initState = {
  modalOpen: false
};

describe('Pruebas en uiReducer', () => {
  
  test('debe de retornar el estado por defecto', () => {
    const state = uiReducer( initState, {} );
    
    expect(state).toEqual(initState);
  });
  
  test('debe de abrir y cerrar el modal', () => {
    const openModal = uiOpenModal();
    const state = uiReducer( initState, openModal );
    
    expect( state ).toEqual( { modalOpen: true } );

    const closeModal = uiCloseModal();
    const stateClose = uiReducer( initState, closeModal );

    expect( stateClose ).toEqual( { modalOpen: false } );
  });
  
});
