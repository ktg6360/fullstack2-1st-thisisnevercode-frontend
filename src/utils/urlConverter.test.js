import { convertToUrlForNav } from './urlConverter';

describe('convertToUrlForNav', () => {
  test('convertToUrlForNav', () => {
    expect(convertToUrlForNav('LOGIN')).toEqual('signin');
  });
});
