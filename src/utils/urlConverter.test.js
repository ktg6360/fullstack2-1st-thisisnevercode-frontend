import { convertToUrlForNav } from './urlConverter';

describe('convertToUrlForNav case 1', () => {
  test('input LOGIN', () => {
    expect(convertToUrlForNav('LOGIN')).toEqual('signin');
  });
  test('input proper string', () => {
    expect(convertToUrlForNav('New')).toEqual('new');
  });
});

describe('convertToUrlForNav case 0', () => {
  test('no input', () => {
    expect(() => convertToUrlForNav()).toThrow(
      new Error("Cannot read property 'toLowerCase' of undefined")
    );
  });
});

describe('convertToUrlForNav case -1', () => {
  test('input number', () => {
    expect(() => convertToUrlForNav(123)).toThrow(
      new Error('str.toLowerCase is not a function')
    );
  });
  test('input korean', () => {
    expect(convertToUrlForNav('ㅁㄴㅊ')).toEqual('ㅁㄴㅊ');
  });
  test('input decimal', () => {
    expect(() => convertToUrlForNav(0.1)).toThrow(
      new Error('str.toLowerCase is not a function')
    );
  });
  test('input lowercased string', () => {
    expect(convertToUrlForNav('new')).toEqual('new');
  });
  test('input mixed string', () => {
    expect(convertToUrlForNav('nEW')).toEqual('new');
  });
  test('input mixed string', () => {
    expect(convertToUrlForNav('nEW')).toEqual('new');
  });
  test('input object', () => {
    expect(() => convertToUrlForNav({})).toThrow(
      new Error('str.toLowerCase is not a function')
    );
  });
  test('input array', () => {
    expect(() => convertToUrlForNav([])).toThrow(
      new Error('str.toLowerCase is not a function')
    );
  });
  test('input symbol', () => {
    expect(convertToUrlForNav('^&*^&*')).toEqual('^&*^&*');
  });
});
