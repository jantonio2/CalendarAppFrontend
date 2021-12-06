import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Pruebas en el archivo fetch', () => {

  let token = '';

  test('fetchWithoutToken debe de funcionar', async() => {
    const res = await fetchWithoutToken('auth', { email: 'test@test.com', password: 'testing' }, 'POST');
    const body = await res.json();

    expect(res instanceof Response).toBeTruthy();
    expect(body.ok).toBeTruthy();

    token = body.token;
  });

  test('fetchWithToken debe de funcionar', async() => {
    localStorage.setItem('token', token);

    const res = await fetchWithToken('events/61a3b942f7af9a4c3b5169d2', {}, 'DELETE');
    const body = await res.json();

    expect(body.msg).toBe('No existe un evento con ese id');
  });
});
