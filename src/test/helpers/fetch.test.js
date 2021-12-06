import { fetchWithoutToken } from '../../helpers/fetch';

describe('Pruebas en el archivo fetch', () => {
  test('fetchWithoutToken debe de funcionar', async() => {
    const res = await fetchWithoutToken('auth', { email: 'test@test.com', password: 'testing' }, 'POST');
    const body = await res.json();

    expect(res instanceof Response).toBeTruthy();
    expect(body.ok).toBeTruthy();
  });
});
