import { types } from './../../types/types';
describe('Pruebas en Types', () => {
  test('deben de ser iguales los types', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',

      eventSetActive: '[event] Set Active',
      eventStartAddNew : '[event] Start add new',
      eventAddNew: '[event] Add new',
      eventClearActiveEvent: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Events loaded',
      eventLogout: '[event] Event Logout',

      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout'
    });
  })
  
});
